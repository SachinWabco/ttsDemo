import React , { useState, useRef, useEffect, memo }from 'react';
import Tts from 'react-native-tts';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_SPEECH_RATE, UPDATE_SPEECH_PITCH, UPDATE_SELECTED_VOICE, UPDATE_VOICES, UPDATE_DEFAULT_LANGUAGE, UPDATE_TTS_STATUS, UPDATE_READ_TEXT } from '../../redux/constants';

const useComponentWillMount = func => {
    const willMount = useRef(true);
    if (willMount.current) {
      func();
    }
    useComponentDidMount(() => {
      willMount.current = false;
    });
};

const useComponentDidMount = func => useEffect(func, []);

const textToSpeech = (props) => {
    console.log("inside textToSpeech Module")
    console.log(props);
    const ttsStore = useSelector(store => store);
    const dispatch = useDispatch();
    // const { ttsStatus, voices, selectedVoice, speechPitch, speechRate, text } = props;
    // const [ttsStatus,setTtsStatus] = useState(props.ttsStatus || ttsStore.ttsStatus);
    const [voices,setVoices] = useState(props.voices || ttsStore.voices);
    const [selectedVoice,setSelectedVoice] = useState(props.selectedVoice || ttsStore.selectedVoice);
    const [speechRate,setSpeechRate] = useState(props.speechRate || ttsStore.speechRate);
    const [speechPitch,setSpeechPitch] = useState(props.speechPitch || ttsStore.speechPitch);
    const [text,setText] = useState(props.text || "Hey John. Please deliver the package by 6:00 PM");
    const [defaultLanguage, setDefaultLanguage] = useState(props.defaultLanguage || ttsStore.defaultLanguage);

    useComponentWillMount(()=>{
        console.log("Inside textToSpeech component will mount");
        Tts.addEventListener('tts-start', event =>{
            // setTtsStatus('started')
            dispatch({type: UPDATE_TTS_STATUS, payload: 'started'})
            dispatch({type: UPDATE_READ_TEXT,payload: true})
        });
        
        Tts.addEventListener('tts-finish', event =>{
            // setTtsStatus('finished')
            dispatch({type: UPDATE_TTS_STATUS, payload: 'finished'})
            dispatch({type: UPDATE_READ_TEXT,payload: false})
        });
        
        Tts.addEventListener('tts-cancel', event =>{
            // setTtsStatus('cancelled')
            dispatch({type: UPDATE_TTS_STATUS, payload: 'cancelled'})
            dispatch({type: UPDATE_READ_TEXT,payload: false})
        });

        Tts.setDefaultRate(speechRate);
        Tts.setDefaultPitch(speechPitch);
        Tts.getInitStatus().then(initTts);
    });

    useEffect(()=>{
        return ()=>{
            // Tts.removeAllListeners();
            Tts.removeEventListener('tts-start');
            Tts.removeEventListener('tts-cancel');
            Tts.removeEventListener('tts-finish');
        }
    },[])

    const initTts = async () => {

        if (voices && voices.length > 0) {
        try {
            await Tts.setDefaultLanguage(defaultLanguage);
            dispatch({type: UPDATE_DEFAULT_LANGUAGE, payload: defaultLanguage})
        } catch (err) {
            console.log(`setDefaultLanguage error `, err);
        }
        try{
            await Tts.setDefaultVoice(selectedVoice);
            dispatch({type: UPDATE_VOICES, payload: availableVoices})
        }catch(err){
            console.log(`setDefaultVoice error `, err);
        }
        // setVoices(availableVoices);
        // setTtsStatus('initialized');
        dispatch({type: UPDATE_TTS_STATUS, payload: ttsStatus})
        
    }else {
        // setTtsStatus('initialized');
        dispatch({type: UPDATE_TTS_STATUS, payload: ttsStatus})
        }
      };

    const readText = async() => {

        console.log("inside tts useeffect");
            Tts.stop();
            try{
                await Tts.setDefaultLanguage(defaultLanguage);
                dispatch({type: UPDATE_DEFAULT_LANGUAGE, payload: defaultLanguage});
            }catch(err){
                console.log(`setDefaultLanguage error `, err);
            }
            try{
                Tts.setDefaultPitch(speechPitch);
                dispatch({type: UPDATE_SPEECH_PITCH, payload: speechPitch});
            }catch(err){
                console.log(`setDefaultPitch error `, err);
            }
            try{
                Tts.setDefaultRate(speechRate);
                dispatch({type: UPDATE_SPEECH_RATE, payload: speechRate});
            }catch(err){
                console.log(`setDefaultRate error `, err);
            }
            try{
                await Tts.setDefaultVoice(selectedVoice);
                dispatch({type: UPDATE_SELECTED_VOICE, payload: selectedVoice});
            }catch(err){
                console.log(`setDefaultVoice error `, err);
            }
            Tts.speak(text);
            dispatch({
                type: UPDATE_READ_TEXT,
                payload: false
            })
    }
    
    useEffect(()=>{
        readText()
    },[selectedVoice,text, speechPitch, speechRate])

    return (
        <>
        </>
    )
}

export default textToSpeech;