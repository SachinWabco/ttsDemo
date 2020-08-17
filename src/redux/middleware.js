import { GET_VOICES, UPDATE_VOICES } from './constants';
import Tts from 'react-native-tts';

const initTts = async (dispatch) => {
  const ttsVoices = await Tts.voices();
  const availableVoices = ttsVoices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
      return { id: v.id, name: v.name, language: v.language };
      });
  dispatch({type: UPDATE_VOICES, payload: availableVoices});
}

export function ttsMiddleware({ dispatch,getState }) {
  return function(next){
    return function(action){
      if(action.type === GET_VOICES){
        Tts.getInitStatus().then(initTts(dispatch),err=>{
              // Install TTS engine if none is present
              if (err.code === 'no_engine'){
                  Tts.requestInstallEngine();
              }})
      }
      return next(action);
    }
  }
}