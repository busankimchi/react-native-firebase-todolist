import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {Navigation, url} from '../misc';
import {getItemById, updateItemById, deleteItemById} from '../database/api';

function UpdateItem(props: Navigation) {
    const [text, setText] = useState('');
    const {item} = props.route.params;

    function updateTodo() {
        // directly update on firestore
        updateItemById(item.id, text).then(() => {
            props.navigation.navigate('TodoList');
        });
    }

    function deleteTodo() {
        // directly update on firestore
        deleteItemById(item.id).then(() => {
            props.navigation.navigate('TodoList');
        });
    }

    useEffect(() => {
        // load data after mount
        getItemById(item.id).then((docSnapshot) => {
            if (docSnapshot) {
                let doc = docSnapshot.data();
                console.log(doc);
                //setText(doc);
            } else {
                console.log('No such document!');
            }
        });
    }, []);

    return (
        <View>
            <TextInput label={'Update Todo'} value={text} onChangeText={setText} />
            <Button onPress={() => updateTodo()}>UPDATE TODO</Button>
            <Button onPress={() => deleteTodo()}>DELETE TODO</Button>
        </View>
    );
}

export default UpdateItem;
