import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, ScrollView, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import './global';
import './LoginScreen';
curUserId = curUserId;

const ScannerScreen = () => {
    const navigation = useNavigation();
    const [url, setUrl] = useState('');
    const [data, setData] = useState('');
    const [scanResult, setScanResult] = useState(null);
    let result;

    const uploadFile = async () => {
      try {
          const res = await DocumentPicker.pickSingle({
              type: [DocumentPicker.types.allFiles],
          })
          console.log(res)
          await RNFS.readFile(res.uri, 'base64').then((data) => {
             setData(data)
          })
          const response = await fetch('http://'+global.ip+':8000/scanfile', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({file: data, fileType: res.type, fileName: res.name, fileSize: res.size, userId: curUserId}),
          });
          response.json().then((output) => {
              console.log(output)
              setScanResult(output);
          })

          if (!response.ok) {
              Alert.alert(
                  'Upload Failed',
                  'Try Uploading Again'
                );
          }
      }
      catch (e) {
          console.log(e)
          Alert.alert(
            'Scan Failed',
            'An error occured while scanning the file'
          );
      }
    }   
      
  return (
      <KeyboardAvoidingView className="w-full h-full bg-[#333]">
        <View className="justify-center items-center mt-4">
            <Text className=" text-blue-700 text-2xl font-medium">Malware Scanner</Text>
        </View>
        <View className="justify-center items-center m-3">
            <ScrollView className="w-full h-2/3 box-border p-4 mb-3 mt-1 rounded-xl border-[1px] border-green-300 bg-black opacity-70 ">
              {scanResult && (
                <View>
                  <Text style={{ color: '#2196F3', fontSize: 18, fontWeight: 'bold' }}>Scan Result:</Text>
                  <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>Message: {scanResult.Message}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>File Name: {scanResult.file_name}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>ID: {scanResult.scan_id}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>Detailed: {scanResult.GUI_Report}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>File Type: {scanResult.type}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>Malicious Count: {scanResult.malicious}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>Suspicious Count: {scanResult.suspicious}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>harmless: {scanResult.harmless}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>type-unsupported: {scanResult.typeunsupported}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>confirmed-timeout: {scanResult.confirmedtimeout}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>timeout: {scanResult.timeout}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>failure: {scanResult.failure}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>undetected: {scanResult.undetected}</Text>
                </View>
              )}
            </ScrollView>
        </View>
        <View className="mt-1 justify-center items-center">
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text className="text-slate-100 text-lg font-medium">facing Issues ? <Text className="text-blue-700"> contact help</Text></Text>
          </Pressable>
        </View>
        <View className="">
            <TouchableOpacity onPress={uploadFile} >
                <Text className="text-white text-center text-lg mt-2 bg-blue-500 p-3 rounded-lg ">Upload File</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  )
}

export default ScannerScreen

const styles = StyleSheet.create({})