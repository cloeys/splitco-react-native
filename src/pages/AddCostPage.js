import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Separator,
  Button
} from "native-base";
import { addNewCost } from "../service/CostService";
import { NavigationActions } from "react-navigation";
import { KeyboardAvoidingView } from "react-native";

export default class AddCostPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Add cost to group ${navigation.state.params.group.Name}`
  });

  state = {
    group: {},
    description: "",
    amount: 0,
    memberContributions: [],
    error: ""
  };

  componentWillMount() {
    const group = this.props.navigation.state.params.group;
    this.setState({ group: group });
    group.Users.forEach(element => {
      let newEl = { UserId: element.UserId, Amount: 0 };
      this.setState(prevState => ({
        memberContributions: [...prevState.memberContributions, newEl]
      }));
    });
  }

  setDescription = text => {
    this.setState({ description: text });
  };

  setAmount = text => {
    this.setState({ amount: text });
  };

  setMemberContribution = (userId, amount) => {
    let memberContributions = [...this.state.memberContributions];
    let index = memberContributions.findIndex(obj => {
      return obj.UserId === userId;
    });
    memberContributions[index].Amount = amount;
    this.setState({ memberContributions });
  };

  submit = () => {
    this.setState({ error: "" });
    let newCost = {
      GroupId: this.state.group.GroupId,
      TotalAmount: this.state.amount,
      Description: this.state.description,
      UsersContributing: this.state.memberContributions
    };
    addNewCost(newCost).then(response => {
      if (response.Message) {
        this.setState({ error: response.Message });
        return;
      } else {
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: "Home" }),
            NavigationActions.navigate({
              routeName: "GroupDetail",
              params: { group: this.state.group }
            })
          ]
        });
        this.props.navigation.dispatch(resetAction);
      }
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Description</Label>
                <Input onChangeText={text => this.setDescription(text)} />
            </Item>
            <Item floatingLabel>
              <Label>Amount (in euros)</Label>
                <Input
                  keyboardType="numeric"
                  onChangeText={text => this.setAmount(text)}
                />
            </Item>
            <Separator bordered>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                User Contributions
              </Text>
            </Separator>
            {this.state.group.Users.map(user => {
              return (
                <Item inlineLabel key={user.UserId}>
                  <Label>
                    {user.FirstName} {user.LastName}:
                  </Label>
                    <Input
                      placeholder="0"
                      keyboardType="numeric"
                      onChangeText={text =>
                        this.setMemberContribution(user.UserId, text)
                      }
                    />
                </Item>
              );
            })}
          </Form>
          {!!this.state.error && (
            <Text style={{ fontSize: 16, color: "red", padding: 10 }}>
              {this.state.error}
            </Text>
          )}
          <Button full info onPress={this.submit}>
            <Text>Submit cost</Text>
          </Button>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}
