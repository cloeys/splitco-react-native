import React, { Component } from "react";
import { ListItem, Text, Icon } from "native-base";

export default class UserListItem extends Component {
  render() {
    return (
      <ListItem
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Text
          style={{
            fontSize: 13
          }}
        >
          {this.props.user.FirstName} {this.props.user.LastName} ({
            this.props.user.Email
          })
        </Text>
        {this.props.icon && <Icon name={this.props.icon} />}
      </ListItem>
    );
  }
}
