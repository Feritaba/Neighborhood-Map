import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    venues : []
  }

  componentDidMount() {
    this.getVenues()
    this.renderMap()
  }


  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB3ro0efVYXR4fpp2LGFy_OH_1pYSGr5zU&callback=initMap")
    window.initMap = this.initMap
  }


  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "V0MGSNY43UW3DAQ4O5H0WQ2APPZNTVJ2X503OCDPEWPIVLG1",
      client_secret: "VYIZPC2KDMBWEK3Q5ESDRORXXYBBFJ0LDAWP5NDNWZAYCIAH",
      query: "food",
      near: "San Jose",
      v:"20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        })
    })
    .catch(error => {
      console.log("error " + error)
    })
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.335, lng: -121.893},
      zoom: 8
    });
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}


function loadScript(url) {
  let index  = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
