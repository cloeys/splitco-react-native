import React, { Component } from "react";
import { View } from "react-native";
import { Text, ListItem } from "native-base";

export default class CostMyStats extends Component {
  render() {
    return (
      <View>
        <ListItem>
          <Text>Your contribution: €{this.props.stats.Contribution}</Text>
        </ListItem>
        <ListItem>
          <Text>Status: {this.props.stats.CostStatus}</Text>
        </ListItem>
        {this.props.stats.CostStatus === "Owed" &&
          this.props.stats.UsersOwedOrInDebtTo.map(debt => {
            return (
              <ListItem key={debt.User.UserId}>
                <Text>
                  {debt.User.FirstName} still owes you €{debt.Amount}.
                </Text>
              </ListItem>
            );
          })}
        {this.props.stats.CostStatus === "In debt" &&
          this.props.stats.UsersOwedOrInDebtTo.map(debt => {
            return (
              <ListItem key={debt.User.UserId}>
                <Text>
                  You still owe {debt.User.FirstName} €{debt.Amount}.
                </Text>
              </ListItem>
            );
          })}
        {this.props.stats.CostStatus === "Settled" && (
          <ListItem>
            <Text>No debts or owes for you anymore!</Text>
          </ListItem>
        )}
      </View>
    );
  }
}
