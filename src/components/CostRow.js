import React, { Component } from "react";
import { Text, Container, Card, CardItem, Left, Icon, Body } from "native-base";
import { TouchableOpacity } from "react-native";
import moment from 'moment';

export default class CostRow extends Component {
  state = {
    cost: {}
  };

  componentWillMount() {
    this.setState({
      cost: this.props.cost
    });
  }

  goToCost = id => {
    console.log("pressed the card!!", id);
    console.log(this.props);
    console.log(this.props.nav);
    this.props.nav();
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.goToCost(this.state.cost.CostId)}>
        <Card style={{ flex: 0, padding: 5 }} pointerEvents="none">
          <CardItem cardBody>
            <Left>
              <Icon name="cash" />
              <Body>
                <Text>{this.state.cost.Description}: €{this.state.cost.TotalAmount}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem footer>
            <Body>
              <Text note>Added by {this.state.cost.MadeBy.FirstName + " " + this.state.cost.MadeBy.LastName}</Text>
              <Text note>On {moment(this.state.cost.AddedOn).format("MMMM Do YYYY, HH:mm")}</Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}