import React, { useEffect, useState } from 'react';
import Speech from 'react-native-speech';
import { TouchableOpacity } from 'react-native';

const rnSpeech = (props) => {
    const [readText,setReadText] = useState(false);

    useEffect(()=>{
        Speech.speak({
            text: 'This driver application looks so cool. I\'m gonna use it now',
            voice: 'en-US'
        })
    },[readText]);

    const read = () =>{
        setReadText(!readText)
    };
    return (
        <>
        <TouchableOpacity onPress={read}>
            <Text>Click here to use react-native-speech library</Text>
        </TouchableOpacity>
        </>
    )

};

export default rnSpeech;