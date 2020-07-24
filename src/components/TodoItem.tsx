import React from 'react';
import {Navigation, Item} from '../misc/types';
import {List} from 'react-native-paper';

function TodoItem(props: {item: Item; nav: Navigation}) {
    function toggleItem() {
        console.log(
            props.item.date,
            props.item.text,
            props.item.id,
            props.item.time,
            props.item.org,
            props.item.people,
            props.item.place,
        );
        props.nav.navigation.navigate('UpdateItem', {
            item: props.item,
        });
    }
    
    return (
        <List.Item
            title={props.item.time + ' - ' + props.item.text}
            onPress={() => toggleItem()}
        />
    );
}

export default TodoItem;
