import React, { Component } from "react";
import { Container, Spinner, Tabs, Tab } from "native-base";
import { getCostStats } from "../service/CostService";
import CostAllStats from "../components/CostAllStats";

export default class CostDetailPage extends Component {
  static navigationOptions = {
    title: "Cost Details"
  };

  state = {
    cost: {},
    stats: {},
    loaded: false
  };

  componentDidMount() {
    const cost = this.props.navigation.state.params.cost;
    this.setState({ cost: cost }, () => {
      getCostStats(this.state.cost.CostId).then(res => {
        this.setState({ stats: res, loaded: true });
      });
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <Container>
          <Tabs>
            <Tab heading="All statistics">
              <CostAllStats stats={this.state.stats} />
            </Tab>
            <Tab heading="Your statistics" />
          </Tabs>
        </Container>
      );
    } else return <Spinner />;
  }
}
