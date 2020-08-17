import { UPDATE_SPEECH_RATE, UPDATE_SPEECH_PITCH, UPDATE_SELECTED_VOICE, UPDATE_VOICES, UPDATE_DEFAULT_LANGUAGE, UPDATE_TTS_STATUS, UPDATE_READ_TEXT, CANCEL_TTS, IS_INTERNET_REQUIRED, GET_VOICES, IS_PAUSED, IS_GOOGLE_TTS_ENGINE_DEFAULT, IS_BACKGROUND_SPEECH_CANCELLED } from "./constants";

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

export const updateIsSpeechCancelled = (payload) => {
    return {type: CANCEL_TTS, payload}
}

export const updateIsInternetRequired = (payload) => {
    return {type: IS_INTERNET_REQUIRED, payload}
}

export const updateIsGoogleTtsEngineDefault = (payload) => {
    return {type: IS_GOOGLE_TTS_ENGINE_DEFAULT, payload}
}

export const updateBackGroundSpeech = (payload) => {
    return {type: IS_BACKGROUND_SPEECH_CANCELLED, payload}
}