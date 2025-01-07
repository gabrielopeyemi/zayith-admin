// import { View, Text } from 'react-native'
// import React from 'react'
// import CreateProductForm from '@/components/CreateProductForm'

// export default function Create() {
//   return (
//     <View>
//
//     </View>
//   )
// }

import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import CreateProductForm from "@/components/CreateProductForm";
import HeaderComponent from "@/components/headers/HeaderComponent";

export default function Create() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent title={"Create product"} link={"/products"} />
      <CreateProductForm />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    // marginBottom: 50
  },
});
