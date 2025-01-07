// components/GlobalHeader.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { IoIosArrowBack } from "react-icons/io";

const OrderHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text className="text-[22px]">Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace("/products/[id]/create")}
        style={styles.backButton}
      >
        <Text style={styles.backText}>
          {Platform.OS === "ios" ? "Add new" : "+"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Platform.OS === "ios" ? 20 : 16,
    paddingTop: Platform.OS === "ios" ? 60 : 46, // Adjust for iOS notch
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    color: "#000",
    fontSize: Platform.OS === "ios" ? 17 : 16,
    fontWeight: Platform.OS === "ios" ? "600" : "normal",
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: Platform.OS === "ios" ? "center" : "left", // Center title for iOS
  },
});

export default OrderHeader;
