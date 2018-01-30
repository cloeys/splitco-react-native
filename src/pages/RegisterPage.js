import React, { Component } from "react";
import {
  Text,
  Item,
  Label,
  Input,
  Button,
  Container,
  Content,
  Spinner
} from "native-base";
import { ToastAndroid, KeyboardAvoidingView } from "react-native";
import { registerUser } from "../service/CostService";
import { NavigationActions } from "react-navigation";

export default class RegisterPage extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    error: "",
    registering: false
  };
  static navigationOptions = {
    title: "Register"
  };

  jsUcfirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  setEmail = text => {
    this.setState({ email: text });
  };

  setPassword = text => {
    this.setState({ password: text });
  };

  setPasswordConfirmation = text => {
    this.setState({ passwordConfirmation: text });
  };

  setFirstName = text => {
    this.setState({ firstName: text });
  };

  setLastName = text => {
    this.setState({ lastName: text });
  };

  validateAndRegister = () => {
    this.setState({ error: "", registering: true });
    let error = "";
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (reg.test(this.state.email) === false) {
      error = error.concat("- Email address is not valid.\n");
    }
    if (this.state.password.length < 8) {
      error = error.concat(
        "- Password should be at least 8 characters long.\n"
      );
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      error = error.concat("- Password and confirmation do not match.\n");
    }
    if (this.state.firstName == "") {
      error = error.concat("- First name cannot be empty.\n");
    }
    if (this.state.lastName == "") {
      error = error.concat("- Last name cannot be empty.\n");
    }

    if (error) {
      this.setState({ error: error });
    } else {
      newUser = {
        Email: this.state.email.trim(),
        Password: this.state.password,
        FirstName: this.jsUcfirst(this.state.firstName.trim()),
        LastName: this.jsUcfirst(this.state.lastName.trim())
      };
      registerUser(newUser).then(res => {
        if (res.Message) {
          this.setState({
            error: "An account with this e-mail already exists."
          });
        } else {
          const backAction = NavigationActions.back();
          this.props.navigation.dispatch(backAction);
          ToastAndroid.show(
            "Successfully registered. You can now log in.",
            ToastAndroid.SHORT
          );
        }
      });
    }
    this.setState({ registering: false });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Content>
          <Button full onPress={() => this.validateAndRegister()}>
            <Text>Register</Text>
          </Button>
          {this.state.registering && <Spinner />}
          {!!this.state.error && (
            <Text style={{ fontSize: 14, color: "red", padding: 5, margin: 5 }}>
              {this.state.error}
            </Text>
          )}
          <Item floatingLabel>
            <Label>First name</Label>
              <Input
                autoCapitalize="words"
                onChangeText={text => this.setFirstName(text)}
              />
          </Item>
          <Item floatingLabel>
            <Label>Last name</Label>
              <Input
                autoCapitalize="words"
                onChangeText={text => this.setLastName(text)}
              />
          </Item>
          <Item floatingLabel>
            <Label>E-mail</Label>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={text => this.setEmail(text)}
              />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={text => this.setPassword(text)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password (confirm)</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={text => this.setPasswordConfirmation(text)}
            />
          </Item>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}
