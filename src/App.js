import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    venues : []
  }

  componentDidMount() {
    this.getVenues()
  }

  //Load map
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB3ro0efVYXR4fpp2LGFy_OH_1pYSGr5zU&callback=initMap")
    window.initMap = this.initMap
  }

  //This function calls the api(async)
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "V0MGSNY43UW3DAQ4O5H0WQ2APPZNTVJ2X503OCDPEWPIVLG1",
      client_secret: "VYIZPC2KDMBWEK3Q5ESDRORXXYBBFJ0LDAWP5NDNWZAYCIAH",
      query: "food",
      near: "San Jose",
      v:"20182507"
    }

    //Get data and store it in venues
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
    })
    .catch(error => {
      console.log("error " + error)
    })
  }

  //Creates map in map id html tag
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.335, lng: -121.893},
      zoom: 8
    });

    //Create infowindow
    var infowindow = new window.google.maps.InfoWindow();

    //Display markers
    this.state.venues.map(myVenue => {

      var contentString = `${myVenue.venue.name}`;

      //create map markers
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      });

      //Open info window on click
      marker.addListener('click', function() {
        
        //Change the content
        infowindow.setContent(contentString)

        //Open info window
        infowindow.open(map, marker);

      });
    })



  }

  render() {
    return (
      <main>
        <div>
          <a className="menu" tabIndex="0">
            <svg class="hamburger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            </svg>
          </a>
          <h1>Neghiborhood Map</h1>
          <div id="map"></div>
        </div>  
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
