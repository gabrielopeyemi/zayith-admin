import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, GestureResponderEvent } from "react-native";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface ButtonProps {
  title: string; // Button label
  onPress: (event: GestureResponderEvent) => void; // Callback for button press
  isLoading?: boolean; // Optional loading state
  disabled?: boolean; // Optional disabled state
  style?: StyleProp<ViewStyle>; // Optional custom button styles
  textStyle?: StyleProp<TextStyle>; // Optional custom text styles
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      style={[
        {
          backgroundColor: disabled ? "#A0AEC0" : "#475bd6", // Primary color with disabled fallback
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text
          style={[
            {
              color: "#FFFFFF", // Text color
              fontSize: 16,
              fontWeight: "500",
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
