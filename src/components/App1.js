import React from 'react';
import {Provider} from 'react-redux';
import TestApp from './TestApp';
import store from '../redux/store';
import AwsPolly from './AwsPolly';

const App1 = () =>{
    return(
        <Provider store={store}>
            <AwsPolly/>
            {/* <TestApp/> */}
        </Provider>
    )
}

export default App1;