import React, { Component } from 'react';
import { Item, Input, Container, Header, Body, Title, Left, Right, Spinner, Text, Button } from 'native-base';
import * as Storage from '../storage/TokenStorage';

export default class LoginPage extends Component {

    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        message: ''
    };

    componentWillMount() {
        Storage.getAuthToken().then(res => {
            if (res !== null) {
                console.log('skipping login because token found');
                this.props.onLoginPress();
            }
        })
    }

    _username = (username) => {
        this.setState({ username: username });
    }

    _password = (password) => {
        this.setState({ password: password });
    }

    _userLogin = () => {
        this.setState({isLoggingIn: true, message: ''});
        var params = {
            username: this.state.username,
            password: this.state.password,
            grant_type: 'password'
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(`${encodedKey}=${encodedValue}`);
        }
        formBody = formBody.join('&');
        var proceed = false;
        fetch("http://splitcoapi-dev.eu-central-1.elasticbeanstalk.com/auth/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        .then(res =>  {
            if (res.status === 200) return res.json();
        })
        .then(res => {
            if (res == undefined ||!res.access_token) {
                this.setState({message: 'Username or password incorrect'});
            }
            else {
                Storage.setAuthToken(res.access_token);
                proceed = true;
            } 
        })
        .then(() => {
            this.setState({isLoggingIn: false});
            if (proceed) this.props.onLoginPress();
        })
        .done();
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>
                            Login
                        </Title>
                    </Body>
                    <Right/>
                </Header>
                <Item>
                    <Input placeholder='Username' keyboardType='email-address' onChangeText={(text) => this._username(text)} autoFocus={true}/>
                </Item>
                <Item>
                    <Input secureTextEntry={true} placeholder='Password' onChangeText={(text) => this._password(text)}/>
                </Item>
                {this.state.isLoggingIn && <Spinner />}
                {!!this.state.message && (
                    <Text style={{fontSize: 14, color: 'red', padding: 5}}>
                    {this.state.message}
                    </Text>
                )}
                <Button full info disabled={this.state.isLoggingIn||!this.state.username||!this.state.password} onPress={this._userLogin}>
                    <Text>Login</Text>
                </Button>
            </Container>
            )
    }
}