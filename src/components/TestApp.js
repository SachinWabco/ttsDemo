import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Tts from 'react-native-tts';
import Slider from '@react-native-community/slider';
import { useSelector, useDispatch, memo} from 'react-redux';
// import store from '../redux/store';
import TextToSpeech from '../components/modules/textToSpeech';
import { UPDATE_SELECTED_VOICE, UPDATE_DEFAULT_LANGUAGE, UPDATE_VOICES, UPDATE_READ_TEXT, UPDATE_SPEECH_PITCH, UPDATE_SPEECH_RATE } from '../redux/constants';

const TestApp = () => {
  console.log("Inside TestApp");
    const ttsStore = useSelector(store=> store);
    const dispatch = useDispatch();

    const [voices, setVoices] = useState(ttsStore.voices);
    const [selectedVoice, setSelectedVoice] = useState(ttsStore.selectedVoice);
    const [speechRate, setSpeechRate] = useState(ttsStore.speechRate);
    const [speechPitch, setSpeechPitch] = useState(ttsStore.speechPitch);
    const [text, setText] = useState("Hey John. Please deliver the package by 6:00 PM");
    const [defaultLanguage, setDefaultLanguage] = useState(null);
    // const [ttsStatus, setTtsStatus] = useState(ttsStore.ttsStatus);
    const [readText, setReadText] = useState(ttsStore.readText);
    console.log(readText);
    
    const onVoicePress = voice => {
            setDefaultLanguage(voice.language);
            dispatch({type: UPDATE_DEFAULT_LANGUAGE, payload: voices.language});
            setSelectedVoice(voice.id );
            dispatch({type: UPDATE_SELECTED_VOICE, payload: voice.id});
            setReadText(false);
            dispatch({type:UPDATE_READ_TEXT,payload:false})
    };

    const renderVoiceItem = ({ item }) => {
        return (
        <Button
            title={`${item.language} - ${item.name || item.id}`}
            color={selectedVoice === item.id ? undefined : '#969696'}
            onPress={() => onVoicePress(item)}
        />
        );
    };

    const setTtsSpeechRate = async rate => {
        // await Tts.setDefaultRate( rate );
        setSpeechRate( rate );
        dispatch({
            type: UPDATE_SPEECH_RATE,
            payload: rate
        })
    };

    const setTtsSpeechPitch = async rate => {
        // await Tts.setDefaultPitch(rate);
        setSpeechPitch( rate );
        dispatch({
            type: UPDATE_SPEECH_PITCH,
            payload: rate
        })
    };

    // { ...selectedVoice,voices,text,speechPitch,speechRate }

    const initTts = async () => {
      const ttsVoices = await Tts.voices();
      const availableVoices = ttsVoices
          .filter(v => !v.networkConnectionRequired && !v.notInstalled)
          .map(v => {
          return { id: v.id, name: v.name, language: v.language };
          });
      setVoices(availableVoices); 
      console.log("Display total voices supported by tts library");
      console.log(ttsVoices);
      dispatch({type: UPDATE_VOICES, payload: availableVoices})
    }

    const readTextToSpeech = () =>{
      setReadText(true);
      dispatch({type: UPDATE_READ_TEXT, payload: true})
    } 

    useEffect(()=>{
        Tts.getInitStatus().then(initTts);
    },[])

    useEffect(()=>{
      if(ttsStore.ttsStatus === 'finished'){
        setReadText(false)
      }

    },[ttsStore.ttsStatus])

    const textToSpeechProps = {
      selectedVoice,
      voices,
      text,
      defaultLanguage,
      speechPitch: ttsStore.speechPitch,
      speechRate: ttsStore.speechRate,
      ttsStatus: ttsStore.ttsStatus
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
            Text to Speech Conversion in React Native
            </Text>
            <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>
                {`Speed: ${speechRate.toFixed(2)}`}
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0.01}
                maximumValue={0.99}
                value={speechRate}
                onSlidingComplete={setTtsSpeechRate}
            />
            </View>
            <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>
                {`Pitch: ${speechPitch.toFixed(2)}`}
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={2}
                value={speechPitch}
                onSlidingComplete={setTtsSpeechPitch}
            />
            </View>
            <Text style={styles.sliderContainer}>
            {`Selected Voice: ${selectedVoice || ''}`}
            </Text>
            <TextInput
            style={styles.textInput}
            onChangeText={text => setText( text )}
            value={text}
            onSubmitEditing={Keyboard.dismiss}
            />
            <TouchableOpacity style={styles.button} onPress={readTextToSpeech}>
            <Text>
                Click to Read Text ({`Status: ${ttsStore.ttsStatus || ''}`})
                {readText ? <TextToSpeech {...textToSpeechProps}/>: null}
            </Text>
            </TouchableOpacity>
            <Text style={styles.sliderLabel}>Select the Voice from below</Text>
            <FlatList
            style={{ width: '100%', marginTop: 5 }}
            keyExtractor={item => item.id}
            renderItem={renderVoiceItem}
            extraData={selectedVoice}
            data={voices}
            />
        </View>
    )
};

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
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    padding: 5,
  },
  sliderLabel: {
    textAlign: 'center',
    marginRight: 20,
  },
  slider: {
    flex: 1,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    width: 300,
    textAlign: 'center',
    height: 40,
  },
});

export default TestApp;