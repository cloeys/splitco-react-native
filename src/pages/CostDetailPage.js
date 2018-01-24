import React, { Component } from "react";
import { View, Alert, ToastAndroid } from "react-native";
import {
  Container,
  Spinner,
  Tabs,
  Tab,
  Content,
  Fab,
  Icon,
  Button
} from "native-base";
import {
  getCostStats,
  getUserFullStats,
  closeCost,
  removeCost
} from "../service/CostService";
import CostAllStats from "../components/CostAllStats";
import CostMyStats from "../components/CostMyStats";
import { NavigationActions } from "react-navigation";

export default class CostDetailPage extends Component {
  static navigationOptions = {
    title: "Cost Details"
  };

  state = {
    fabActive: false,
    cost: {},
    stats: {},
    userstats: {},
    loaded: false
  };

  componentDidMount() {
    const cost = this.props.navigation.state.params.cost;
    this.setState({ cost: cost }, () => {
      getCostStats(this.state.cost.CostId).then(res => {
        this.setState({ stats: res }, () => {
          getUserFullStats(this.state.cost.CostId).then(userstats => {
            this.setState({ userstats: userstats, loaded: true });
          });
        });
      });
    });
  }

  returnToGroupRefreshed = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({
          routeName: "GroupDetail",
          params: { group: this.props.navigation.state.params.group }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  closeCost = () => {
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
            closeCost(this.state.cost.CostId).then(res => {
              if (res.Success == true) {
                ToastAndroid.show(
                  `Cost successfully closed.`,
                  ToastAndroid.SHORT
                );
                this.returnToGroupRefreshed();
              } else {
                ToastAndroid.show(`Error: ${res.Message}`, ToastAndroid.SHORT);
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  removeCost = () => {
    Alert.alert(
      "Remove cost",
      "This will permanently remove this cost. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            removeCost(this.state.cost.CostId).then(res => {
              if (res.Success == true) {
                ToastAndroid.show(
                  `Cost successfully removed.`,
                  ToastAndroid.SHORT
                );
                this.returnToGroupRefreshed();
              } else {
                ToastAndroid.show(`Error: ${res.Message}`, ToastAndroid.SHORT);
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    if (this.state.loaded) {
      return (
        <Container>
          <Content>
            <Tabs>
              <Tab heading="All statistics">
                <CostAllStats
                  stats={this.state.stats}
                  description={this.state.cost.Description}
                  closed={this.state.cost.Closed}
                />
              </Tab>
              <Tab heading="Your statistics">
                <CostMyStats stats={this.state.userstats} costId={this.state.cost.CostId} />
              </Tab>
            </Tabs>
          </Content>
          <View>
            <Fab
              active={this.state.fabActive}
              position="bottomRight"
              style={{ backgroundColor: "#5067FF" }}
              onPress={() =>
                this.setState({ fabActive: !this.state.fabActive })
              }
            >
              <Icon name="ios-arrow-up" />
              <Button
                style={{ backgroundColor: "red" }}
                onPress={this.removeCost}
              >
                <Icon name="trash" />
              </Button>
              {!this.state.cost.Closed && (
                <Button
                  style={{ backgroundColor: "orange" }}
                  onPress={this.closeCost}
                >
                  <Icon name="close" />
                </Button>
              )}
              {!this.state.cost.Closed && (
                <Button style={{ backgroundColor: "green" }}>
                  <Icon name="add" />
                </Button>
              )}
            </Fab>
          </View>
        </Container>
      );
    } else return <Spinner />;
  }
}
