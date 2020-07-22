import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {FAB, ActivityIndicator, Colors} from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {TodoItem} from '../components';
import {Navigation, Item} from '../misc';
import {getList} from '../database/api';

type State = {
    loading: boolean;
    todos: Item[];
    date: string;
};

class TodoList extends React.Component<Navigation, State> {
    datesWhitelist = [
        {
            start: moment(),
            end: moment().add(3, 'days'), // total 4 days enabled
        },
    ];
    datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled

    state: State = {
        loading: true,
        todos: [],
        date: '',
    };

    componentDidMount() {
        getList()
            .then((querySnapshot) => {
                if (querySnapshot) {
                    querySnapshot.forEach((doc) => {
                        let docs = doc.data();

                        console.log('id :' + doc.id);
                        for (let item in docs) {
                            console.log('key :' + item);
                            console.log('value :' + docs[item]);
                        }
                    });

                    if (this.state.loading) {
                        this.setState({loading: false});
                    }
                } else {
                    console.log('No such document!');
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    }

    selectDate = (timestamp: Date) => {
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

        let date = [year, month, day].join('-');
        console.log(date);

        this.setState({date: date});
    };

    render() {
        const {loading, todos, date} = this.state;

        if (loading) {
            return (
                <ActivityIndicator
                    focusable
                    animating={true}
                    color={Colors.red800}
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
                    onDateSelected={(d: Date) => this.selectDate(d)}
                />
                <FlatList
                    style={styles.flatListStyle}
                    data={todos}
                    keyExtractor={(item: Item) => item.id}
                    renderItem={({item}) => (
                        <TodoItem item={item} nav={this.props as Navigation} />
                    )}
                />
                <FAB
                    small
                    focusable
                    icon="plus"
                    onPress={() =>
                        this.props.navigation.navigate('AddItem', {
                            date: date,
                        })
                    }
                />
            </View>
        );
    }
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
});
