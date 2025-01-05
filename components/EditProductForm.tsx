import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from "react-native";
import { Base } from "@/constants/config";
import { editProduct } from "@/hooks/mutate/useEditSingleProducts";
import { useGetSingleProducts } from "@/hooks/queries/useGetSingleProducts";
import { useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";

// Define Types
interface Product {
  _id: string;
  name: string;
  sales_price: string;
  description: string;
  imageUrl: string;
  gallery: string[];
}

interface FormData {
  productName: string;
  price: string;
  salesPrice: string;
  description: string;
  mainImage: string;
  gallery: string[];
}

const EditProductForm = () => {
  const params = useLocalSearchParams();
  const { product, loading } = useGetSingleProducts(params?.id || "");

  // State Management with Types
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    price: "",
    salesPrice: "",
    description: "",
    mainImage: "",
    gallery: [],
  });
  const [descriptionIncludes, setDescriptionIncludes] = useState<string[]>([]);
  const [currentDescriptionInclude, setCurrentDescriptionInclude] =
    useState("");
  const [galleryInput, setGalleryInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Prepopulate form fields with fetched product data
  useEffect(() => {
    if (product) {
      setFormData({
        productName: product?.name || "",
        price: product?.sales_price || "",
        salesPrice: "",
        description: product?.description || "",
        mainImage: product?.imageUrl || "",
        gallery: product?.gallery || [],
      });
      setDescriptionIncludes(product.descriptionIncludes);
    }
  }, [product]);

  // Input change handler
  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Add new image to the gallery
  const handleAddGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, galleryInput.trim()],
      }));
      setGalleryInput("");
    } else {
      Alert.alert("Error", "Please enter a valid image URL.");
    }
  };

  // Form submission handler
  const handleSubmit = async () => {
    setIsLoading(true);
    const { productName, price, salesPrice, description, mainImage, gallery } =
      formData;

    const updatedData = {
      productId: product?._id,
      name: productName,
      sales_price: price,
      purchase_price: salesPrice,
      description,
      gallery,
      imageUrl: mainImage,
      descriptionIncludes,
    };

    try {
      await editProduct(updatedData);
      Alert.alert("Success", "Product updated successfully!");
      setIsLoading(false);

      // Optionally reset the form
      setFormData({
        productName: "",
        price: "",
        salesPrice: "",
        description: "",
        mainImage: "",
        gallery: [],
      });
      setDescriptionIncludes([]);
    } catch (error: any) {
      console.error("Failed to update product:", error.message);
      Alert.alert("Error", "Failed to update product. Please try again.");
      setIsLoading(false);
    }
  };

  const handleAddDescriptionInclude = () => {
    if (currentDescriptionInclude.trim()) {
      setDescriptionIncludes([
        ...descriptionIncludes,
        currentDescriptionInclude.trim(),
      ]);
      setCurrentDescriptionInclude("");
    } else {
      Alert.alert("Error", "Please enter a valid item.");
    }
  };

  const handleRemoveDescriptionInclude = (item: string) => {
    const updatedDescriptionIncludes = descriptionIncludes.filter(
      (include) => include !== item
    );
    setDescriptionIncludes(updatedDescriptionIncludes);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          style={{ ...styles.scrollView }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Product Name */}
          <InputField
            label="Product Name"
            value={formData.productName}
            onChangeText={(text) => handleInputChange("productName", text)}
            placeholder="Enter product name"
          />

          {/* Price */}
          <InputField
            label="Price"
            value={formData.price}
            onChangeText={(text) => handleInputChange("price", text)}
            placeholder="Enter price"
            keyboardType="numeric"
          />

          {/* Description */}
          <InputField
            label="Description"
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
            placeholder="Enter description"
            multiline
            textArea
          />

          {/* Main Image */}
          <InputField
            label="Main Image URL"
            value={formData.mainImage}
            onChangeText={(text) => handleInputChange("mainImage", text)}
            placeholder="Enter main image URL"
          />
          {formData.mainImage && (
            <Image source={{ uri: formData.mainImage }} style={styles.image} />
          )}

          {/* Gallery */}
          <Text style={styles.label}>Gallery Image URLs</Text>
          <View style={styles.galleryInputContainer}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
                fontSize: 16,
                backgroundColor: "#fff",
                width: "100%",
              }}
              value={galleryInput}
              onChangeText={setGalleryInput}
              placeholder="Enter gallery image URL"
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddGalleryImage}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.galleryContainer}>
            {formData.gallery.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.galleryImage}
              />
            ))}
          </View>

          {/* Description Includes Section */}
          <Text style={styles.label}>Description Includes</Text>
          <View style={styles.galleryInputContainer}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
                fontSize: 16,
                backgroundColor: "#fff",
                width: "100%",
              }}
              value={currentDescriptionInclude}
              onChangeText={setCurrentDescriptionInclude}
              placeholder="Enter item for description"
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddDescriptionInclude}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View >
            {descriptionIncludes?.map((item, index) => (
              <View
                style={{
                  position: "relative",
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 5,
                }}
                key={item + index}
              >
                <TouchableOpacity
                  style={{ right: 6, position: "absolute", zIndex: 20 }}
                  onPress={() => handleRemoveDescriptionInclude(item)}
                >
                  <AntDesign name="close" size={14} color="black" />
                </TouchableOpacity>
                <Text style={{ padding: 5 }}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isLoading || loading ? "Loading..." : "Update Product"}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Reusable InputField Component with Types
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
  textArea?: boolean;
}

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  textArea = false,
}: InputFieldProps) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, textArea && styles.textArea]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </>
);

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  formHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    resizeMode: "contain",
  },
  galleryInputContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
    gap: 4,
  },
  galleryInput: {
    flex: 1,
    marginRight: 10,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  galleryImage: {
    width: 100,
    height: 100,
    marginRight: 5,
    marginBottom: 5,
    resizeMode: "cover",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: Base.PRIMARY_COLOR,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProductForm;
