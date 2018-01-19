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
    console.log("pressed the card!!", id);
    console.log(this.props);
    console.log(this.props.nav);
    this.props.nav();
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.goToGroup(this.state.group.GroupId)}
      >
        <Card style={{ flex: 0, padding: 5, margin: 30 }} pointerEvents="none">
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
