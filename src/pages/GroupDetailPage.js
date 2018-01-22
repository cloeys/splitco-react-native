import React, { Component } from "react";
import { View } from "react-native";
import { Container, Text, H2, Content, Spinner, Fab, Icon } from "native-base";
import CostRow from "../components/CostRow";

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
    this.props.navigation.navigate("CostDetail", { cost: cost });
  };

  componentDidMount() {
    const group = this.props.navigation.state.params.group;
    this.setState({ group: group });
    getCostsOfGroup(group.GroupId).then(costs => {
      this.setState({ costs: costs, loading: false });
    });
  }

  addCost = () => {
    this.props.navigation.navigate("AddCost", { groupId: this.state.group.GroupId });
  }

  render() {
    return (
      <Container>
        <Content>
          {!this.state.loading &&
            this.state.costs.length == 0 && (
              <Container
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <H2>No costs made in this group yet!</H2>
              </Container>
            )}
          {!this.state.loading && this.state.costs.map(cost => {
            return (
              <CostRow
                key={cost.CostId}
                cost={cost}
                nav={() => this.goToDetail(cost)}
              />
            );
          })}
          {this.state.loading && <Spinner />}
        </Content>
        <View>
            <Fab position="bottomRight" style={{ backgroundColor: '#5067FF' }} onPress={() => this.addCost()}>
              <Icon name="add" />
            </Fab>
          </View>
      </Container>
    );
  }
}
