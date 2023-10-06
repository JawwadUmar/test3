window.onload = function(){
    trackLocation();
};

// Function to show a custom alert message
function customAlert(message) {
    var modal = document.getElementById("custom-modal");
    var modalMessage = document.getElementById("modal-message");
  
    modalMessage.textContent = message;
    modal.style.display = "block";
  }

  document.getElementsByClassName("close")[0].addEventListener("click", function() {
    var modal = document.getElementById("custom-modal");
    modal.style.display = "none";
  });


function generateKey(lat, long) {
    // return lat + ',' + long;
    return [lat, long];
}


        var x = document.getElementById("location");
        var r = document.getElementById("radius");
        var y = document.getElementById("currentspeed");
        var z = document.getElementById("safespeed");
        var w = document.getElementById("designspeed");
        

        
        var lat =0;
        var long = 0;
        var coordinates =[];
        var watchId; // To store the ID of the watchPosition

            // Map-like object to store coordinates as keys and radii as values
            const map = {};

            // Adding data to the map
            function addToMap(lat, long, radius) {
                const key = generateKey(lat, long);
                map[key] = radius;
            }

            // Getting the radius based on coordinates
            function getRadius(lat, long) {
                const key = generateKey(lat, long);
                return map[key];
            }


            addToMap(22.520694, 75.921953, 10.6531); 
            addToMap(22.520734, 75.922038, 10.6531); 
            addToMap(22.520731, 75.922062, 10.6531);
            addToMap(22.52068, 75.922284, 18.2727);   
            addToMap(22.520702, 75.922424, 18.2727);   
            addToMap(22.520786, 75.922563, 17.1537);   
            addToMap(22.520802, 75.922708, 17.1537);   
            addToMap(22.520609, 75.923312, 18.4929);   
            addToMap(22.520703, 75.923536, 18.4929);   
            addToMap(22.52306, 75.924593, 15.1136);   
            addToMap(22.523144, 75.924728, 15.1136);   
            addToMap(22.523146, 75.9252, 13.7793);   
            addToMap(22.523197, 75.92531, 13.7793);   
            addToMap(22.523308, 75.92546, 25.7057);   
            addToMap(22.523423, 75.925525, 16.6246);   
            addToMap(22.525008, 75.925663, 15.7109);

        
            function safetyWarning (currSpeed, safeSpeed, designSpeed){

                if(currSpeed >= safeSpeed){
                    // alert("Please slow down");
                    customAlert("Please slow down");
                }

                else if(currSpeed>= designSpeed){
                    // alert("Please slow down");
                    customAlert("Please slow down");
                }
            }
            
        function trackLocation() {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(showExactPosition, showError);
            } else {
                x.innerHTML = "Geolocation is not supported";
            }
        }

    function showExactPosition(position) {
    // lat = 22.523197;
    // long = 75.92531;
    lat = position.coords.latitude;
    long = position.coords.longitude;
    const speed = position.coords.speed || 0; // Get the current speed from the geolocation data

    // Update the coordinates array with the new values
    coordinates = [lat, long];
    console.log(coordinates);

    const radius = getRadius(lat, long);
    if (typeof radius === 'undefined') {
        safeSpeed = 'undefined';
        designSpeed = 'undefined'
        console.log(`No radius found for coordinates: (${lat}, ${long})`);
    } else {
        safeSpeed = (88.87 - 2554.76/radius)*(0.278); //converted into m/s
        designSpeed = Math.sqrt((0.22) * 9.8 * radius);
        console.log(`Radius for coordinates (${lat}, ${long}): ${radius}`); 
    }
    x.innerHTML = "Latitude: " + lat +
    "<br>Longitude: " + long
    r.innerHTML = radius;
    y.innerHTML = speed.toFixed(2) + "m/s";
    z.innerHTML = (safeSpeed !== 'undefined' ? safeSpeed.toFixed(2) + " m/s" : 'undefined');
    w.innerHTML = (designSpeed !== 'undefined' ? designSpeed.toFixed(2) + " m/s" : 'undefined');
    

        if(safeSpeed !== 'undefined' || designSpeed !== 'undefined'){
            safetyWarning(speed, safeSpeed, designSpeed);
        }
}

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    x.innerHTML = "An unknown error occurred.";
                    break;
            }
        }

        
