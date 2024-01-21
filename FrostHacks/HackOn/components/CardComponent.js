import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CardComponent = ({msg}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity 
        className="box-border rounded-md mt-3 p-2 items-center border-[1px] justify-center border-blue-400 bg-[#32393d]">
        <Text className="text-yellow-500 text-left text-base font-semibold">{msg}</Text>
    </TouchableOpacity>
  )
}

export default CardComponent