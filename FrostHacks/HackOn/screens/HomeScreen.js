import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
      <ImageBackground
        source={require('../assets/Images/background.png')}
        style={styles.background}
      >
      <View className="box-border rounded-xl mt-5 mx-4 p-4 items-center justify-center border-white bg-black opacity-70">
        <Image
          source={require('../assets/Images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text className="text-white text-center text-sm">Security for All. Trust Guaranteed</Text>
      </View>
      <View className="box-border rounded-xl mt-5 mx-4 p-2 items-center border-[1px] justify-center border-white bg-black opacity-70">
        <Text className="text-white text-center text-sm">We are a team of security experts, with a mission to make security accessible to everyone.</Text>
      </View>
      <TouchableOpacity 
        className="box-border rounded-xl mt-5 mx-4 p-4 items-center border-[1px] justify-center border-green-300 bg-black opacity-70"
        onPress={() => {navigation.navigate('Select')}}>
        <Image
            source={require('../assets/Images/cve.webp')}
            style={{width: 200, height: 200,}}
            resizeMode="contain"
        />
        <Text className="text-yellow-500 text-center text-lg font-semibold">Check Urls and files</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className="box-border rounded-xl mt-5 mx-4 p-4 items-center border-[1px] justify-center border-green-300 bg-black opacity-70"
        onPress={() => {navigation.navigate('Exif')}}>
        <Image
            source={require('../assets/Images/scanner.png')}
            style={{width: 200, height: 200,}}
            resizeMode="contain"
        />
        <Text className="text-yellow-500 text-center text-lg font-semibold">Image Scanner</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className="box-border rounded-xl mt-5 mx-4 p-4 items-center border-[1px] justify-center border-green-300 bg-black opacity-70"
        onPress={() => {navigation.navigate('Msg')}}>
        <Image
            source={require('../assets/Images/msg.png')}
            style={{width: 200, height: 200,}}
            resizeMode="contain"
        />
        <Text className="text-yellow-500 text-center text-lg font-semibold">Secure Messages</Text>
      </TouchableOpacity>
    </ImageBackground>
    </ScrollView>
  </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  logo:{
    width: 200,
    height: 100,
  },
});