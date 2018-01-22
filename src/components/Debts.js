import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text } from 'native-base';

export default class Debts extends Component {
  render() {
    return (
      <View>
        {this.props.debts.map(debt => {
          return (
            <ListItem key={debt.UserInDebt.UserId + "_" + debt.UserOwed.UserId}>
              <Text>
                {debt.UserInDebt.FirstName} owes {debt.UserOwed.FirstName} €{
                  debt.Amount
                }.
              </Text>
            </ListItem>
          );
        })}
      </View>
    );
  }
}
