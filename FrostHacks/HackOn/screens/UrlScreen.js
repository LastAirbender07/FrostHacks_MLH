import { Alert, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import './LoginScreen';
curUserId = curUserId;

const UrlScreen = () => {
    const navigation = useNavigation();
    const [url, setUrl] = useState('');
    const [scanResult, setScanResult] = useState(null);
    let result;

    const handleScan = async () => {
        try {
          const response = await fetch('http://'+global.ip+':8000/scanurl', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: url, userId: curUserId}),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          setScanResult(await response.json());
          console.log(scanResult);
        } catch (error) {
          console.error('Scan error:', error);
          Alert.alert('Error scanning the URL');
        }
      };
      
      
  return (
    <View className="flex-1 p-10 items-center bg-black ">
      <KeyboardAvoidingView className="w-full h-full">
      <ScrollView style={{ width: '100%' }}>
        <View className="mt-24 justify-center items-center">
          <Text className="text-blue-700 text-2xl font-medium">Malware Scanner</Text>
          <Text className="text-white text-xl font-medium mt-[15]">Enter the Url for scanning below</Text>
        </View>
        <View className="mt-8">
          <View>
            <Text className="text-slate-50 text-lg font-medium">Url</Text>
            <TextInput 
              className="border-b-2 border-slate-200 text-white w-full py-1 px-1 focus:outline-none focus:border-blue-700"
              placeholder='eg. xyz@yahoo.com'
              onChangeText={(text) => setUrl(text)}
              required
             />
          </View>
        </View>
        <View className="mt-10 justify-center items-center">
          <TouchableOpacity 
            className=" w-[200] border-slate-100 rounded-lg bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-lg"
            onPress={handleScan}
          >
            <Text className="text-white font-bold text-xl text-center p-2 m-1">Scan</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5 justify-center items-center">
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text className="text-slate-100 text-lg font-medium">facing Issues ? <Text className="text-blue-700"> contact help</Text></Text>
          </Pressable>
        </View>
        <ScrollView className="mt-5 w-full h-full p-4 bg-[#333333] border rounded-lg">
        {scanResult && (
          <View>
            <Text style={{ color: '#2196F3', fontSize: 18, fontWeight: 'bold' }}>Scan Result:</Text>
            <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Message: {scanResult.message}</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>URL: {scanResult.url}</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>Detailed: {scanResult.permalink}</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>undetected: {scanResult.undetected}</Text>
            {Object.entries(scanResult.result_counts).map(([result, count]) => (
              <Text key={result} style={{ color: 'white', fontSize: 16 }}>
                {result}: {count}
              </Text>
            ))}
          </View>
        )}
        </ScrollView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default UrlScreen