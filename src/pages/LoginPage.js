import React, { Component } from "react";
import {
  ToastAndroid,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView
  
} from "react-native";
import {
  Item,
  Input,
  Container,
  Content,
  Header,
  Body,
  Title,
  Left,
  Right,
  Spinner,
  Text,
  Button
} from "native-base";
import * as Storage from "../storage/TokenStorage";

export default class LoginPage extends Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    username: "",
    password: "",
    isLoggingIn: false,
    message: "",
    loginAction: null
  };

  componentWillMount() {
    Storage.getAuthToken().then(res => {
      if (res !== null) {
        this.props.screenProps();
      }
    });
  }
  componentDidMount() {
    this.setState({ loginAction: this.props.screenProps });
  }

  _username = username => {
    this.setState({ username: username });
  };

  _password = password => {
    this.setState({ password: password });
  };

  _userLogin = () => {
    this.setState({ isLoggingIn: true, message: "" });
    var params = {
      username: this.state.username.trim(),
      password: this.state.password.trim(),
      grant_type: "password"
    };

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join("&");
    var proceed = false;
    fetch(
      "http://splitcoapi-dev.eu-central-1.elasticbeanstalk.com/auth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      }
    )
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(res => {
        if (res == undefined || !res.access_token) {
          this.setState({ message: "Username or password incorrect" });
        } else {
          Storage.setAuthToken(res.access_token);
          proceed = true;
          ToastAndroid.show("Successfully logged in.", ToastAndroid.SHORT);
        }
      })
      .then(() => {
        this.setState({ isLoggingIn: false });
        if (proceed) this.state.loginAction();
      })
      .done();
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Content>
          <Item>
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={text => this._username(text)}
                autoFocus={true}
                autoCapitalize="none"
              />
          </Item>
          <Item>
              <Input
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={text => this._password(text)}
                autoCapitalize="none"
              />
          </Item>
          {this.state.isLoggingIn && <Spinner />}
          {!!this.state.message && (
            <Text style={{ fontSize: 14, color: "red", padding: 5 }}>
              {this.state.message}
            </Text>
          )}
          <Button
            full
            info
            disabled={
              this.state.isLoggingIn ||
              !this.state.username ||
              !this.state.password
            }
            onPress={this._userLogin}
          >
            <Text>Login</Text>
          </Button>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "blue", alignSelf: "center", marginTop: 15 }}>
              No account yet? Register now!
            </Text>
          </TouchableOpacity>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}
