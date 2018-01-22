import React, { Component } from "react";
import { Container, Content, Text } from "native-base";

export default class AddCostPage extends Component {
  static navigationOptions = {
    title: "Add Cost"
  };

  componentWillMount() {
    const groupId = this.props.navigation.state.params.groupId;
  }

  render() {
    return (
      <Container>
        <Content>
          <Text>Add cost works!</Text>
        </Content>
      </Container>
    );
  }
}