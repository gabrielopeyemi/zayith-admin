import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';

export const StatCard = ({ 
    icon, 
    title, 
    value, 
    change, 
    percentage, 
    color 
  }: { 
    icon: string; 
    title: string; 
    value: string; 
    change: string; 
    percentage: string; 
    color: string; 
  }) => (
    <View className={`p-6 rounded-lg flex-1 mr-4 ${color}`}>
      <View className="flex-row items-center justify-between mb-4">
        <Icon name={icon} size={24} color="white" />
        <View className="bg-white/20 px-2 py-1 rounded">
          <Text className="text-white text-xs">{percentage}↑</Text>
        </View>
      </View>
      <Text className="text-white text-sm mb-2">{title}</Text>
      <Text className="text-white text-2xl font-bold mb-1">{value}</Text>
      <Text className="text-white text-xs">({change} this month)</Text>
    </View>
  );