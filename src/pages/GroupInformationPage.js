import React, { Component } from "react";
import { Container, Content, Text, List, ListItem, Spinner } from "native-base";
import UserListItem from "../components/UserListItem";
import { getCostStats, getCostsOfGroup } from "../service/CostService";

export default class GroupInformationPage extends Component {
  state = {
    group: {},
    costs: [],
    costStats: [],
    loaded: false,
    amountSettled: 0,
    userOwes: []
  };

  static navigationOptions = ({ navigation }) => ({
    title: `Information for ${navigation.state.params.group.Name}`
  });

  componentWillMount() {
    this.setState({
      group: this.props.navigation.state.params.group
    });
  }

  componentDidMount() {
    getCostsOfGroup(this.state.group.GroupId).then(res => {
      this.setState({ costs: res }, () => {
        var promises = this.state.costs.map(cost => {
          return getCostStats(cost.CostId).then(result => {
            const stats = [...this.state.costStats, result];
            this.setState({ costStats: stats });
            return;
          });
        });
        Promise.all(promises).then(res => {
          this.setState({ loaded: true });
          this.state.costStats.forEach(stat => {
            if (stat.UsersInDebt.length === 0) {
              const amount = this.state.amountSettled + 1;
              this.setState({ amountSettled: amount });
            }
          });
          this.state.group.Users.forEach(user => {
            this.state.group.Users.filter(
              x => x.UserId !== user.UserId
            ).forEach(debtor => {
              let amount = 0;
              this.state.costStats.forEach(stat => {
                stat.Owed.filter(
                  o =>
                    o.UserOwed.UserId === user.UserId &&
                    o.UserInDebt.UserId === debtor.UserId
                ).forEach(o => {
                  amount += o.Amount;
                });
              });
              if (amount > 0) {
                const owe = {
                  user: user,
                  debtor: debtor,
                  amount: amount
                };
                const allOwes = [...this.state.userOwes, owe];
                this.setState({ userOwes: allOwes });
              }
            });
          });
        });
      });
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <Container>
          <Content>
            <List>
              <ListItem itemDivider>
                <Text>Members ({this.state.group.Users.length})</Text>
              </ListItem>
              {this.state.group.Users.map(user => {
                return <UserListItem user={user} key={user.UserId} />;
              })}
              <ListItem itemDivider>
                <Text>Costs ({this.state.costs.length})</Text>
              </ListItem>
              <ListItem>
                <Text>
                  Total closed: {this.state.costs.filter(c => c.Closed).length}/{this.state.costs.length}
                </Text>
              </ListItem>
              <ListItem>
                <Text>Total settled: {this.state.amountSettled}/{this.state.costs.length}</Text>
              </ListItem>
              <ListItem>
                <Text>
                  Total owed/in debt:{" "}
                  {this.state.costStats.length - this.state.amountSettled}/{this.state.costs.length}
                </Text>
              </ListItem>
              <ListItem itemDivider>
                <Text>Total owes of this group</Text>
              </ListItem>
              {this.state.userOwes.length == 0 && <Text>All costs settled!</Text>}
              {this.state.userOwes.map(o => {
                return (
                  <ListItem key={o.user.UserId}>
                    <Text>
                      {o.debtor.FirstName} owes {o.user.FirstName} €{o.amount}
                    </Text>
                  </ListItem>
                );
              })}
            </List>
          </Content>
        </Container>
      );
    } else return <Spinner />;
  }
}
