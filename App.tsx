import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoList from './src/screens/TodoList';
import {UpdateItem, AddItem} from './src/components';

const Stack = createStackNavigator();

class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="TodoList">
                    <Stack.Screen name="TodoList" component={TodoList} />
                    <Stack.Screen name="AddItem" component={AddItem} />
                    <Stack.Screen name="UpdateItem" component={UpdateItem} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
