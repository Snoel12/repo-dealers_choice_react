import React from "react";
const { Component } = React;
import ReactDOM from "react-dom";
import axios from "axios";

class Country extends Component {
  constructor() {
    super();
    this.state = {
      country: {},
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.selectedCountryId !== this.props.selectedCountryId) {
      const country = await (
        await axios.get(`/countries/${this.props.selectedCountryId}`)
      ).data;
      this.setState({ country });
    }
  }

  async componentDidMount() {
    const country = await (
      await axios.get(`/countries/${this.props.selectedCountryId}`)
    ).data;
    this.setState({ country });
  }
  render() {
    const { country } = this.state;
    return <div>{country.snack}</div>;
  }
}
export default Country;
