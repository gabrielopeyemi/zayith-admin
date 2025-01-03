import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingState() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="small" color="green" />
      <Text style={styles.loaderText}>Loading data...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});
