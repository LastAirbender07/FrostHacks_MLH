import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NativeModules } from 'react-native';
import CardComponent from '../components/CardComponent';
import { useNavigation } from '@react-navigation/native';

const { MessageModule } = NativeModules;

const MessagesScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [filteredMsg, setFilteredMsg] = useState([]);

  useEffect(() => {
    // console.log("FilteredMsg: \n", filteredMsg);
    // console.log("length : ", filteredMsg.length);

    if (messages.length > 0 && filteredMsg.length === 0) {
      fetchData();
    }
  }, [filteredMsg, messages]);

  const getMessages = async () => {
    try {
      const receivedMessages = await MessageModule.readSmsMessages();
      setMessages(receivedMessages);
    } catch (error) {
      console.error('Error reading SMS messages:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://'+global.ip+':8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });
      const output = await response.json();
      setFilteredMsg(output.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="w-full h-full bg-black p-2 pt-5">
      <View className="justify-center items-center m-3">
        <ScrollView className="w-full h-5/6 box-border p-4 mb-5 mt-2 rounded-xl border-[1px] border-green-300 bg-black opacity-70 ">
          {messages.map((message, index) => (
            <View key={index}>
              <CardComponent msg={message.body}/>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity 
        className={`bg-blue-500 border-red-600 border-[2px] py-2 px-4 rounded-xl`}
        onPress={getMessages}>
        <Text className="text-center text-lg font-semibold text-white">Load Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className={`bg-blue-500 border-red-600 border-[2px] py-2 px-4 rounded-xl mt-2`}
        onPress={() => {
            navigation.navigate('Spam', {filteredMsg : filteredMsg});
          }}
        disabled={filteredMsg.length === 0}>
        <Text className="text-center text-lg font-semibold text-white">Filter Messages</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default MessagesScreen;
