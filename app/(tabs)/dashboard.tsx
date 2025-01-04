import React from "react";
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
import { Search, Menu, Download, Calendar } from "lucide-react";

export default function Dashboard() {
  return (
    <SafeAreaView
      className="flex-1 bg-gray-100"
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingHorizontal: 8,
        paddingVertical: 12,
      }}
    >
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-gray-100"
      >
        <View className="px-4 py-4 border-b-2 border-gray-200 bg-white w-full shadow-md">
          <View className="flex-row items-center justify-between w-full">
            <View className="flex-row items-center space-x-2">
              <View className="w-8 h-8 bg-blue-600 rounded"></View>
              <Text className="text-2xl font-bold">BordUp™</Text>
            </View>

            <View className="flex-row space-x-4">
              <TouchableOpacity
                className="w-10 h-10 bg-white rounded ring-2 ring-gray-200 items-center justify-center"
                accessibilityLabel="Search"
              >
                <Search className="w-6 h-6 text-gray-600" />
              </TouchableOpacity>

              <TouchableOpacity
                className="w-10 h-10 bg-white rounded ring-2 ring-gray-200 items-center justify-center"
                accessibilityLabel="Menu"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          className="flex-1 bg-gray-100"
          showsVerticalScrollIndicator={false}
        >
          <View className="p-4">
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-3xl font-bold">Dashboard</Text>
                <Text className="text-gray-500 text-base">
                  Welcome back to BordUp™
                </Text>
              </View>

              <TouchableOpacity
                className="bg-blue-600 p-3 rounded-lg"
                accessibilityLabel="Download Report"
              >
                <Download className="w-5 h-5 text-white" />
              </TouchableOpacity>
            </View>

            {/* Date Picker */}
            <View className="w-full items-center mb-6">
              <TouchableOpacity
                className="flex-row items-center px-4 py-4 border border-gray-200 rounded-lg w-full"
                accessibilityLabel="Select Date Range"
              >
                <Calendar className="w-7 h-7 text-gray-600 mr-3" />
                <Text className="text-lg">1 Jan 2024 - 31 Jan 2024</Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-6">
            <Card 
            title="Total Employees" 
            value="104" 
            color="bg-blue-600" 
          />
          <Card 
            title="Job Applicants" 
            value="1,839" 
            color="bg-purple-600" 
          />
          <Card 
            title="Total Payroll" 
            value="$324" 
            color="bg-emerald-600" 
          />
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
  function Card({ title, value, color }:{ title:any, value:any, color:any }){
  return (
    <View className={`p-5 rounded-xl ${color}`}>
      <Text className="text-white text-lg opacity-80">{title}</Text>
      <Text className="text-white text-5xl font-bold mt-1">{value}</Text>
    </View>
  );
}