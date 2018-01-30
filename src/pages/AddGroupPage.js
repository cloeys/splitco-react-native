import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Item,
  Label,
  Input,
  ListItem,
  Icon,
  List,
  Button,
  Spinner
} from "native-base";
import { getUsers, addGroup } from "../service/CostService";
import {
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView
} from "react-native";
import { NavigationActions } from "react-navigation";

export default class AddGroupPage extends Component {
  state = {
    usersFound: [],
    usersAdded: [],
    name: "",
    email: "",
    error: "",
    loading: false
  };

  static navigationOptions = {
    title: "Add Group"
  };

  findUsers = email => {
    getUsers(email).then(res => {
      this.setState({
        usersFound: res.filter(
          user => user.UserId !== this.props.navigation.state.params.userId
        ),
        email: email.trim()
      });
    });
  };

  setName = text => {
    this.setState({ name: text });
  };

  addUser = user => {
    if (!this.state.usersAdded.includes(user)) {
      const newUsers = [...this.state.usersAdded, user];
      this.setState({ usersAdded: newUsers });
    }
  };

  createGroup = () => {
    let error = "";
    this.setState({ error: "", loading: true });
    if (this.state.addedUsers < 1) {
      error = error.concat("There should be at least 1 extra user specified.");
    }
    if (this.state.name === "") {
      error = error.concat("Name cannot be empty");
    }

    if (error) {
      this.setState({ error: error, loading: false });
    } else {
      const userIds = this.state.usersAdded.map(user => {
        return user.UserId;
      });
      const newGroup = {
        Name: this.state.name,
        UserIds: [...userIds, this.props.navigation.state.params.userId]
      };
      addGroup(newGroup).then(res => {
        if (res.Message) {
          this.setState({ error: res.Message, loading: false });
        } else {
          this.setState({ loading: false });
          ToastAndroid.show("Group created successfully", ToastAndroid.SHORT);
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Home" })]
          });
          this.props.navigation.dispatch(resetAction);
        }
      });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Content>
          <Button full onPress={() => this.createGroup()}>
            <Text>Create Group</Text>
          </Button>
          {this.state.loading && <Spinner />}
          {!!this.state.error && (
            <Text style={{ fontSize: 14, color: "red", padding: 5, margin: 5 }}>
              {this.state.error}
            </Text>
          )}
          <ListItem itemDivider>
            <Text>Information</Text>
          </ListItem>
          <Item floatingLabel>
            <Label>Name</Label>
              <Input
                autoCapitalize="none"
                onChangeText={text => this.setName(text)}
              />
          </Item>
          <ListItem itemDivider>
            <Text>Added users</Text>
          </ListItem>
          <List>
            {this.state.usersAdded.map(user => {
              return (
                <ListItem
                  key={user.UserId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontSize: 13 }}>
                    {user.FirstName} {user.LastName} ({user.Email})
                  </Text>
                  <Icon name="remove" />
                </ListItem>
              );
            })}
          </List>
          <ListItem itemDivider>
            <Text>Find users</Text>
          </ListItem>

          {this.state.usersFound.length > 0 &&
            this.state.email !== "" && (
              <List>
                {this.state.usersFound.map(user => {
                  return (
                    <ListItem
                      key={user.UserId}
                      onPress={() => this.addUser(user)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={{ fontSize: 13 }}>
                        {user.FirstName} {user.LastName} ({user.Email})
                      </Text>
                      <Icon name="add" />
                    </ListItem>
                  );
                })}
              </List>
            )}

          <Item floatingLabel>
            <Label>User to add (name or e-mail)</Label>
              <Input
                autoCapitalize="none"
                onChangeText={text => this.findUsers(text)}
              />
          </Item>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}
