import { UPDATE_SPEECH_RATE, UPDATE_SPEECH_PITCH, UPDATE_SELECTED_VOICE, UPDATE_VOICES, UPDATE_DEFAULT_LANGUAGE, UPDATE_TTS_STATUS, UPDATE_READ_TEXT } from "./constants";

export const updateSpeechRate = (payload)=>{
    return {type: UPDATE_SPEECH_RATE, payload}
}

export const updateSpeechPitch = (payload)=>{
    return {type: UPDATE_SPEECH_PITCH, payload}
}

export const updateSelectedVoice = (payload)=>{
    return {type: UPDATE_SELECTED_VOICE, payload}
}

export const updateVoices = (payload)=>{
    return {type: UPDATE_VOICES, payload}
}

export const updateDefaultLanguage = (payload) => {
    return {type: UPDATE_DEFAULT_LANGUAGE, payload}
}

export const updateTtsStatus = (payload) => {
    return {type: UPDATE_TTS_STATUS, payload}
}

export const updateReadText = (payload) => {
    return {type: UPDATE_READ_TEXT, payload}
}