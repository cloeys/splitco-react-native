import React, { Component } from "react";
import { View, RefreshControl } from "react-native";
import {
  Container,
  Button,
  Text,
  Spinner,
  H2,
  Content,
  Fab,
  Icon,
  List,
  ListItem
} from "native-base";
import GroupRow from "../components/GroupRow";

import * as Storage from "../storage/TokenStorage";
import { getUser, getGroups } from "../service/CostService";

export default class GroupPage extends Component {
  state = {
    user: {},
    groups: [],
    logoutAction: null,
    loading: true,
    initialLoaded: false
  };

  static navigationOptions = {
    title: "Groups"
  };

  logout = () => {
    Storage.clearToken();
    this.state.logoutAction();
  };

  componentDidMount() {
    this.setState({ logoutAction: this.props.screenProps });
    getUser().then(res => {
      this.setState({ user: res, initialLoaded: true });
    });
    this.getGroups();
  }

  getGroups = () => {
    getGroups().then(res => {
      this.setState({ groups: res, loading: false });
    });
  };

  goToDetail = group => {
    this.props.navigation.navigate("GroupDetail", { group: group });
  };

  addGroup = () => {
    this.props.navigation.navigate("AddGroup", { userId: this.state.user.UserId });
  };

  render() {
    if (this.state.initialLoaded) {
      return (
        <Container>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this.getGroups}
              />
            }
          >
            <Text
              style={{ alignSelf: "center", margin: 20, fontWeight: "bold" }}
            >
              Hello, {this.state.user.FirstName}!
            </Text>
            <Button full info onPress={this.logout}>
              <Text>Logout</Text>
            </Button>

            {this.state.loading && (
              <Container
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Spinner />
              </Container>
            )}

            {!this.state.loading &&
              this.state.groups.length == 0 && (
                <View>
                  <H2 style={{ alignSelf: "center", marginTop: 10 }}>
                    You aren't part of any groups yet!
                  </H2>
                </View>
              )}
              <List>
            {this.state.groups.map(group => {
              return (
                <ListItem key={group.GroupId} onPress={() => this.goToDetail(group)} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Text>{group.Name}</Text>
                    <Icon name="arrow-forward" />
                  </ListItem>
              );
            })}
            </List>
          </Content>
          <View>
            <Fab
              position="bottomRight"
              style={{ backgroundColor: "#5067FF" }}
              onPress={() => this.addGroup()}
            >
              <Icon name="add" />
            </Fab>
          </View>
        </Container>
      );
    } else return <Spinner />;
  }
}
