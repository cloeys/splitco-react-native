import React, { Component } from "react";
import { View, RefreshControl } from "react-native";
import {
  Container,
  Text,
  H2,
  Content,
  Spinner,
  Fab,
  Icon,
  Tabs,
  Tab
} from "native-base";
import CostList from "../components/CostList";

import { getCostsOfGroup } from "../service/CostService";

export default class GroupDetailPage extends Component {
  state = {
    group: {},
    costs: [],
    loading: true
  };

  static navigationOptions = ({ navigation }) => ({
    title: `Group: ${navigation.state.params.group.Name}`
  });

  goToDetail = cost => {
    this.props.navigation.navigate("CostDetail", { cost: cost, group: this.state.group });
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
  }

  addCost = () => {
    this.props.navigation.navigate("AddCost", { group: this.state.group });
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
                <CostList costs={this.state.costs} nav={this.goToDetail} refresh={this.getCosts}/>
              </Tab>
              <Tab heading="Open">
                <CostList costs={this.state.costs.filter(cost => cost.Closed === false)} nav={this.goToDetail} refresh={this.getCosts} />
              </Tab>
              <Tab heading="Closed">
                <CostList costs={this.state.costs.filter(cost => cost.Closed === true)} nav={this.goToDetail} refresh={this.getCosts} />
              </Tab>
            </Tabs>
          )}
          {this.state.loading && <Spinner />}
        </Content>
        <View>
          <Fab
            position="bottomRight"
            style={{ backgroundColor: "#5067FF" }}
            onPress={() => this.addCost()}
          >
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
    );
  }
}
