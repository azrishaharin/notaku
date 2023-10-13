import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native'
import React from 'react'
import axios from 'axios';
import Application from 'expo-application';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {

    //variables
    const navigation = useNavigation();

    //methods
    

    return (
        <SafeAreaView style={{flex: 1}}>
            <Text>HomeScreen</Text>
            <Pressable style={{padding: 10, backgroundColor: 'blue', margin: 10, borderRadius: 10, width: 'auto'}}>
                <Button color={'white'} onPress={() => {
                    navigation.navigate('NewTask');
                }} title="Create Task"/>
            </Pressable>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})