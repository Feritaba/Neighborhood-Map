export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
        resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }

    function gm_authFailure(){
      window.alert("Google Maps error!");
    }
    
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = 'AIzaSyB3ro0efVYXR4fpp2LGFy_OH_1pYSGr5zU';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}


export function load_places() {
      let city = 'San Jose, CA';
      let query = 'Coffee';
      var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=V0MGSNY43UW3DAQ4O5H0WQ2APPZNTVJ2X503OCDPEWPIVLG1&client_secret=VYIZPC2KDMBWEK3Q5ESDRORXXYBBFJ0LDAWP5NDNWZAYCIAH&v=20130815%20&limit=50&near=' + city + '&query=' + query + '';
      return fetch(apiURL).then(resp => resp.json())
}