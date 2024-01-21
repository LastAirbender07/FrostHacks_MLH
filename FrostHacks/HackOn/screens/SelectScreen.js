import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const SelectScreen = () => {
    const navigation = useNavigation();
  return (
    <View className="flex-1 bg-[#333]">
      <TouchableOpacity 
        className="h-1/2 items-center justify-center bg-[#2F0601]"
        onPress={() => {navigation.navigate('UrlScanner')}}>
        <Image
            source={require('../assets/Images/url.jpeg')}
            style={{width: 250, height: 250}}
            resizeMode="contain"
        />
        <Text className="text-yellow-500 text-center text-lg font-semibold">Scan Urls</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="h-1/2 items-center justify-center bg-[#0A2342]"
            onPress={() => {navigation.navigate('FileScanner')}}>
            <Image
                source={require('../assets/Images/file.jpeg')}
                style={{width: 250, height: 250,}}
                resizeMode="contain"
            />
            <Text className="text-yellow-500 text-center text-lg font-semibold">Scan Files</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectScreen