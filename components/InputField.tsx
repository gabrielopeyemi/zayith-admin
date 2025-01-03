import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  Text,
} from "react-native";
// import { EyeIcon, EyeOffIcon } from "react-native-heroicons/outline"; // Replace with your preferred icons.

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  isPassword?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  isPassword,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2 mb-4">
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isPassword && isSecure}
        className="flex-1 text-base"
        {...props}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
          <Text>Show</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
