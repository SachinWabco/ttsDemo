// Redux Action
export const UPDATE_VOICES = 'update_voices';
export const UPDATE_SELECTED_VOICE = 'update_selected_voice';
export const UPDATE_SPEECH_RATE = 'update_speech_rate';
export const UPDATE_SPEECH_PITCH = 'update_speech_pitch';
export const GET_VOICES = 'get_voices';
export const UPDATE_DEFAULT_LANGUAGE = 'update_default_language';
export const UPDATE_TTS_STATUS = 'update_tts_status';
export const UPDATE_READ_TEXT = 'update_read_text';
export const CANCEL_TTS = 'cancel_tts'; 
export const IS_INTERNET_REQUIRED = 'is_internet_required';
export const IS_PAUSED = 'is_paused';
// Only for Android
export const IS_GOOGLE_TTS_ENGINE_DEFAULT = 'is_google_tts_engine_default';
export const IS_BACKGROUND_SPEECH_CANCELLED = 'is_background_speech_cancelled';

// Tts Status Payload
export const INITIALIZED = 'initialized';
export const STARTED = 'started';
export const CANCELLED = 'cancelled';
export const FINISHED = 'finished';
