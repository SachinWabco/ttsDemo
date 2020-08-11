import { GET_VOICES, UPDATE_VOICES } from './constants';

export function ttsMiddleware({ dispatch,getState }) {
    return function(next){
      return function(action){
        // if(action.type === GET_VOICES){
            
        //     return dispatch({type:UPDATE_VOICES, payload})  
        // }
        return next(action);
      }
    }
  }