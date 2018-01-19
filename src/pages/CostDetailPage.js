import React, { Component } from "react";
import { Text, Container } from "native-base";

export default class CostDetailPage extends Component {
  static navigationOptions = {
    title: "Cost Details"
  };

  render() {
    return (
      <Container>
        <Text>Cost Detail Page</Text>
      </Container>
    );
  }
}
