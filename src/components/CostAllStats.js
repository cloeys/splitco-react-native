import React, { Component } from "react";
import { List, ListItem, Text } from "native-base";

export default class CostAllStats extends Component {
  render() {
    return (
      <List>
        <ListItem itemDivider>
          <Text>Information</Text>
        </ListItem>
        <ListItem>
          <Text>Total cost: €{this.props.stats.TotalAmount}</Text>
        </ListItem>
        <ListItem>
          <Text>
            Total contribution of all members: €{
              this.props.stats.TotalContribution
            }
          </Text>
        </ListItem>
        <ListItem>
          <Text>Amount owed per person: €{this.props.stats.OwedPerPerson}</Text>
        </ListItem>
        <ListItem itemDivider>
          <Text>Change</Text>
        </ListItem>
        <ListItem>
          <Text>Total change: €{this.props.stats.Change}</Text>
        </ListItem>
      </List>
    );
  }
}
