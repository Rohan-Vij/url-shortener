import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onChangeLongUrl = this.onChangeLongUrl.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      longUrl: "",
      name: "",
      id: "",
    };
  }

  onChangeLongUrl(e) {
    this.setState({
      longUrl: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  pushHistory(id) {
    this.props.history.push(`/created/${id}`);
    this.props.history.go();
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Long URL: ${this.state.longUrl}`);
    console.log(`URL name: ${this.state.name}`);

    const newURL = {
      longUrl: this.state.longUrl,
      name: this.state.name,
    };

    axios
      .post("http://localhost:4000/api/url/shorten", newURL)
      .then((response) => {
        this.setState({ id: response.data._id });
        this.pushHistory(this.state.id);
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Shorten URL</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>URL to shorten: </label>
            <input
              type="text"
              value={this.state.longUrl}
              onChange={this.onChangeLongUrl}
            />
          </div>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>

          <div>
            <input type="submit" value="Shorten URL" />
          </div>
        </form>
      </div>
    );
  }
}
