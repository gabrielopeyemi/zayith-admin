import React from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function ProfileView() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, 'Phone number must be digits only')
      .min(10, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
  });

  const handleSubmit = (values:any) => {
    console.log('Form values:', values);
  };

  return (
    <View className="flex-1 bg-white" >
      <View className="p-6">
        <Text className="text-2xl font-semibold text-gray-800 mb-8">Profile</Text>
        <View className='bg-blue-200 w-full rounded-md h-[15%] md:h-[35%] mb-20'>
          <View className="items-center mb-8 absolute right-0 left-0 md:top-72 top-28">
            <View className="w-24 h-24 rounded-full overflow-hidden">
              <Image 
                source={{ uri: "https://bit.ly/dan-abramov" }}
                className="w-full h-full"
              />
            </View>
          </View>
        </View>

        <Formik
          initialValues={{ firstName: '', lastName: '', phoneNumber: '', email: '', address: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View className="gap-y-6">
              <View className="flex-row gap-x-4">
                <View className="flex-1">
                  <Text className="text-gray-600 mb-2">First name</Text>
                  <TextInput
                    className="bg-white border border-gray-200 rounded-lg p-4"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    placeholder="First name"
                  />
                  {touched.firstName && errors.firstName && (
                    <Text className="text-red-500 mt-2">{errors.firstName}</Text>
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-gray-600 mb-2">Last name</Text>
                  <TextInput
                    className="bg-white border border-gray-200 rounded-lg p-4"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    placeholder="Last name"
                  />
                  {touched.lastName && errors.lastName && (
                    <Text className="text-red-500 mt-2">{errors.lastName}</Text>
                  )}
                </View>
              </View>

              <View>
                <Text className="text-gray-600 mb-2">Phone number</Text>
                <TextInput
                  className="bg-white border border-gray-200 rounded-lg p-4"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text className="text-red-500 mt-2">{errors.phoneNumber}</Text>
                )}
              </View>

              <View>
                <Text className="text-gray-600 mb-2">Email address</Text>
                <TextInput
                  className="bg-white border border-gray-200 rounded-lg p-4"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email address"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500 mt-2">{errors.email}</Text>
                )}
              </View>

              <View>
                <Text className="text-gray-600 mb-2">Address</Text>
                <TextInput
                  className="bg-white border border-gray-200 rounded-lg p-4"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  placeholder="Address"
                  multiline
                  numberOfLines={3}
                />
                {touched.address && errors.address && (
                  <Text className="text-red-500 mt-2">{errors.address}</Text>
                )}
              </View>

              <View className='w-full flex flex-row justify-end mb-44'>
                <TouchableOpacity 
                  className="bg-blue-600 rounded-full py-4 px-2 items-center mt-6 mb-10 w-[40%]"
                  onPress={() => handleSubmit()}
                >
                  <Text className="text-white font-semibold">Edit profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
