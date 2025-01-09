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
import { StatCard } from "../StatusCard";

export default function Order({ orders }) {
  return (
    <View
      className="flex-1 bg-gray-100"
      // showsVerticalScrollIndicator={false}
    >
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-3xl font-bold">Dashboard</Text>
            <Text className="text-gray-500 text-base">
              Welcome back to Zayith
            </Text>
          </View>

          <TouchableOpacity
            className="bg-blue-600 p-3 rounded-lg"
            accessibilityLabel="Download Report"
          >
            <Feather name="download" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* <View className="w-full items-center mb-6">
          <TouchableOpacity
            className="flex-row items-center px-4 py-4 border border-gray-200 rounded-lg w-full"
            accessibilityLabel="Select Date Range"
          >
            <Feather name="calendar" size={28} color="#4B5563" />
            <Text className="text-lg ml-3">1 Jan 2024 - 31 Jan 2024</Text>
          </TouchableOpacity>
        </View> */}

        <View className="gap-y-8  grid md:grid-cols-3">
          <StatCard
            icon="users"
            title="Total Orders"
            value={orders?.totalOrders}
            change={null}
            percentage={null}
            color="bg-blue-500"
          />

          <StatCard
            icon="truck"
            title="Paid orders"
            value={orders?.statusCounts?.PAID}
            change={null}
            percentage={null}
            color="bg-orange-500"
          />

          <StatCard
            icon="file-text"
            title="Pending Orders"
            value={orders?.statusCounts?.PENDING}
            change={null}
            percentage={null}
            color="bg-red-500"
          />
        </View>
      </View>
    </View>
  );
}
