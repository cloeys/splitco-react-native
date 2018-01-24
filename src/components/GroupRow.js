import React, { Component } from "react";
import { Text, Container, Card, CardItem, Left, Icon, Body } from "native-base";
import { TouchableOpacity } from "react-native";

export default class CostRow extends Component {
  state = {
    group: {}
  };

  componentWillMount() {
    this.setState({
      group: this.props.group
    });
  }

  goToGroup = id => {
    this.props.nav();
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.goToGroup(this.state.group.GroupId)}
        style={{ flex: 0, margin: 2 }}
      >
        <Card>
          <CardItem cardBody>
            <Left>
              <Icon name="home" />
              <Body>
                <Text>{this.state.group.Name}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem footer>
            <Body>
              <Text note>Members:</Text>
              {this.state.group.Users.map(user => {
                return (
                  <Text note key={user.UserId}>
                    {user.FirstName + " " + user.LastName}
                  </Text>
                );
              })}
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
