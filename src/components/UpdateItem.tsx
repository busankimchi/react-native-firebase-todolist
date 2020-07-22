import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Navigation} from '../misc';
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
                const doc = docSnapshot.data();
                const it: string = Object.values(doc as object)[0];

                //console.log(Object.values(doc as object));
                //console.log(doc);
                setText(it);
            } else {
                console.log('No such document!');
            }
        });
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
