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

const HeaderComponent = ({ title, link }: { title: string; link: any }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {link && (
        <TouchableOpacity
          onPress={() => router.replace(link || '/dashboard')}
          style={styles.backButton}
        >
          <Text style={styles.backText}>
            {Platform.OS === "ios" ? "Back" : "←"}
          </Text>
        </TouchableOpacity>
      )}
      <Text className="text-[24px]">{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: Platform.OS === "ios" ? 20 : 26,
    paddingTop: Platform.OS === "ios" ? 50 : 36, // Adjust for iOS notch
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    color: "#000",
    fontSize: Platform.OS === "ios" ? 18 : 20,
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

export default HeaderComponent;
