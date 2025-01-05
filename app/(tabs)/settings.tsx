import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";

const SettingsScreen = () => {
  const [userDetail, setUserDetail] = useState<any>(null);

  const fetchUserDetails = async () => {
    try {
      const userDetailJSON = await AsyncStorage.getItem("userDetail");
      if (userDetailJSON) {
        setUserDetail(JSON.parse(userDetailJSON));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://placehold.co/100x100" }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {userDetail?.lastName} {userDetail?.firstName}
          </Text>
          <Text style={styles.profileEmail}>{userDetail?.email}</Text>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Inventories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inventories</Text>
        <Link href={`/settings/members`} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Members</Text>
          </View>
        </Link>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Support</Text>
          </View>
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <Link href={"/settings/change-password"} style={styles.card}>
          <View style={styles.cardContent}>
            {/* <Image
              source={require('./assets/pin-code-icon.png')}
              style={styles.cardIcon}
            /> */}
            <Text style={styles.cardText}>Change password</Text>
          </View>
        </Link>
        <Link href={"/login"} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    // textDecoration: 'ca'
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  editProfileText: {
    color: "#fff",
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  badge: {
    backgroundColor: "#4caf50",
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
  },
  logoutText: {
    color: "#d32f2f",
    fontSize: 16,
  },
});
