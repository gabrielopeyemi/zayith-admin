import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'

export default function Navbar() {
  return (
     <View className="px-4 py-4 border-b-2 border-gray-200 bg-white w-full ">
           <View className="flex-row items-center justify-between w-full">
             <View className="flex-row items-center gap-x-2">
               <View className="w-8 h-8 bg-blue-600 rounded">
    
              
                   
                      {/* <Image
                        src={'@/assets/image/logo.png'}
                        alt=""
                        className="w-[80px] h-[80px] object-cover"
                      />
                    
                    <Image
                      className="w-10 h-10object-cover absolute top-1 left-12"
                    src={'@/assets/image/logo.png'}
                      alt="Christmasbells"
                    />
                  */}
    
    
               </View>
               <Text className="text-2xl font-bold">Zayith</Text>
             </View>
             <View className="flex-row gap-x-4">
               <TouchableOpacity
                 className="w-10 h-10 bg-white border border-gray-200 rounded-lg items-center justify-center"
                 accessibilityLabel="Search"
               >
                 <Feather name="search" size={24} color="#4B5563" />
               </TouchableOpacity>
    
               <TouchableOpacity
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg items-center justify-center"
                 accessibilityLabel="Menu"
               >
                 <Feather name="menu" size={24} color="#4B5563" />
               </TouchableOpacity>
             </View>
           </View>
         </View>
    
  )
}