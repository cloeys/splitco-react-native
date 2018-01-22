import React, { Component } from "react";
import { Container, Spinner, Tabs, Tab, Content } from "native-base";
import { getCostStats, getUserFullStats } from "../service/CostService";
import CostAllStats from "../components/CostAllStats";
import CostMyStats from "../components/CostMyStats";

export default class CostDetailPage extends Component {
  static navigationOptions = {
    title: "Cost Details"
  };

  state = {
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

  render() {
    if (this.state.loaded) {
      return (
        <Container>
          <Content>
          <Tabs>
            <Tab heading="All statistics">
              <CostAllStats stats={this.state.stats} />
            </Tab>
            <Tab heading="Your statistics">
              <CostMyStats stats={this.state.userstats} />
            </Tab>
          </Tabs>
          </Content>
        </Container>
      );
    } else return <Spinner />;
  }
}
