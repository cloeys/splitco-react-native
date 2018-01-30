import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  ListItem,
  Item,
  Label,
  Input,
  Button
} from "native-base";
import {
  View,
  ToastAndroid,
  KeyboardAvoidingView
} from "react-native";
import { addContribution } from "../service/CostService";
import { NavigationActions } from "react-navigation";

export default class SettlePage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Settle costs`
  });

  state = {
    owes: [],
    amounts: [],
    errorMessage: ""
  };

  componentWillMount() {
    this.setState({ owes: this.props.navigation.state.params.owes });
  }

  setAmount = (amount, userId) => {
    amounts = [...this.state.amounts];

    let index = amounts.findIndex(obj => {
      return obj.UserId === userId;
    });

    if (index === -1) {
      amounts = [...amounts, { UserId: userId, Amount: amount }];
    } else {
      amounts[index].Amount = amount;
    }
    this.setState({ amounts });
  };

  contribute = (amount, userId) => {
    if (amount == null) {
      this.setState({ errorMessage: "No value given" });
      return;
    } else {
      const contribution = {
        UserOwedId: userId,
        Amount: amount,
        CostId: this.props.navigation.state.params.cost.CostId
      };
      addContribution(contribution).then(res => {
        if (res.Message) {
          this.setState({ errorMessage: res.Message });
        } else {
          ToastAndroid.show("Contribution registered!", ToastAndroid.SHORT);
          this.returnToCostRefreshed();
        }
      });
    }
  };

  returnToCostRefreshed = () => {
    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({
          routeName: "GroupDetail",
          params: { group: this.props.navigation.state.params.group }
        }),
        NavigationActions.navigate({
          routeName: "CostDetail",
          params: {
            cost: this.props.navigation.state.params.cost,
            group: this.props.navigation.state.params.group
          }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  getAmountOfUser = userId => {
    const obj = this.state.amounts.find(obj => obj.UserId === userId);
    if (obj != null) return obj.Amount;
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Content>
          {this.state.owes.map(owe => {
            return (
              <View key={owe.User.UserId}>
                <ListItem itemDivider>
                  <Text>
                    Owe to {owe.User.FirstName}: €{owe.Amount}
                  </Text>
                </ListItem>
                <Item floatingLabel>
                  <Label>Amount (in euros)</Label>
                    <Input
                      keyboardType="numeric"
                      onChangeText={text =>
                        this.setAmount(text, owe.User.UserId)
                      }
                    />
                </Item>
                {!!this.state.errorMessage && (
                  <Text style={{ fontSize: 14, color: "red", padding: 5 }}>
                    {this.state.errorMessage}
                  </Text>
                )}
                <Button
                  full
                  style={{ marginBottom: 2 }}
                  onPress={() =>
                    this.contribute(
                      this.getAmountOfUser(owe.User.UserId),
                      owe.User.UserId
                    )
                  }
                >
                  <Text>Contribute partly</Text>
                </Button>
                <Button
                  full
                  onPress={() => this.contribute(owe.Amount, owe.User.UserId)}
                >
                  <Text>Contribute full amount</Text>
                </Button>
              </View>
            );
          })}
        </Content>
      </KeyboardAvoidingView>
    );
  }
}
