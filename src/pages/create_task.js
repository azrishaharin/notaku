import { Alert, Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Application from 'expo-application';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

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
  const navigation = useNavigation();

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
      console.log("Task created");
      Alert.alert(response.data.message);
      setTitle("");
      setDescription("");
      //return back to previous page
      navigation.goBack();

    }).catch((error) => {
      console.log("Post error: " + error.response.data.message);
      Alert.alert("Task Not Created");
    })
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexGrow: 1, padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
          <Pressable style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={22} color="#555843" />
          </Pressable>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#555843' }}>Create Task</Text>
        </View>
        <TextInput style={styles.input} placeholder="Title" onChangeText={(text) => setTitle(text)} />
        <TextInput style={[styles.input, { height: 150, paddingTop: 10 }]} multiline placeholder="Description" onChangeText={(text) => setDescription(text)} />
      </View>

      <Pressable style={styles.buttonContainer}>
        <Button color={'white'} title="Create Task" onPress={() => createTask()} />
      </Pressable>
      {/* <Pressable style={styles.buttonStyle}>
        <Button color={'white'} title="Get Device ID" onPress={() => getDeviceID()} />
        </Pressable> */}

    </SafeAreaView>
  )
}

export default NewTask

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEC8',
  },
  buttonContainer: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#555843',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    marginBottom: 20
  },
})