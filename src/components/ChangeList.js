import React, { Component } from "react";
import { View } from "react-native";
import { List, ListItem, Text } from "native-base";

export default class ChangeList extends Component {
  render() {
    return (
      <View>
        <ListItem itemDivider>
          <Text>Change</Text>
        </ListItem>
        <ListItem>
          <Text>Total change: €{this.props.change}</Text>
        </ListItem>
        <ListItem itemDivider>
          <Text>Suggested distribution of change</Text>
        </ListItem>
        {this.props.changeReceived.map(item => {
          return (
            <ListItem key={item.User.UserId}>
              <Text>
                {item.User.FirstName} {item.User.LastName} receives €{
                  item.Amount
                }.
              </Text>
            </ListItem>
          );
        })}
      </View>
    );
  }
}
