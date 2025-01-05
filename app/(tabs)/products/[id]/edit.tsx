import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import EditProductForm from "@/components/EditProductForm";
import HeaderComponent from "@/components/headers/HeaderComponent";
// import HeaderComponent from "@/components/HeaderComponent";

export default function EditProduct() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent title="Edit Product" link={'/products'} />
      <EditProductForm />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
});
