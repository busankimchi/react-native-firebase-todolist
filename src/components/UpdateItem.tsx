import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {Navigation, url} from '../misc';
import {deleteItem} from '../database/api';

function UpdateItem(props: Navigation) {
    const [text, setText] = useState('');
    const [time, setTime] = useState('');
    const {date, id, org, place, people} = props.route.params.item;

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
        setText(props.route.params.item.text);
        setTime(props.route.params.item.time);
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
                label="Update Time"
                value={time}
                onChangeText={setTime}
            />
            <View style={styles.ButtonGroup}>
                <Button focusable onPress={() => updateTodo()}>
                    UPDATE TODO
                </Button>
                <Button focusable onPress={() => deleteTodo()}>
                    DELETE TODO
                </Button>
            </View>
            <View>
                <Text>org: {org}</Text>
                <Text>people: {people}</Text>
                <Text>place: {place}</Text>
            </View>
        </View>
    );
}

export default UpdateItem;

const styles = StyleSheet.create({
    ButtonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
