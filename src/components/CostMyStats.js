import React, { Component } from "react";
import { View } from "react-native";
import { Text, ListItem, Spinner } from "native-base";
import { getContributionsOfUserOfCost } from "../service/CostService";
import moment from "moment";

export default class CostMyStats extends Component {
  state = {
    contributions: [],
    loaded: false
  };

  componentWillMount() {
    getContributionsOfUserOfCost(this.props.costId).then(contributions => {
      this.setState({ contributions: contributions, loaded: true });
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <View>
          <ListItem>
            <Text>Total contribution: €{this.props.stats.Contribution}</Text>
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
          {this.state.contributions.length > 0 && (
            <ListItem itemDivider>
              <Text>Detailed contributions</Text>
            </ListItem>
          )}
          {this.state.contributions.map(contribution => {
            return (
              <ListItem key={contribution.ContributionId}>
                <Text>
                  €{contribution.Amount} on  {moment(contribution.AddedOn).format("MMMM Do YYYY, HH:mm")}
                </Text>
              </ListItem>
            );
          })}
        </View>
      );
    } else {
      return <Spinner />;
    }
  }
}
