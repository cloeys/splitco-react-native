import React, { Component } from "react";
import {
  Text,
  Container,
  Card,
  CardItem,
  Left,
  Icon,
  Body,
  Button,
  Right
} from "native-base";
import { TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { getUserShortStats, closeCost } from "../service/CostService";
import moment from "moment";

export default class CostRow extends Component {
  state = {
    cost: {},
    stats: {}
  };

  componentWillMount() {
    this.setState({
      cost: this.props.cost
    });
  }

  componentDidMount() {
    getUserShortStats(this.props.cost.CostId).then(stats => {
      this.setState({ stats: stats });
    });
  }

  goToCost = id => {
    this.props.nav();
  };

  closeCost = id => {
    Alert.alert(
      "Close cost",
      "This will move this cost to the closed list. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            closeCost(id).then(res => {
              if (res.Success == true) {
                ToastAndroid.show(
                  `Cost ${id} successfully closed.`,
                  ToastAndroid.SHORT
                );
                this.props.refresh();
              } else {
                ToastAndroid.show(`Error: res.Message`, ToastAndroid.SHORT);
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    let statusIcon = <Icon name="home" />;
    let statusText = null;

    if (this.state.stats.CostStatus === "Settled") {
      statusText = <Text>Settled</Text>;
    } else {
      statusText = (
        <Text>
          {this.state.stats.CostStatus} (€{this.state.stats.Amount})
        </Text>
      );
    }

    switch (this.state.stats.CostStatus) {
      case "Settled":
        statusIcon = <Icon name="checkmark" style={{ color: "green" }} />;
        break;
      case "In debt":
        statusIcon = <Icon name="arrow-round-down" style={{ color: "red" }} />;
        break;
      case "Owed":
        statusIcon = (
          <Icon name="arrow-round-up" style={{ color: "#00bfff" }} />
        );
        break;
      default:
        statusIcon = <Text>oops</Text>;
        break;
    }

    return (
      <TouchableOpacity onPress={() => this.goToCost(this.state.cost.CostId)} style={{ flex: 0, margin: 2, padding: 2 }}>
        <Card>
          <CardItem header>
            <Left>
              <Icon name="cash" />
              <Body>
                <Text>
                  {this.state.cost.Description}: €{this.state.cost.TotalAmount}
                </Text>
              </Body>
            </Left>
            {this.state.stats.CostStatus === "Settled" &&
              !this.state.cost.Closed && (
                <Right>
                  <Button
                    small
                    transparent
                    danger
                    iconLeft
                    bordered
                    onPress={() => this.closeCost(this.state.cost.CostId)}
                  >
                    <Icon name="close" />
                    <Text>Close</Text>
                  </Button>
                </Right>
              )}
          </CardItem>
          <CardItem cardBody style={{paddingLeft: 5}}>
            {statusIcon}
            {statusText}
          </CardItem>
          <CardItem footer>
            <Body>
              <Text note>
                Added by{" "}
                {this.state.cost.MadeBy.FirstName +
                  " " +
                  this.state.cost.MadeBy.LastName}
              </Text>
              <Text note>
                On{" "}
                {moment(this.state.cost.AddedOn).format("MMMM Do YYYY, HH:mm")}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
