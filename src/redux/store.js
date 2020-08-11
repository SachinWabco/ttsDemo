import { createStore, compose, applyMiddleware} from 'redux';
import ttsReducer from './reducer';
import thunk from 'redux-thunk';
import { ttsMiddleware } from './middleware';

const storeEnhancers = compose;

const store = createStore(
    ttsReducer,
    storeEnhancers(applyMiddleware(ttsMiddleware,thunk))
  );

export default store;