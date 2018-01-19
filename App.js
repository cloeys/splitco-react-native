import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Navigation from './src/navigation/Navigation';
import LoginPage from './src/pages/LoginPage';

export default class AppPage extends Component {
  state = {
    isLoggedIn: false,
    ready: false
  };

  logoutAction = () => {
    this.setState({isLoggedIn: false});
  }

  componentWillMount = async () => {
    await Expo.Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ready: true});
  }
  
  render() {
    if (this.state.ready) {
      if (this.state.isLoggedIn) {
        return <Navigation onLogoutPress={() => this.setState({isLoggedIn: false})} screenProps={this.logoutAction}/>;
      } else {
        return <LoginPage onLoginPress={() => this.setState({isLoggedIn: true})} />;
      }
    } else {
      return null;
    }
  }
}
