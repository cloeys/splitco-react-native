import React, { Component } from "react";
import { Container, Content, Text } from "native-base";

export default class AddGroupPage extends Component {
  static navigationOptions = {
    title: "Add Group"
  };

  render() {
    return (
      <Container>
        <Content>
          <Text>Add group works!</Text>
        </Content>
      </Container>
    );
  }
}
