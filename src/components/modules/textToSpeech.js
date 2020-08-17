import React , { useState, useRef, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tts from 'react-native-tts';
import { Platform , AppState } from 'react-native';
import { 
    UPDATE_SPEECH_RATE,
    UPDATE_SPEECH_PITCH,
    UPDATE_SELECTED_VOICE, 
    UPDATE_VOICES, 
    UPDATE_DEFAULT_LANGUAGE, 
    UPDATE_TTS_STATUS, 
    UPDATE_READ_TEXT, 
    GET_VOICES, 
    STARTED,
    FINISHED,
    CANCELLED} from '../../redux/constants';
import { updateVoices, updateReadText, updateTtsStatus , updateIsSpeechCancelled, updateIsGoogleTtsEngineDefault } from '../../redux/action';

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
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);
  
    // console.log("inside textToSpeech Module")
    // console.log("props for textToSpeech")
    // console.log(props);
    // console.log("TTS Engines");
    // console.log("====================")
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
    // const [isSpeechCancelled, setIsSpeechCancelled] = useState(props.isSpeechCancel || ttsStore.isSpeechCancel);

    useComponentWillMount(async()=>{
        console.log("Inside textToSpeech component will mount");
        Tts.addEventListener('tts-start', event =>{
           dispatch(updateTtsStatus(STARTED));
        });
        
        Tts.addEventListener('tts-finish', event =>{
            dispatch(updateTtsStatus(FINISHED));
        });
        
        Tts.addEventListener('tts-cancel', event =>{
            dispatch(updateTtsStatus(CANCELLED));
        });

        Tts.setDefaultRate(speechRate);
        Tts.setDefaultPitch(speechPitch);
        dispatch({type: GET_VOICES});
        const engines = await Tts.engines();
        // console.log(engines);
        const isGoogleTTSEngine = engines.filter(engine => engine.name === 'com.google.android.tts' && engine.default === true)
        if(Platform.OS === 'android' && isGoogleTTSEngine.length === 0){
            dispatch(updateIsGoogleTtsEngineDefault(true));
            Tts.requestInstallEngine();
        }
    });

    useEffect(()=>{
        if(ttsStore.ttsStatus === CANCELLED ){
          Tts.stop();
        }
      },[ttsStore.ttsStatus])

    const handleAppStateChange = (state) => {
        // console.log(state)
        if(state === 'background' && ttsStore.isBackGroundSpeechCancelled){
            Tts.stop();
        }
    }

    useEffect(()=>{
        AppState.addEventListener("change", handleAppStateChange);

        return ()=>{
            Tts.removeEventListener('tts-start');
            Tts.removeEventListener('tts-cancel');
            Tts.removeEventListener('tts-finish');
            AppState.removeEventListener("change", handleAppStateChange);
        }
    },[])

    const readText = async() => {
        console.log(props)
        console.log("inside tts useeffect");
        if(!props.readText){
            // Tts.stop();
            return
        }
        if(props.isSpeechCancelled){
            Tts.stop();
            dispatch(updateIsSpeechCancelled(false));
            return
        }
      
        try{
            await Tts.setDefaultLanguage(defaultLanguage);
            dispatch({type: UPDATE_DEFAULT_LANGUAGE, payload: defaultLanguage});
        }catch(err){
            console.log(`setDefaultLanguage error `, err);
            Tts.requestInstallData()
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
            Tts.speak(text);
            dispatch(updateReadText(false));
        }catch(err){
            console.log(`setDefaultVoice error `, err);
        }
    }
    
    useEffect(()=>{
        readText()
    },[selectedVoice, text, speechPitch, speechRate, props.isSpeechCancelled, props.readText])

    return (
        <>
        </>
    )
}

export default textToSpeech;