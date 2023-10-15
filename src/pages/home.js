import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, Button, Platform, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as Application from 'expo-application';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {

    //variables
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [userId, setUserId] = useState("");
    const isFocused = useIsFocused();

    const fetchData = async () => {
        await axios.get(`http://localhost:8000/task?userId=${userId}`).then((response) => {
            console.log("Data: " + response.data);
            setTasks(response.data);
            setRefreshing(false);
        }).catch((error) => {
            console.log("Error fetching tasks: " + error);
            setRefreshing(false);
        })
    }

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            fetchData();
        }, 2000);
    };

    // const handleToggleTask = (taskId) => {
    //     const updatedTasks = tasks.map((task) => {
    //         if (task._id === taskId) {
    //             task.completed = !task.completed;
    //         }
    //         return task;
    //     });
    //     setTasks(updatedTasks);
    // }

    const updateTask = async (task) => {
        const updatedTasks = tasks.map((e) => {
            if (e._id === task._id) {
                e.completed = !e.completed;
            }
            return e;
        });
        setTasks(updatedTasks);
        const taskEdit = {
            title: task.title,
            description: task.description,
            completed: !task.completed,
        };
        axios.put(`http://localhost:8000/task/${task._id}`, taskEdit).then((response) => {
            console.log("Task updated");
        }).catch((error) => {
            console.log("Update error: " + error.response.data.message);
            Alert.alert("Task Not Updated");
        })
    }

    // const mockHandleRefresh = () => {
    //     setRefreshing(true);
    //     setTimeout(() => {
    //         setRefreshing(false);
    //     }, 2000);
    // }

    // const handleScroll = (event) => {
    //     console.log(event.nativeEvent.contentOffset.y);
    // }

    //methods
    useEffect(() => {
        console.log("useEffect called");
        const fetchUserId = async () => {
            if (Platform.OS === 'ios') {
                console.log(await Application.getIosIdForVendorAsync());
                setUserId(await Application.getIosIdForVendorAsync());
            } else if (Platform.OS === 'android') {
                setUserId(Application.androidId);
            }
            console.log("User: " + userId);
        }
        fetchUserId();
        fetchData();
    }, [isFocused]);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5EEC8' }}>
            <View style={{ flexGrow: 1, padding: 20, marginBottom: 100 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#555843' }}>All Tasks</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    scrollEventThrottle={16}

                >
                    {tasks.map((task) => {
                        return (
                            <Pressable key={task._id} onPress={() => updateTask(task)} onLongPress={() =>  navigation.navigate('TaskDetails', { task: task })}>
                                <View style={{ width: '100%', padding: 10, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', color: '#555843' }}>{task.title}</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>{task.description}</Text>
                                    </View>
                                        <View>
                                            {task.completed ?
                                                <MaterialCommunityIcons name="checkbox-marked" size={20} color="green" /> : 
                                                <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color="black" />}
                                        </View>
                                </View>
                            </Pressable>
                        )
                    })}
                    <View style={{ height: 200 }} />
                </ScrollView>
            </View>
            <Pressable style={styles.buttonContainer}>
                <Button color={'white'} onPress={() => {
                    navigation.navigate('NewTask');
                }} title="Create Task" />
            </Pressable>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#555843',
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16
    }
})