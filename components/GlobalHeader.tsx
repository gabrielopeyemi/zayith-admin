// components/GlobalHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { IoIosArrowBack } from "react-icons/io";


const GlobalHeader = ({ title, isRoot }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {!isRoot && (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{Platform.OS === 'ios' ? 'Back' : '←'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? 20 : 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16, // Adjust for iOS notch
    backgroundColor: '#6200EE',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    color: '#FFF',
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left', // Center title for iOS
  },
});

export default GlobalHeader;
