import React, { Component } from "react";
import { Text, Container, Card, CardItem, Left, Icon, Body } from "native-base";
import { TouchableOpacity } from "react-native";
import { getUserShortStats } from "../service/CostService";
import moment from "moment";

export default class CostRow extends Component {
  state = {
    cost: {},
    stats: {}
  };

  componentWillMount() {
    this.setState({
      cost: this.props.cost
    });
  }

  componentDidMount() {
    getUserShortStats(this.props.cost.CostId).then(stats => {
      this.setState({ stats: stats });
    });
  }

  goToCost = id => {
    this.props.nav();
  };

  render() {
    let statusIcon = <Icon name="home" />;
    let statusText = null;

    if (this.state.stats.CostStatus === 'Settled') {
      statusText = <Text>Your status: Settled</Text>;
    } else {
      statusText = <Text>Your status: {this.state.stats.CostStatus} (€{this.state.stats.Amount})</Text>;
    }

    switch(this.state.stats.CostStatus) {
      case "Settled":
        statusIcon = <Icon name="checkmark" style={{color: 'green'}} />;
        break;
      case "In debt":
        statusIcon = <Icon name="arrow-round-down" style={{color: 'red'}}  />;
        break;
      case "Owed":
        statusIcon = <Icon name="arrow-round-up" style={{color: '#00bfff'}} />;
        break;
      default:
        statusIcon = <Text>oops</Text>;
        break;
    }

    return (
      <TouchableOpacity onPress={() => this.goToCost(this.state.cost.CostId)}>
        <Card style={{ flex: 0, padding: 2 }} pointerEvents="none">
          <CardItem header>
            <Left>
              <Icon name="cash" />
              <Body>
                <Text>
                  {this.state.cost.Description}: €{this.state.cost.TotalAmount}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Body>
              {statusText} 
            </Body>
            {statusIcon}
          </CardItem>
          <CardItem footer>
            <Body>
              <Text note>
                Added by{" "}
                {this.state.cost.MadeBy.FirstName +
                  " " +
                  this.state.cost.MadeBy.LastName}
              </Text>
              <Text note>
                On{" "}
                {moment(this.state.cost.AddedOn).format("MMMM Do YYYY, HH:mm")}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
