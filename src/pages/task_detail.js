import { StyleSheet, Text, View, SafeAreaView, Button, Pressable, TextInput, Alert } from 'react-native'
import React ,{ useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const TaskDetails = ({ route }) => {
    const { task } = route.params;
    const navigation = useNavigation();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [completed, setCompleted] = useState(task.completed);

    const updateTask = async () => {
        const taskEdit = {
            title: title,
            description: description,
            completed: completed,
        };
        axios.put(`http://localhost:8000/task/${task._id}`, taskEdit).then((response) => {
            // Alert.alert(response.data.message);
            setTitle("");
            setDescription("");
            navigation.goBack();
        }).catch((error) => {
            console.log("Update error: " + error.response.data.message);
            Alert.alert("Task Not Updated");
        })
    }

    const deleteTask = async (taskId) => {
        await axios.delete(`http://localhost:8000/task/${taskId}`).then((response) => {
            // Alert.alert(response.data.message);
            navigation.goBack();
        }).catch((error) => {
            console.log("Delete error: " + error.response.data.message);
            Alert.alert("Task Not Deleted");
        })
    }

    const checkTask = () => {
        console.log(JSON.stringify(task));
    }

    return (
        <SafeAreaView style={styles.safeview}>
            <View style={styles.mainContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                    <Pressable style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                        <FontAwesome name="arrow-left" size={22} color="#555843" />
                    </Pressable>
                    <Text style={styles.heading}>Task Details</Text>
                </View>
                <TextInput style={styles.input} value={title} placeholder="Title" onChangeText={(text) => setTitle(text)} />
                <TextInput style={[styles.input, { height: 150, paddingTop: 10 }]} value={description} multiline placeholder="Description" onChangeText={(text) => setDescription(text)} />
            </View>
            <View style={styles.buttonView}>
                <Pressable style={[styles.buttonContainer, { marginBottom: 10 }]}>
                <Button title='Update' color={'white'} onPress={() => updateTask()}/>
                </Pressable>
                <Pressable style={[styles.buttonContainer, { backgroundColor: '#C70039' }]}>
                <Button title='Delete' color={'white'} onPress={() => deleteTask(task._id)}/>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default TaskDetails

const styles = StyleSheet.create({
    safeview: {
        flex: 1,
        backgroundColor: '#F5EEC8'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#555843'
    },
    mainContainer: {
        flexGrow: 1,
        padding: 20,
    },
    buttonContainer: {
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#555843',
    },
    buttonView: {
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