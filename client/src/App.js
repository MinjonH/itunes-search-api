import React from "react";

// Style sheets
import "./App.css";

// Components
import Search from "./components/search"; 
import Favourites from "./components/favourites";
import Results from "./components/results";

// Font/icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas); // passing all icons in @fortawesome/free-solid-svg-icons

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
      iTunes: [],
      issue: undefined,
    };
  }

  // GET api, fetches favourites from favList.json
  getFav = () => {
    fetch("/api")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            favourites: result,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            issue: error,
          });
        }
      );
  };

  // Search button fetches the itunes api based on search input fields
  itunesSearch = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Get form input values and assign them to term and media
    const term = e.target.term.value.replace(" ", "+").trim().toLowerCase(); // replace space with +
    const media = e.target.media.value;
    const api_call = await fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&country=za&limit=25`); //Making the API call with the term and media input varibles


    if (api_call.status !== 200) {
      //check if api_call is not successful -> send error.
      this.setState({
        iTunes: [],
        issue: "Search failed",
      });
      return;
    }

    const data = await api_call.json(); //parsing the json data recieved.

    if (term && media) {
      //if term and media both return true or have inputs ->
      if (data.resultCount === 0) {
        //if nothing is returned -> send error.
        this.setState({
          iTunes: [],
          issue:
            "This item is currently unavailable in the iTunes store.",
        });
      } else {
        console.log(data.results);
        //if inputs match something in database -> setState data.results array to results.
        this.setState({
          iTunes: data.results,
          issue: "",
        });
      }
    } else {
      //if inputs were empty -> send error.
      this.setState({
        iTunes: [],
        issue: "Please enter search criteria.",
      });
    }
  };

  // Add to favourites.
  addFav = (result) => {
    // If an item is already a favourite, it gets removed
    if (
      this.state.favourites.some((del_fav) => del_fav.trackId === result.trackId)
    ) {
      const trackId = result.trackId.toString();

      fetch(`/${trackId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then((res) => res.json()) // transforms data from the server into json

        //Catches any errors
        .catch((error) => console.log(error));

      //update favourites to exclude removed items
      const filteredFavourites = this.state.favourites.filter(
        (newFav) => newFav.trackId !== parseInt(trackId)
      );
      this.setState({ favourites: filteredFavourites });
    } else {
      // Assign fav to values that will update te favList.json file
      const newFavMedia = {
        trackID: result.trackID,
        artistName: result.artistName,
        trackName: result.trackName,
        artworkUrl100: result.artworkUrl100,
        kind: result.kind,
      };

      // HTTP request to update favList.json
      fetch('/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newFavMedia),
      })
        .then((res) => res.json()) // transforms data from the server into favList.json

        //Catches any errors
        .catch((error) => console.log(error));

      //Updates favourite with the new favourite item
      const newFavourites = [...this.state.favourites];
      newFavourites.push(newFavMedia);
      this.setState({ favourites: newFavourites });
    }
  };

  //deletes favourite from list
  delFav = (trackId) => {
    const newtrackId = trackId.toString();

    fetch(`/${newtrackId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())

      .catch((error) => console.log(error));

    //Removes deleted item from
    const filteredFavourites = this.state.favourites.filter(
      (newFav) => newFav.trackId !== parseInt(newtrackId)
    );
    this.setState({ favourites: filteredFavourites });
  };

  // onload, calls getFav() to fetch data from favList.json
  componentDidMount = () => {
    this.getFav();
  };

  render() {
    //Displays the components
    return (
      <div className="App">
        <header className="App-header">
          <div className="cnter">
            <Search itunesSearch={this.itunesSearch} />
            <Results
              favourites={this.state.favourites}
              search={this.state.iTunes}
              error={this.state.issue}
              addFav={this.addFav}
            />
            <Favourites
              favourites={this.state.favourites}
              delFav={this.delFav}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;