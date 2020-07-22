import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Navigation, url} from '../misc';

function AddItem(props: Navigation) {
    const [text, setText] = useState('');
    const {date} = props.route.params;

    function addTodo() {
        // post request to back-end
        const data = {text: text, date: date};

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res.json());
            props.navigation.navigate('TodoList');
        });
    }

    return (
        <View>
            <TextInput
                focusable
                mode="outlined"
                label="New Todo"
                value={text}
                onChangeText={setText}
            />
            <Button focusable onPress={() => addTodo()}>
                ADD TODO
            </Button>
        </View>
    );
}

export default AddItem;
