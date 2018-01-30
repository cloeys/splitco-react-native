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

  const judgyComments = [
    "About time you pay that, huh?",
    "Don't worry, (s)he probably won't need the money.",
    "Will you ever pay your debts?",
    "That debt is going to pay itself, you know.",
    "Why look at that...",
    "You are so responsible!",
    "You wouldn't like not getting your money either, wouldn't you?"
  ];

  componentWillMount() {
    getContributionsOfUserOfCost(this.props.costId).then(contributions => {
      this.setState({ contributions: contributions, loaded: true });
    });
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getJudgyComment = () => {
    const comm = this.getRandomInt(this.judgyComments.length - 1);
    return this.judgyComments[comm];
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
                    You still owe {debt.User.FirstName} €{debt.Amount}. {this.getJudgyComment}
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
