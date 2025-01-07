import ActiveBar from "@/components/ActiveBar/ActiveBar";
import Navbar from "@/components/NavBar/Navbar";
import ProfileView from "@/components/Profile/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const SettingsScreen = () => {
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
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

    fetchUserDetails();
  }, []);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "password", label: "Change password" },
    { id: "specializations", label: "Specializations" },
    { id: "permissions", label: "User roles and permissions" },
  ];

  const [activeTab, setActiveTab] = useState("profile");
  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingHorizontal: 8,
        // paddingVertical: 20,
      }}
    >

      <StatusBar barStyle="dark-content" />
      <Navbar />
      <ActiveBar setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-white mx-8 my-5"
      >
        <ProfileView/>
      </ScrollView>
     
    </SafeAreaView>
  );
};

export default SettingsScreen;
