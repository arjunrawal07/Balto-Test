import React, { Component } from "react";
import { render } from "react-dom";
// import data from "movies_django/frontend/converted.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
    };
  }

  componentDidMount() {
    //insert deployed API url
    fetch("")
      .then((response) => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then((data) => {
        this.setState(() => {
          return {
            data,
            loaded: true,
          };
        });
      });
  }

  render() {
    return (
      <ul>
        {this.state.data.map((movie) => {
          return (
            <li key={movie.id}>
              <li>{movie.year}</li>
              <li>{movie.title}</li>
              <li>{movie.origin}</li>
              <li>{movie.director}</li>
              <li>{movie.cast}</li>
              <li>{movie.genre}</li>
              <li>{movie.plot}</li>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
