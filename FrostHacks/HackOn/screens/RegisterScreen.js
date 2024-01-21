import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import './global';

const RegisterScreen = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = { 
      name:name, 
      email:email, 
      password:password, 
      image:image 
    };
    axios.post('http://'+global.ip+':8000/register', user).then((response) => {
      console.log(response.data);
      if(response.data.status_code === 400){
        Alert.alert(
            'Registration Failed',
            'Email already exists'
          );
      }
      else{
        Alert.alert(
            'Registration Successful',
            'You have been registered successfully'
        );
        setName('');
        setEmail('');
        setPassword('');
        setImage('');
        navigation.replace('Login');
      }
    }).catch((err) => {
      console.log("User Details : ", user);
      console.log("Registration error", err);
      Alert.alert(
        'Registration Error',
        'Unable to register user'
      );
    });
  }

  return (
    <View className="flex-1 p-10 items-center bg-white ">
    <KeyboardAvoidingView className="w-full h-full">
      <View className="mt-24 justify-center items-center">
        <Text className="text-blue-700 text-2xl font-medium">Register</Text>
        <Text className="text-black text-xl font-medium mt-[15]">Register to Your Account</Text>
      </View>
      <View className="mt-8">
        <View>
          <Text className="text-slate-600 text-lg font-medium">Name</Text>
          <TextInput 
            className="border-b-2 border-slate-700 w-full py-1 px-1 focus:outline-none focus:border-blue-700"
            placeholder='eg. John Doe'
            onChangeText={(text) => setName(text)}
            required
            />
        </View>
      </View>
      <View className="mt-3">
        <View>
          <Text className="text-slate-600 text-lg font-medium">Email</Text>
          <TextInput 
            className="border-b-2 border-slate-700 w-full py-1 px-1 focus:outline-none focus:border-blue-700"
            placeholder='eg. xyz@yahoo.com'
            onChangeText={(text) => setEmail(text)}
            required
           />
        </View>
      </View>
      <View className="mt-3">
        <View>
          <Text className="text-slate-600 text-lg font-medium">Password</Text>
          <TextInput 
            className="border-b-2 border-slate-700 w-full py-1 px-1 focus:outline-none focus:border-blue-700"
            placeholder='eg. ********'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            required
            />
        </View>
      </View>
      <View className="mt-3">
        <View>
          <Text className="text-slate-600 text-lg font-medium">Image</Text>
          <TextInput 
            className="border-b-2 border-slate-700 w-full py-1 px-1 focus:outline-none focus:border-blue-700"
            onChangeText={(img) => setImage(img)}
            />
        </View>
      </View>
      <View className="mt-10 justify-center items-center">
        <TouchableOpacity 
          className=" w-[200] border-slate-800 rounded-lg bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-lg"
          onPress={handleRegister}>
          <Text className="text-white font-bold text-xl text-center p-2 m-1">Register</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5 justify-center items-center">
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className="text-slate-600 text-lg font-medium">Already have an account? <Text className="text-blue-700">Sign In</Text></Text>
          </Pressable>
        </View>
    </KeyboardAvoidingView>
  </View>
  )
}

export default RegisterScreen