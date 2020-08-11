import React from 'react';
import {Provider} from 'react-redux';
import TestApp from './TestApp';
import store from '../redux/store';

const App1 = () =>{
    return(
        <Provider store={store}>
            <TestApp/>
        </Provider>
    )
}

export default App1;