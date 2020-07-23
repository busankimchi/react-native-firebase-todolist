import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Navigation, url} from '../misc';
import {getItem, deleteItem} from '../database/api';

function UpdateItem(props: Navigation) {
    const [text, setText] = useState('');
    const [time, setTime] = useState('');
    const {date, id} = props.route.params;

    function updateTodo() {
        // post request to back-end
        const data = {text: text, date: date, time: time, id: id};

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res.ok);
            props.navigation.navigate('TodoList');
        });
    }

    function deleteTodo() {
        // directly update on firestore
        deleteItem(date, id).then(() => {
            props.navigation.navigate('TodoList');
        });
    }

    useEffect(() => {
        // load data after mount
        /*
        getItem(date, id).then((docSnapshot) => {
            if (docSnapshot) {
                const doc = docSnapshot.data();
                const it: string = Object.values(doc as object)[0];

                //console.log(Object.values(doc as object));
                //console.log(doc);
                setText(it);
            } else {
                console.log('No such document!');
            }
        });
        */
        setText(props.route.params.text);
        setTime(props.route.params.time);
    }, []);

    return (
        <View>
            <TextInput
                focusable
                mode="outlined"
                label="Update Todo"
                value={text}
                onChangeText={setText}
            />
            <TextInput
                focusable
                mode="outlined"
                label="Update Todo"
                value={time}
                onChangeText={setTime}
            />
            <Button focusable onPress={() => updateTodo()}>
                UPDATE TODO
            </Button>
            <Button focusable onPress={() => deleteTodo()}>
                DELETE TODO
            </Button>
        </View>
    );
}

export default UpdateItem;
