import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Navigation, url} from '../misc';

function AddItem(props: Navigation) {
    const [text, setText] = useState('');
    const [time, setTime] = useState('');
    const {date} = props.route.params;

    console.log('add on:' + date);
    
    function addTodo() {
        // post request to back-end
        const data = {text: text, date: date, time: time};

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res);
            props.navigation.navigate('TodoList');
        });
    }

    return (
        <View>
            <TextInput
                focusable
                mode="outlined"
                label="New Todo Text"
                value={text}
                onChangeText={setText}
            />
            <TextInput
                focusable
                mode="outlined"
                label="New Todo Time"
                value={time}
                onChangeText={setTime}
            />
            <Button focusable onPress={() => addTodo()}>
                ADD TODO
            </Button>
        </View>
    );
}

export default AddItem;
