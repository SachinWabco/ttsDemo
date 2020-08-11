import { UPDATE_SELECTED_VOICE, UPDATE_SPEECH_PITCH, UPDATE_SPEECH_RATE, UPDATE_VOICES, UPDATE_DEFAULT_LANGUAGE, UPDATE_TTS_STATUS, UPDATE_READ_TEXT } from './constants';

const initialState = {
    voices: [],
    selectedVoice: null,
    speechRate: 0.5,
    speechPitch: 1,
    defaultLanuguage: null,
    ttsStatus: "initializing",
    readText: false
}
const ttsReducer = (state = initialState, action)=>{

    if(action.type === UPDATE_SELECTED_VOICE){
        return Object.assign(
            {}, state, {selectedVoice: action.payload}
        )
    }
    if(action.type === UPDATE_SPEECH_PITCH){
        return Object.assign(
            {}, state, {speechPitch: action.payload}
        )
    }
    if(action.type === UPDATE_SPEECH_RATE){
        return Object.assign(
            {}, state, {speechRate: action.payload}
        )
    }
    if(action.type === UPDATE_VOICES){
        return Object.assign(
            {}, state, {voices: action.payload}
        )
    }
    if(action.type === UPDATE_DEFAULT_LANGUAGE){
        return Object.assign(
            {}, state, {defaultLanuguage: action.payload}
        )
    }
    if(action.type === UPDATE_TTS_STATUS){
        return Object.assign(
            {}, state, {ttsStatus: action.payload}
        )
    }
    if(action.type === UPDATE_READ_TEXT){
        return Object.assign(
            {}, state, {readText: action.payload}
        )
    }
    return state;   
}

export default ttsReducer;