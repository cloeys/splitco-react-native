import React, { Component } from "react";
import { View } from "react-native";
import { List, ListItem, Text, Icon } from "native-base";
import ChangeList from "./ChangeList";
import Debts from "./Debts";

export default class CostAllStats extends Component {
  render() {
    return (
      <List>
        <ListItem itemDivider>
          <Text>Information</Text>
        </ListItem>
        <ListItem>
          <Text>Description: {this.props.description} {this.props.closed ? "(closed)" : "(open)"}</Text>
        </ListItem>
        <ListItem>
          <Text>Total cost: €{this.props.stats.TotalCost}</Text>
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
          <Text>Actual contributions</Text>
        </ListItem>
        {this.props.stats.Contributions.map(contribution => {
          return (
            <ListItem key={contribution.User.UserId}>
              <Text>
                {contribution.User.FirstName} {contribution.User.LastName}{" "}
                contributed €{contribution.Amount}.
              </Text>
            </ListItem>
          );
        })}
        <ListItem itemDivider>
          <Text>Debts</Text>
        </ListItem>
        {this.props.stats.Owed.length > 0 ? (
          <Debts debts={this.props.stats.Owed} />
        ) : (
          <ListItem>
            <Text>All debts settled for this cost! Hooray!</Text>
          </ListItem>
        )}
        {this.props.stats.Change > 0 && (
          <ChangeList
            change={this.props.stats.Change}
            changeReceived={this.props.stats.ChangeReceived}
          />
        )}
      </List>
    );
  }
}
