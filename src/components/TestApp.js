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
import { useSelector, useDispatch } from 'react-redux';
import TextToSpeech from '../components/modules/textToSpeech';
import { GET_VOICES, FINISHED, CANCELLED } from '../redux/constants'; 
import { 
  updateVoices, 
  updateDefaultLanguage, 
  updateSelectedVoice, 
  updateReadText, 
  updateSpeechRate, 
  updateSpeechPitch, 
  updateTtsStatus,
  updateIsPaused,
  updateBackGroundSpeech} from '../redux/action';
// import RNSpeech from '../components/modules/reactNativeSpeech';

const TestApp = () => {
  console.log("Inside TestApp");

    const ttsStore = useSelector(store=> store);
    const dispatch = useDispatch();

    const [voices, setVoices] = useState(ttsStore.voices);
    const [selectedVoice, setSelectedVoice] = useState(ttsStore.selectedVoice);
    const [speechRate, setSpeechRate] = useState(ttsStore.speechRate);
    const [speechPitch, setSpeechPitch] = useState(ttsStore.speechPitch);
    const [text, setText] = useState("Hey John. Please deliver the package before 6:00 PM but make sure you're driving within the speed limit");
    const [defaultLanguage, setDefaultLanguage] = useState(null);
    const [ttsStatus, setTtsStatus] = useState(ttsStore.ttsStatus);
    const [readText, setReadText] = useState(ttsStore.readText);
    const [isInternetRequired, setIsInternetRequired] = useState(ttsStore.isInternetRequired);
    const [isSpeechCancelled, setIsSpeechCancelled] = useState(ttsStore.isSpeechCancelled);
    const [isBackGroundSpeechCancelled, setIsBackGroundSpeechCancelled] = useState(ttsStore.isBackGroundSpeechCancelled);
    
    const onVoicePress = voice => {
            setDefaultLanguage(voice.language);
            dispatch(updateDefaultLanguage(voice.language))

            setSelectedVoice(voice.id );
            dispatch(updateSelectedVoice(voice.id));

            setReadText(false);
            dispatch(updateReadText(false));
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
        await Tts.setDefaultRate( rate );
        setSpeechRate( rate );
        dispatch(updateSpeechRate(rate));
    };

    const setTtsSpeechPitch = async rate => {
        await Tts.setDefaultPitch(rate);
        setSpeechPitch( rate );
        dispatch(updateSpeechPitch(rate));
    };
    
    const readTextToSpeech = () =>{
      setReadText(true);
      dispatch(updateReadText(true));
    } 

    const cancelSpeech = () => {
      setIsSpeechCancelled(!isSpeechCancelled);
      dispatch(updateTtsStatus(CANCELLED));
}

    const cancelBackgroundSpeech = () => {
      setIsBackGroundSpeechCancelled(!isBackGroundSpeechCancelled);
      dispatch(updateBackGroundSpeech(!ttsStore.isBackGroundSpeechCancelled))
    }

    useEffect(()=>{
      setVoices(ttsStore.voices)
    },[ttsStore.voices])

    useEffect(()=>{
      dispatch({type: GET_VOICES})
    },[])

    useEffect(()=>{
      if(ttsStore.ttsStatus === FINISHED || ttsStore.ttsStatus === CANCELLED ){
        setReadText(false)
      }
    },[ttsStore.ttsStatus])

    const textToSpeechProps = {
      selectedVoice,
      text,
      defaultLanguage,
      speechPitch,
      speechRate,
      isSpeechCancelled,
      readText
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
                {/* <TextToSpeech {...textToSpeechProps}/> */}
            </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={cancelSpeech}>
              {isSpeechCancelled ? <Text>Allow Speech</Text>: <Text>Cancel Speech</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={cancelBackgroundSpeech}>
              {isBackGroundSpeechCancelled ? <Text>Allow BG Speech</Text> : <Text>Disable BG Speech</Text>}
            </TouchableOpacity>
            <Text style={styles.sliderLabel}>Select the Voice from below</Text>
            <FlatList
            style={{ width: '100%', marginTop: 5 }}
            keyExtractor={item => item.id}
            renderItem={renderVoiceItem}
            extraData={selectedVoice}
            data={voices}
            />
            {/* <RNSpeech/> */}
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