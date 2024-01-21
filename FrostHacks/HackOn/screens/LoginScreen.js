import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import './global';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

curUserId = null;

const LoginScreen = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try{
//         const token = await AsyncStorage.getItem('authtoken');
//         if(token) {
//           navigation.replace('Home');
//         }
//         else{
//           // Token not found
//         }
//       } catch(err){
//         console.log("Error : ", err);
//       };
//     };

//     checkLoginStatus();
//   }, []);

const handleLogin = async () => {
    const user = { email: email, password: password };
    console.log("User Details : ", user);
  
    try {
      const response = await fetch('http://'+global.ip+':8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData);
      curUserId = responseData.userId;
      console.log("Current User Id : ", curUserId);

    //   const token = responseData.token;
    //   AsyncStorage.setItem('authtoken', token);
      navigation.replace('Home');
    } catch (error) {
      console.log("Login error", error);
      Alert.alert(
        'Login Failed',
        'Unable to login user'
      );
    }
  };

  

  return (
    <View className="flex-1 p-10 items-center bg-white ">
      <KeyboardAvoidingView className="w-full h-full">
        <View className="mt-24 justify-center items-center">
          <Text className="text-blue-700 text-2xl font-medium">Sign In</Text>
          <Text className="text-black text-xl font-medium mt-[15]">Sign in to Your Account</Text>
        </View>
        <View className="mt-8">
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
        <View className="mt-10 justify-center items-center">
          <TouchableOpacity 
            className=" w-[200] border-slate-800 rounded-lg bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-lg"
            onPress={handleLogin}
          >
            <Text className="text-white font-bold text-xl text-center p-2 m-1">Login</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5 justify-center items-center">
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text className="text-slate-600 text-lg font-medium">Don't have an account? <Text className="text-blue-700">Register</Text></Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen