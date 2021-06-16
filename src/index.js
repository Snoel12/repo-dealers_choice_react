import React from "react";
const { Component } = React;
import ReactDOM from "react-dom";
import axios from "axios";
import Country from "./Country";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      selectedCountryId: "",
    };
  }
  async componentDidMount() {
    const countries = await (await axios.get("/countries")).data;
    console.log(countries);
    this.setState({ countries });
    window.addEventListener("hashchange", () => {
      this.setState({ selectedCountryId: window.location.hash.slice(1) });
    });
    this.setState({ selectedCountryId: window.location.hash.slice(1) });
  }
  render() {
    const { countries, selectedCountryId } = this.state;
    return (
      <div>
        <h1>countries</h1>
        <ul>
          <li>
            <a href="#">All</a>
          </li>
          {countries.map((country) => {
            return (
              <li
                className={selectedCountryId === country.id ? "selected" : ""}
                key={country.id}
              >
                <a href={`#${country.id}`}>{country.name}</a>
              </li>
            );
          })}
        </ul>
        <div>
          {!!selectedCountryId && (
            <Country selectedCountryId={selectedCountryId} />
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("app"));
