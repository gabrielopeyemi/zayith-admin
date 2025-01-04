import getProductById from "@/api/products/productByIdHook";
import Header from "@/components/header";
import LoadingState from "@/components/loadingState";
import { Base } from "@/constants/config";
import { useGetSingleProducts } from "@/hooks/queries/useGetSingleProducts";
import { Link, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, FlatList } from "react-native";
import { View, Image, Text } from "react-native";

export default function Product() {
  const params = useLocalSearchParams();
  // const { product, loading } = useGetSingleProducts(params?.id || "");

  const { data: product, isLoading, isError, error, refetch } = getProductById(params?.id || "");

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ScrollView>
        {/* Image Gallery */}
        <Image
          style={{ width: "100%", height: 500 }}
          source={{ uri: product?.imageUrl }}
          resizeMode="cover"
        />

        {/* Product Info */}
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 24, fontWeight: "600", color: "#333" }}>
            {product?.name}
          </Text>
          <Text style={{ fontSize: 18, color: "#777", marginVertical: 5 }}>
            N{product?.sales_price}:00
          </Text>
          <Text style={{ fontSize: 14, color: "#555", marginBottom: 15 }}>
            {product?.description || "No description available."}
          </Text>

          {/* Feature List */}
          {product?.descriptionIncludes?.length > 0 && (
            <View>
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 5 }}
              >
                Includes:
              </Text>
              {product.descriptionIncludes.map((item, index) => (
                <Text key={index} style={{ fontSize: 14, color: "#444" }}>
                  {item}
                </Text>
              ))}
            </View>
          )}

          {/* Edit Product Link */}
          <TouchableOpacity
            style={{
              backgroundColor: Base.PRIMARY_COLOR,
              padding: 15,
              marginTop: 20,
              alignItems: "center",
              borderRadius: 8,
            }}
            onPress={() => router.replace(`/products/${product?._id}/edit`)}
          >
            <Text style={{ color: "#fff", fontSize: 15 }}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
