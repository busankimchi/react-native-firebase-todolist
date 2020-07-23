import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {FAB, ActivityIndicator, Colors} from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import {TodoItem} from '../components';
import {Navigation, Item} from '../misc';
import {getListAll} from '../database/api';
import {useIsFocused} from '@react-navigation/native';

type State = {
    loading: boolean;
    todos: Item[];
    date: string;
};

function TodoList(props: Navigation) {
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([
        {id: '', text: '', date: '', time: ''},
    ]);
    const [date, setDate] = useState(selectDate(new Date()));
    const isFocused = useIsFocused();

    useEffect(() => {
        getListAll(date)
            .then((querySnapshot) => {
                console.log('date: ' + date);

                let list: Item[] = [];
                if (querySnapshot) {
                    querySnapshot.forEach((doc) => {
                        let docs = doc.data();

                        list.push({
                            id: doc.id,
                            text: docs.text,
                            date: date,
                            time: docs.time,
                        });
                    });

                    console.log(list);
                    setTodos(list);
                    console.log(todos);

                    if (loading) {
                        setLoading(false);
                    }
                } else {
                    console.log('No such document!');
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    }, [isFocused, date]);

    function selectDate(timestamp: Date) {
        let d = new Date(timestamp),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = '' + d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        let dat = [year, month, day].join('-');
        return dat;
    }

    if (loading) {
        return (
            <ActivityIndicator
                focusable
                animating={true}
                color={Colors.red800}
                style={styles.Spinner}
            />
        );
    }

    return (
        <View>
            <CalendarStrip
                scrollable
                style={styles.calendarStyle}
                calendarColor={'#3343CE'}
                calendarHeaderStyle={styles.calendarHeaderStyle}
                dateNumberStyle={styles.dateNumberStyle}
                dateNameStyle={styles.dateNameStyle}
                iconContainer={styles.iconContainer}
                onDateSelected={(d: Date) => {
                    let dat = selectDate(d);
                    setDate(dat);
                }}
            />
            <FlatList
                style={styles.flatListStyle}
                data={todos}
                keyExtractor={(item: Item) => item.id}
                renderItem={({item}) => (
                    <TodoItem item={item} nav={props as Navigation} />
                )}
            />
            <FAB
                small
                focusable
                icon="plus"
                onPress={() =>
                    props.navigation.navigate('AddItem', {
                        date: date,
                    })
                }
            />
        </View>
    );
}

export default TodoList;

const styles = StyleSheet.create({
    calendarStyle: {
        height: 80,
        paddingTop: 20,
        paddingBottom: 10,
    },
    calendarHeaderStyle: {color: 'white'},
    dateNumberStyle: {color: 'white'},
    dateNameStyle: {color: 'white'},
    iconContainer: {flex: 0.1},
    flatListStyle: {flex: 1},
    Spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
