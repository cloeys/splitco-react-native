import React, { Component } from "react";
import { View, RefreshControl, Alert, ToastAndroid } from "react-native";
import {
  Container,
  Text,
  H2,
  Content,
  Spinner,
  Fab,
  Icon,
  Tabs,
  Tab,
  Button
} from "native-base";
import CostList from "../components/CostList";
import { NavigationActions } from "react-navigation";
import { getCostsOfGroup, removeGroup } from "../service/CostService";

export default class GroupDetailPage extends Component {
  state = {
    group: {},
    costs: [],
    loading: true,
    fabActive: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: `Group: ${navigation.state.params.group.Name}`,
    headerRight: (
      <Button
        transparent
        onPress={() =>
          navigation.navigate("GroupInfo", {
            group: navigation.state.params.group
          })
        }
      >
        <Icon name="information-circle" />
      </Button>
    )
  });

  goToDetail = cost => {
    this.props.navigation.navigate("CostDetail", {
      cost: cost,
      group: this.state.group
    });
  };

  componentDidMount() {
    this.getCosts();
  }

  getCosts = () => {
    this.setState({ loading: true });
    const group = this.props.navigation.state.params.group;
    this.setState({ group: group });
    getCostsOfGroup(group.GroupId).then(costs => {
      this.setState({ costs: costs, loading: false });
    });
  };

  addCost = () => {
    this.props.navigation.navigate("AddCost", { group: this.state.group });
  };

  removeGroup = () => {
    Alert.alert(
      "Remove group",
      "This will permanently remove this group. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            removeGroup(this.state.group.GroupId).then(res => {
              if (res.Success) {
                ToastAndroid.show(
                  `Cost successfully closed.`,
                  ToastAndroid.SHORT
                );
                this.returnToHomeRefreshed();
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

  returnToHomeRefreshed = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.getCosts}
            />
          }
        >
          {!this.state.loading && (
            <Tabs>
              <Tab heading="All">
                <CostList
                  costs={this.state.costs}
                  nav={this.goToDetail}
                  refresh={this.getCosts}
                />
              </Tab>
              <Tab heading="Open">
                <CostList
                  costs={this.state.costs.filter(cost => cost.Closed === false)}
                  nav={this.goToDetail}
                  refresh={this.getCosts}
                />
              </Tab>
              <Tab heading="Closed">
                <CostList
                  costs={this.state.costs.filter(cost => cost.Closed === true)}
                  nav={this.goToDetail}
                  refresh={this.getCosts}
                />
              </Tab>
            </Tabs>
          )}
          {this.state.loading && <Spinner />}
        </Content>
        <View>
          <Fab
            active={this.state.fabActive}
            position="bottomRight"
            style={{ backgroundColor: "#5067FF" }}
            onPress={() => this.setState({ fabActive: !this.state.fabActive })}
          >
            <Icon name="ios-arrow-up" />
            <Button
              style={{ backgroundColor: "red" }}
              onPress={this.removeGroup}
            >
              <Icon name="trash" />
            </Button>
            <Button style={{ backgroundColor: "green" }} onPress={this.addCost}>
              <Icon name="add" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}
