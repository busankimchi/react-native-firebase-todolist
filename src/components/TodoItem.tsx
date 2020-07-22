import React from 'react';
import {List} from 'react-native-paper';
import {Navigation, Item} from '../misc/types';

function TodoItem(props: {item: Item; nav: Navigation}) {
    function toggleItem() {
        props.nav.navigation.navigate('UpdateItem', {
            item: props.item,
        });
    }

    return <List.Item title={props.item.title} onPress={() => toggleItem()} />;
}

export default React.memo(TodoItem);
