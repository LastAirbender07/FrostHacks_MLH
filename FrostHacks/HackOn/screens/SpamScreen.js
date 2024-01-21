import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import CardComponent from '../components/CardComponent';
import React from 'react'

const SpamScreen = ({ route }) => {
    const  filteredMsg  = route.params.filteredMsg;

    // if (filteredMsg) {
    //     Object.values(filteredMsg).forEach((message, index) => {
    //         console.log(message);
    //     });
    // } else {
    //     console.log("filteredMsg is undefined or null");
    // }
  return (
    <View>
        <ScrollView className="w-full h-full p-2 bg-[#333]">
            {Object.values(filteredMsg).map((message, index) => (
                <View key={index} className="mt-5">
                    <TouchableOpacity 
                        className="flex-row items-center gap-5 p-1 rounded-xl">
                        <Image 
                            source={require('../assets/Images/user.png')}
                            style={{ width:50, height:50, borderRadius:25, resizeMode:'cover' }}/>

                        <View className="flex-1">
                            <Text className="font-semibold text-lg text-white">{message[0].sender}</Text>
                            <Text className={`font-medium ${message[0].type!=="Normal" ? 'text-red-500' : 'text-white' } `}>{message[0].body}</Text>
                        </View>
                        <View>
                            <Text className="font-medium text-white"> {
                            new Date(message[0].time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                            }</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    </View>
    
  )
}

export default SpamScreen

const styles = StyleSheet.create({})