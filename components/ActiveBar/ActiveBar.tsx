import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React from 'react'

export default function ActiveBar({setActiveTab,activeTab,tabs}:{setActiveTab:any,activeTab:any,tabs:any}) {
  return (
    <View>
      {Platform.OS === "web" ? (
          <View className="flex-row border-b border-gray-200 overflow-auto mt-4">
            {tabs.map((tab: any) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className="px-4 py-2"
              >
                <Text
                  className={`text-base ${
                    activeTab === tab.id
                      ? "text-blue-600 font-bold"
                      : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </Text>
                {activeTab === tab.id && (
                  <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row border-b border-gray-200 overflow-auto mt-4">
              {tabs.map((tab: any) => (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  className="px-4 py-2"
                >
                  <Text
                    className={`text-base ${
                      activeTab === tab.id
                        ? "text-blue-600 font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    {tab.label}
                  </Text>
                  {activeTab === tab.id && (
                    <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
    </View>
  )
}