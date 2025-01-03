import { Base } from "@/constants/config";
import { useCreateProduct } from "@/hooks/mutate/useCreateProduct";
import { editProduct } from "@/hooks/mutate/useEditSingleProducts";
import { useGetSingleProducts } from "@/hooks/queries/useGetSingleProducts";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";

interface ProductData {
  name: string;
  sales_price: string;
  purchase_price: string;
  description: string;
  gallery: string[];
  imageUrl: string;
  descriptionIncludes: string[];
}

const CreateProductForm = () => {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [salesPrice, setSalesPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [mainImage, setMainImage] = useState<string>("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [galleryInput, setGalleryInput] = useState<string>("");
  const params = useLocalSearchParams();
  const { createProductFn, loading } = useCreateProduct();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [descriptionIncludes, setDescriptionIncludes] = useState<string[]>([]);
  const [currentDescriptionInclude, setCurrentDescriptionInclude] =
    useState("");

  const handleAddGalleryImage = () => {
    if (galleryInput.trim()) {
      setGallery((prevGallery) => [...prevGallery, galleryInput.trim()]);
      setGalleryInput("");
    } else {
      Alert.alert("Error", "Please enter a valid image URL.");
    }
  };

  const handleRemoveGalleryImage = (img: string) => {
    const updatedGallery = gallery.filter((image) => image !== img);
    setGallery(updatedGallery);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const data: ProductData = {
        name: productName,
        sales_price: price,
        purchase_price: salesPrice,
        description,
        gallery,
        imageUrl: mainImage,
        descriptionIncludes,
      };
      console.log({ ii: data });

      await createProductFn(data); 
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error("Failed to update product:", error.message);
    }

    setProductName("");
    setPrice("");
    setSalesPrice("");
    setDescription("");
    setMainImage("");
    setGallery([]);
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
    <ScrollView
      style={{ ...styles.scrollView, marginTop: 50 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="Enter product name"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sales Price</Text>
      <TextInput
        style={styles.input}
        value={salesPrice}
        onChangeText={setSalesPrice}
        placeholder="Enter sales price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Main Image URL</Text>
      <TextInput
        style={styles.input}
        value={mainImage}
        onChangeText={setMainImage}
        placeholder="Enter main image URL"
      />
      {mainImage ? (
        <Image source={{ uri: mainImage }} style={styles.image} />
      ) : null}

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
        {gallery?.map((img, index) => (
          <View style={{ position: "relative" }} key={img + index}>
            <TouchableOpacity
              style={{ right: 0, position: "absolute", zIndex: 20 }}
              onPress={() => handleRemoveGalleryImage(img)}
            >
              <AntDesign name="close" size={14} color="black" />
            </TouchableOpacity>
            <Image source={{ uri: img }} style={styles.galleryImage} />
          </View>
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
      <View>
        {descriptionIncludes?.map((item, index) => (
          <View
            style={{
              position: "relative",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 6,
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

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Create Product"}
        </Text>
      </TouchableOpacity>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
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
    fontSize: 16,
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
    resizeMode: "contain",
    marginBottom: 15,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  galleryImage: {
    width: 100,
    height: 100,
    marginRight: 5,
    marginBottom: 5,
    resizeMode: "cover",
    marginTop: 15,
  },
  galleryInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
    gap: 4,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: Base.PRIMARY_COLOR,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateProductForm;
