import React, { Component } from "react";
import Chat from './src/Chat';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/Login';
import {createAppContainer} from 'react-navigation';
import Test from './src/Style/Test';
const StackRoot = createStackNavigator({
  LoginScreen :{screen:Login},
  ChatScreen : {screen:Chat,
    navigationOptions:{headerShown: false}
  }
});

const AppContainer = createAppContainer(StackRoot);
export default class App extends Component {
  render() {
    return (
        <AppContainer/>
    );
  }
}

