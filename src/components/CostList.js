import React, { Component } from "react";
import CostRow from "./CostRow";
import { View } from "react-native";
import { H2, Container } from "native-base";

export default class CostList extends Component {
  render() {
    if (this.props.costs.length > 0) {
      return (
        <View>
          {this.props.costs.map(cost => {
            return (
              <CostRow
                key={cost.CostId}
                nav={() => this.props.nav(cost)}
                cost={cost}
                refresh={this.props.refresh}
              />
            );
          })}
        </View>
      );
    } else {
      return (
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 40
          }}
        >
          <H2>Nothing to display.</H2>
        </Container>
      );
    }
  }
}
