import { Alert, Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Application from 'expo-application';

const NewTask = () => {

    const getDeviceID = async () => {
        if (Platform.OS === 'ios') {
            // deviceID = await Application.getIosIdForVendorAsync();
            // console.log(JSON.stringify(deviceID));
            userId = await Application.getIosIdForVendorAsync();
          } else if (Platform.OS === 'android') {
            userId = Application.androidId;
        }
    }
    //variables
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    userId = getDeviceID();

//methods
const createTask = async () => {
    const task = {
        userId: userId,
        title: title,
        description: description,
        completed: false,
    }
    //post request using axios
    axios.post("http://localhost:8000/task", task).then((response) => {
        console.log(response.data.message);
        Alert.alert(response.data.message);
        setTitle("");
        setDescription("");
    }).catch((error) => {
        console.log(error.response.data.message);
        Alert.alert("Task Not Created");
    })
}


  return (
    <SafeAreaView style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Title" onChangeText={(text) => setTitle(text)} />
        <TextInput style={styles.textInput} placeholder="Description" onChangeText={(text) => setDescription(text)} />
        <Pressable style={styles.buttonStyle}>
        <Button color={'white'} title="Create Task" onPress={() => createTask()} />
        </Pressable>
        <Pressable style={styles.buttonStyle}>
        <Button color={'white'} title="Get Device ID" onPress={() => getDeviceID()} />
        </Pressable>
        
    </SafeAreaView>
  )
}

export default NewTask

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput : {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonStyle: {
    backgroundColor: '#5272F2',
    padding: 10,
    marginVertical: 10,
    width: 200,
    borderRadius: 12
  }
})