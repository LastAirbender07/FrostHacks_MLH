import { Alert, Text, View, NativeModules, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import { useNavigation } from '@react-navigation/native'

const { HelloModule } = NativeModules;

const ExifScreen = () => {
    const navigation = useNavigation();
    const [result, setResult] = useState(null);
    const [data, setData] = useState('');
    const [gps, setGps] = useState('');
    const openYoutube = () => {
        try {
            HelloModule.createYoutubeEvent()
        }
        catch (e) {
            console.log(e)
        }
    }

    const uploadFile = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.allFiles],
            })
            // console.log(res)
            await RNFS.readFile(res.uri, 'base64').then((data) => {
               setData(data)
            })
            const response = await fetch('http://'+global.ip+':8000/file', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({file: data, fileType: res.type}),
            });
            response.json().then((output) => {
                setResult(output.result)
                if (output.gps.latitude && output.gps.longitude) {
                    setGps(output.gps)
                    console.log(output.gps)
                }
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
        }
    }

  return (
    <View className="w-full h-full bg-[#333]">
        <View className="">
            <TouchableOpacity onPress={openYoutube} >
                <Text className="text-white text-center text-lg mt-4 bg-blue-500 p-3 rounded-lg ">open Youtube</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadFile} >
                <Text className="text-white text-center text-lg mt-2 bg-blue-500 p-3 rounded-lg ">Upload File</Text>
            </TouchableOpacity>
        </View>
        <View className="justify-center items-center m-3">
            <ScrollView className="w-full h-2/3 box-border p-4 mb-5 mt-5 rounded-xl border-[1px] border-green-300 bg-black opacity-70 ">
                <Text className="text-white text-sm ">{result}</Text>
            </ScrollView>
        </View>
        <View>
            {gps ?
                <TouchableOpacity onPress={() => {navigation.navigate("Map", {gps: gps})}}> 
                    <Text className="text-white text-center text-lg mt-2 bg-blue-500 p-3 rounded-lg ">View Location</Text> 
                </TouchableOpacity>
                : 
                <TouchableOpacity onPress={() => {navigation.navigate("Home")}}> 
                    <Text className="text-white text-center text-lg mt-2 bg-blue-500 p-3 rounded-lg opacity-20">View Location</Text>
                </TouchableOpacity>
            }
        </View>
    </View>
  )
}

export default ExifScreen