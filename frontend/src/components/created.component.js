import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameUrl: "",
      longUrl: "",
      shortUrl: "",
      date: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/url/return/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          nameUrl: response.data.nameUrl,
          longUrl: response.data.longUrl,
          shortUrl: response.data.shortUrl,
          date: response.data.date,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Successfully shortened URL!</h3>
        <p>Name: {this.state.nameUrl}</p>
        <p>Long URL: {this.state.longUrl}</p>
        <p>Shortened URL: {this.state.shortUrl}</p>
        <p>Date: {this.state.date}</p>

        <Link to={"/"}>Shorten Another URL</Link>
      </div>
    );
  }
}
