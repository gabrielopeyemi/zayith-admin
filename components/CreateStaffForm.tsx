import { Base } from "@/constants/config";
import { useCreateStaff } from "@/hooks/mutate/useCreateStaff";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";

export enum Roles {
  // STORE_ADMIN = 'STORE_ADMIN',
  // STORE_OWNER = 'STORE_OWNER',
  STORE_MANAGER = "STORE_MANAGER",
  SUPER_ADMIN = "SUPER_ADMIN",
  DISPATCH_DRIVER = "DISPATCH_DRIVER",
  SALES = "SALES",
  MARKETING = "MARKETING",
}

const CreateUserForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organizationId, setOrganizationId] = useState(
    "671a12df1d1f5edf69e3cf8f"
  );
  const [phoneNumber, setPhoneNumber] = useState("2347031612450");
  const [role, setRole] = useState("DISPATCH_DRIVER");
  const [isLoading, setIsLoading] = useState(false);
  const { createStaffFn, loading, error } = useCreateStaff();

  const handleSubmit = async () => {
    setIsLoading(true);


    try {
      const data = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        organizationId,
        phoneNumber,
        role,
      };
      createStaffFn(data)
      // Replace with actual update function
      console.log("Updating user with data:", data);

      setIsLoading(false);
      // Alert.alert("Success", "User information updated successfully!");
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to update user:", error);
      Alert.alert("Error", "Failed to update user information.");
    }
  };

  return (
    <View style={styles.safeArea}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      > */}
      <ScrollView
        // style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            marginTop: 80,
          }}
        ></View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter first name"
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter last name"
        />

        {/* <Text style={styles.label}>Organization ID</Text>
          <TextInput
            style={styles.input}
            value={organizationId}
            onChangeText={setOrganizationId}
            placeholder="Enter organization ID"
          /> */}

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="eg: 07031612450"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          {Object.values(Roles).map((role) => (
            <Picker.Item
              key={role}
              label={role.replace("_", " ")}
              value={role}
            />
          ))}
        </Picker>
        <View style={styles.pickerContainer}></View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Create"}
          </Text>
        </TouchableOpacity>

        <Toast />
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    // backgroundColor: "#f8f9fa",
    padding: 20,
    marginTop: Platform.OS === "ios" ? 60 : 20,
  },
  container: {
    marginTop: 80,
  },
  // scrollView: {
  //   // flex: 1,
  //
  // },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  submitButton: {
    backgroundColor: Base.PRIMARY_COLOR,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateUserForm;
