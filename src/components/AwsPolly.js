import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text, TextInput, View, Keyboard, Button } from 'react-native';
import { voices } from './awsLang';

const awsPolly = () => {
    console.log("Inside AWS Polly")

    const URL = 'https://15fkr9pzj6.execute-api.ap-south-1.amazonaws.com/test';
   
    let audioURL = "";

    const [selectedVoice, setSelectedVoice] = useState("");
    const [text, setText] = useState("Hey John. Please deliver the package before 6:00 PM but make sure you're driving within the speed limit");

    const onVoicePress = (item) => {
        setSelectedVoice(item.voice)
    }

    let apiData = {
        text,
        selectedVoice,
        outputFormat: "mp3"
    }

    const callApi = async (URL, apiData) => {
        return new Promise((resolve,reject)=> {
            const headers = new Headers({
                "Content-Type": "application/json"
            })

            const config = {
                body : JSON.stringify(apiData),
                method: "POST",
                headers
            }

            fetch(URL, config)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    }

    const callPolly = async () => {
        try{
            const audioURL = await callApi(URL, apiData)
            console.log("hi")
            console.log(audioURL)
            //ToDo
            //Play audio using react-native-sound
        }catch(err){
            console.log(err);
        }
    }

    const renderVoiceItem = ({ item }) => {
        return (
        <Button
            title={`${item.language} - ${item.voice} - ${item.gender}`}
            color={selectedVoice === item.voice ? undefined : '#969696'}
            onPress={() => onVoicePress(item)}
        />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
            Text to Speech Conversion using AWS Polly
            </Text>
            <TextInput
                style={styles.textInput}
                onChangeText={text => setText( text )}
                value={text}
                onSubmitEditing={Keyboard.dismiss}
            />
            <TouchableOpacity style={styles.button} onPress={callPolly}>
              <Text>Play Voice</Text>
            </TouchableOpacity>

            <FlatList
                keyExtractor={item => item.voice}
                renderItem={renderVoiceItem}
                extraData={selectedVoice}
                data={voices}
             />
        </View>
    )
}

export default awsPolly;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        margin: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        color: 'black',
        width: 300,
        textAlign: 'center',
        height: 40,
      },
})