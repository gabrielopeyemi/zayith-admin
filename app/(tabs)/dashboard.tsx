import DashboardThree from "@/components/Dashboard/Dashboardthree";
import Order from "@/components/Dashboard/Order";
import React, { useState } from "react";
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
import Icon from "react-native-vector-icons/Feather";
import Feather from "react-native-vector-icons/Feather";
import Subscriptions from "@/components/Dashboard/Subscriptions";
import Navbar from "@/components/NavBar/Navbar";
import ActiveBar from "@/components/ActiveBar/ActiveBar";

export default function Dashboard() {
  // const tabs = [
  //   { id: 'profile', label: 'Profile' },
  //   { id: 'password', label: 'Change password' },
  //   { id: 'specializations', label: 'Specializations' },
  //   { id: 'permissions', label: 'User roles and permissions' },
  // ];

  const tabs = [
    { id: "Order", label: "Order" },
    { id: "Subscriptions", label: "Subscriptions" },
    { id: "Customers", label: "Customers" },
  ];
  const [activeTab, setActiveTab] = useState("Order");

  const renderContent = () => {
    switch (activeTab) {
      case "Order":
        return <Order />;
      case "Subscriptions":
        return <Subscriptions />;
      case "Customers":
        return <DashboardThree />;
      default:
        return <Order />;
    }
  };
  return (
    <SafeAreaView
      className="flex-1 bg-gray-100"
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingHorizontal: 8,
        // paddingVertical: 20,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-gray-100"
      >
        <Navbar />
        <ActiveBar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          tabs={tabs}
        />
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
