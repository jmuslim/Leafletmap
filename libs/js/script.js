// Global Veriable 
let border = null;
let citiMarker = null;
let earthquakesMarker = null;

// Creating map and tiles
const myMap = L.map('gazMap').setView([0, 0], 4);

const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(myMap);

    //Create Extra Marker
    let arrowMarker = L.ExtraMarkers.icon({
        icon: 'fa-location-arrow fa-beat' ,
        prefix: 'fa',
        markerColor: 'white',
        iconColor:'#0721a3',
        shape: 'square'
      });

      let globeIcone = L.ExtraMarkers.icon({
        prefix: 'fa',
        icon: 'fa-earth fa-bounce',
        iconColor: 'black',
        markerColor: 'white',
        shape: 'square'
      });

      let cityIcon = L.ExtraMarkers.icon({
        prefix: 'fa',
        icon: 'fa-city fa-spin',
        iconColor: '#530669',
        markerColor: 'white',
        shape: 'square'
      });

      let earthquakesIcon = L.ExtraMarkers.icon({
        prefix: 'fa',
        icon: 'fa-cloud-bolt fa-shake',
        iconColor: '#cf0a0a',
        markerColor: 'white',
        shape: 'square'
      });


   //Extra map layer
let StadiaOSMBright = L.marker( {icon: arrowMarker, earthquakesIcon, cityIcon, globeIcone}).bindPopup('This is Stadia_OSMBright map.'),
Stadia_AlidadeSmooth = L.marker({icon: arrowMarker, earthquakesIcon, cityIcon, globeIcone}).bindPopup('This is Stadia_AlidadeSmooth map.'),
USGS_USImageryTopo = L.marker({icon: arrowMarker, earthquakesIcon, cityIcon, globeIcone}).bindPopup('This is USGS_USImageryTopo map.'),
satellite = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


googleStreet = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });


    //Overlayer
    let cities = L.markerClusterGroup({
        polygonOptions: {
          fillColor: '#fff',
          color: '#000',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.5
        }}).addTo(myMap);
    
    let earthquakesLayer = L.markerClusterGroup({
            polygonOptions: {
              fillColor: '#fff',
              color: '#000',
              weight: 2,
              opacity: 1,
              fillOpacity: 0.5
            }}).addTo(myMap);

 
// BaseMap, and OverLayers
    let baseMaps;
    let overlayer;


    const layerControl = L.control.layers(baseMaps, overlayer).addTo(myMap);
    const mousePosition = L.control.mousePosition().addTo(myMap);


    // Adding BaseLayer 
    layerControl.addBaseLayer(googleStreet, "Google Street"),
    layerControl.addBaseLayer(satellite, "Satellite"),
    layerControl.addBaseLayer(Stadia_OSMBright, "Stadia OSM Bright"),
    layerControl.addBaseLayer(Stadia_AlidadeSmooth, "Stadia AlidadeSmooth");
    layerControl.addOverlay(earthquakesLayer,"Earthquakes");
    layerControl.addOverlay(cities,"Cities");


// DOM
const countryInfoDisplay = document.querySelector('.country_Info');
const currencyDisplay = document.querySelector('.currency');
const wikipediaLink = document.querySelector('.wikipedia');
const covid19Link = document.querySelector('.covid19');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error);
}
function error(err){
    console.log(err);
}

// Marking Current Poisition
function success (position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

$.ajax({
    url: 'libs/php/center.php',
    data:{latitude:lat,
        longitude:lng
    },
    type: 'GET',
        success: function(response) {
            // console.log(response)
            var countryCode = response.data.countryCode;
            $('#countryList').val(countryCode).change();
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
    const marker =  L.marker([lat,lng], {icon: arrowMarker}).addTo(myMap);
    const circle = L.circle([lat,lng],{
    color:'blue',
    redius:500
    }).addTo(myMap);
    marker.bindPopup(`[<strong>lat:</strong> 51.752 ]<br>[<strong>lng:</strong> -0.925 ]<br><img width= 120 height= 100 src="libs/images/england.webp"/>`).openPopup();
}


// Border Highlighted for selected country 
$('#countryList').on('change', function() {
    
    $.ajax({
        url: 'libs/php/getBorderHighlight.php',
        type: 'GET',
        data:{countryCode:$('#countryList').val()},
        dataType: 'JSON',
        success: function (result) {
            console.log( result)
            if(border){
                border.clearLayers();
            }
           border = L.geoJSON(result.data).addTo(myMap);
            myMap.fitBounds(border.getBounds());

          
        },
        error: function (err) {
            console.log(err);
        }
    })
      
    });
        
//Render GeoData for weather
$.ajax({url: 'libs/php/countryBorder.php',
    type: 'GET',
    dataType: 'JSON',
    success:function(result){
        // console.log(result);
        for (const feature of result.data) {
            $('#countryList').append(`<option value='${feature.iso_a2}'>${feature.name}</option>`);
        }
    },
    error:function(err){
        console.log(err);
    }
});


// Weather DOM
const weatherTitle = document.querySelector('.weather-title');
const weatherBody = document.querySelector('.weather-body');
const currentTemparature = document.querySelector('.current_temperature');
const cloudCondition = document.querySelector('.cloud_condition');
const weatherIcon = document.querySelector('.weather_icon');

$('#fromAmount').keyup(function(){
    var exchange_rate_value = $('#exchange_rate_value').val();
    console.log(exchange_rate_value);
    if( $('#fromAmount').val()){
        $('#toAmount').val(exchange_rate_value * $('#fromAmount').val());
    }
    
});

//Forword_Geo_Coding and Weather 
$('#countryList').change(function(e){
    e.preventDefault();
    $.ajax({
        url: "libs/php/forwardGeocoding.php",
        type: 'POST',
        dataType: 'json',
        data:{
            countryName: encodeURI($('#countryList option:selected').text())
        },
            success: function(result) {
                console.log(result);
             if (result.status.name == "ok") {

                //Weather
                $.ajax({
                    url: "libs/php/weather.php",
                    type: 'POST',
                    dataType: 'json',
                    data:{
                        latitude: result.data.results[0].geometry.lat,
                        longitude: result.data.results[0].geometry.lng
                    },
                        success: function(result1) {
                            console.log(JSON.stringify(result1));
                            console.log(result1);
                         if (result1.status.name == "ok") {

                            weatherTitle.innerHTML = "";
                            weatherTitle.innerHTML += ` ${result.data.results[0].formatted}`;
                            currentTemparature.innerHTML = "";
                            currentTemparature.innerHTML += `<strong>Temperature: </strong>${result1.data.main.temp}&deg;C`;
                            weatherIcon.innerHTML = "";
                            weatherIcon.innerHTML += `<img src = https://openweathermap.org/img/wn/${result1.data.weather[0].icon}@2x.png>`;
                            cloudCondition.innerHTML = "";
                            cloudCondition.innerHTML += `<strong>Cloud: <br></strong>${result1.data.weather[0].description}`;
                            $('#weatherUpdate').modal("show");
                         }
               },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                    }
                });
             }
            },
    });


    //Country Information
const countryName = document.querySelector('.country_name');
const capitalName = document.querySelector('.capital_name');
const continentName = document.querySelector('.continent_name');
const languages = document.querySelector('.languages');
const iso3 = document.querySelector('.iso3');
const countryPopulation = document.querySelector('.population');
const countryAreaSqm = document.querySelector('.areaSqm');
const postalCode_Format = document.querySelector('.postalCode');

    $.ajax({
        url: "libs/php/geographicalInformation.php",
        type: 'POST',
        dataType: 'json',
        data:{
            country:$('#countryList').val()
        },
            success: function(result2) {
                console.log(JSON.stringify(result2));
             if (result2.status.code == "200") {
                // create cities ajax request here
                // console.log(result2.status.code, typeof result2.status.code);
                //   console.log(result2);
                
                  let areaSqm = parseFloat(result2.data[0].areaInSqKm).toLocaleString('en');
                  let population = parseFloat(result2.data[0].population).toLocaleString('en');

                  countryName.innerHTML ="";
                  countryName.innerHTML +=` ${result2.data[0].countryName}`;
                  capitalName.innerHTML="";
                  capitalName.innerHTML += `${result2.data[0].capital}`;
                  $('#weatherModalLabel').html(`${$('#weatherModalLabel').html()}${result2.data[0].capital}`);
                  continentName.innerHTML="";
                  continentName.innerHTML += `${result2.data[0].continentName}`;
                  languages.innerHTML="";
                  languages.innerHTML += `${result2.data[0].languages}`;
                  iso3.innerHTML="";
                  iso3.innerHTML += `${result2.data[0].isoAlpha3}`;
                  countryPopulation.innerHTML="";
                  countryPopulation.innerHTML += `${population}`;
                  countryAreaSqm.innerHTML="";
                  countryAreaSqm.innerHTML += `${areaSqm}`;
                  postalCode_Format.innerHTML="";
                  postalCode_Format.innerHTML += `${result2.data[0].postalCodeFormat}`;
                $('#countryInfoModal').modal();
             }
   },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });


//Another ajax call for cluster-marker
    $.ajax({
        url: "libs/php/geographicalInformation.php",
        type: 'POST',
        dataType: 'json',
        data:{
            country:$('#countryList').val()
        },
            success: function(geoResult) {
                // console.log(JSON.stringify(result2));
                // console.log(geoResult);
             if (geoResult.status.code == "200") {
                // created cities ajax request 
                $.ajax({
                    url:"libs/php/cities.php",
                    type: 'POST',
                    dataType: 'json',
                    data:{
                        north: geoResult.data[0].north,
                        south: geoResult.data[0].south,
                        east: geoResult.data[0].east,
                        west: geoResult.data[0].west,
                        lang: geoResult.data[0].languages,
                    },
                    success: function(citiesResult){
                        console.log(citiesResult);
                        if(citiMarker){
                            citiMarker.clearLayers();
                        }
                        citiMarker=L.markerClusterGroup();
                        if(citiesResult.status.code == "200"){
                           for (const iterator of citiesResult.data.geonames) {
                            citiMarker.addLayer(L.marker([iterator.lat, iterator.lng], {icon: cityIcon}).bindPopup(`<p>${iterator.name}</p>`));
                       }
                            myMap.addLayer(citiMarker);
                        }
                    },
                    error:function(err){
                        console.log(err);
                    }
                })
             }
   },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

//EarthQuakes OverLayer
$.ajax({
    url: "libs/php/geographicalInformation.php",
    type: 'POST',
    dataType: 'json',
    data:{
        country:$('#countryList').val()
    },
        success: function(geoResult) {
            // console.log(JSON.stringify(result2));
            // console.log(geoResult);
         if (geoResult.status.code == "200") {
            $.ajax({
                url:"libs/php/earthquakes.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    north: geoResult.data[0].north,
                    south: geoResult.data[0].south,
                    east: geoResult.data[0].east,
                    west: geoResult.data[0].west,
                },
                success: function(earthquakesResult){
                    console.log(earthquakesResult);
                    if(earthquakesMarker){
                        earthquakesMarker.clearLayers();
                    }
                    earthquakesMarker= L.markerClusterGroup();
                    if(earthquakesResult.status.code == "200"){
                       for (const iterator of earthquakesResult.data.earthquakes) {
                        earthquakesMarker.addLayer(L.marker([iterator.lat, iterator.lng], {icon: earthquakesIcon}).bindPopup(`<p><h6>Earthquakes</h6><img src="libs/images/earthquakes.png" width="80" height="80"><br>Date & Time: <br><strong>${iterator.datetime}</strong></p>`));
                                          }
                                        }
                        myMap.addLayer(earthquakesMarker);
                },
                error:function(err){
                    console.log(err);
                }
            })
         }
},
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
    }
});

// currency DOM 
const covertTo = document.querySelector('.coverto');

//Currency 
    $.ajax({
        url: "libs/php/currency.php",
        type: "POST",
        datatype: "json",
        data:{
            country:$('#countryList').val()
        },
            success: function(result3) {
                $('#fromAmount').val(1);
                $('#toAmount').val('');
                // console.log(JSON.stringify(result3));
                // console.log(result3);
                
                if (result3.status.code == "200") {
                    covertTo.innerHTML ="";
                    covertTo.innerHTML =`Conver to ${result3.data[1]}`;
                    $('#exchange_rate_value').val(result3.data[2]);
                    $('#toAmount').val(result3.data[2] * $('#fromAmount').val());
                }
            },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
             }
    });

// Wikipwadia DOM 
    const wikipediaTitle = document.querySelector('.wikipedia-title');

//Wikipedia  
    $.ajax({
        url: "libs/php/wikipedia.php",
        type: "POST",
        datatype: "json",
        data:{
                q:encodeURI($('#countryList option:selected').text())
        },
            success: function(result4) {
            // console.log(JSON.stringify(result4));
                if (result4.status.code == "200") {
                    // console.log(result4.status.code, typeof result4.status.code);
                    // console.log(result4.data);

                    wikipediaTitle.innerHTML = "";
                    wikipediaTitle.innerHTML +=`${result4.data.geonames[0].title}`;
                    wikipediaLink.innerHTML = "";
                    wikipediaLink.innerHTML +=`
                    <strong><img src="${result4.data.geonames[0].thumbnailImg}" height="100" width="200"><br>
                    <strong> Rank: </strong>${result4.data.geonames[0].rank}<br>
                    <strong> Summary: </strong> ${result4.data.geonames[0].summary}<br>
                    <a href="${result4.data.geonames[0].wikipediaUrl}">Wikipeadia</a>
                    `
                    $('#wikipedia_Info').modal();
                }
            },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
             }
    });



//Covid Dom
const covidCountryName = document.querySelector('.covidCountry');
const activeCase = document.querySelector('.activeCase');
const criticalCase = document.querySelector('.critical');
const totalRecovered = document.querySelector('.recovered');
const totalCase = document.querySelector('.total');
const totalDeath = document.querySelector('.totalDeath');


//Covid19 Modal
    $.ajax({
        url: "libs/php/covid19.php",
        type: "POST",
        datatype: "json",
        data:{
            country:encodeURI($('#countryList option:selected').text() == 'United Kingdom'?'UK':$('#countryList option:selected').text()),
        },
            success: function(covid_Result) {
            // console.log(JSON.stringify(covid_Result));
            // console.log(covid_Result.data)
                if (covid_Result.status.code == "200") {
                    // console.log(covid_Result);
                    let countryForCovid = (covid_Result.data.response[0].country);
                    let active_case =  parseFloat(covid_Result.data.response[0].cases.active).toLocaleString('en');
                    let critical = parseFloat(covid_Result.data.response[0].cases.critical).toLocaleString('en');
                    let recovred = parseFloat(covid_Result.data.response[0].cases.recovered).toLocaleString('en');
                    let total = parseFloat(covid_Result.data.response[0].cases.total).toLocaleString('en');
                    let total_deaths = parseFloat(covid_Result.data.response[0].deaths.total).toLocaleString('en');


                    covidCountryName.innerHTML = "";
                    covidCountryName.innerHTML += `${countryForCovid}`;
                    activeCase.innerHTML = "";
                    activeCase.innerHTML += `${active_case}`;
                    criticalCase.innerHTML = "";
                    criticalCase.innerHTML += `${critical}`;
                    totalRecovered.innerHTML = "";
                    totalRecovered.innerHTML += `${recovred}`;
                    totalCase.innerHTML = "";
                    totalCase.innerHTML += `${total}`;
                    totalDeath.innerHTML = "";
                    totalDeath.innerHTML += `${total_deaths}`;
                    $('#covidInfoModal').modal();
                }
            },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
             }
    });
});


//Wikipeadia Link L.easyButton
L.easyButton({
    position: 'topleft',
    id:'wikipediaModal',
    states: [{
        icon: "fa-globe",
        stateName: 'unloaded',
        title: 'Wikipeadia',
        onClick: function(btn,map) {
            $("#wikipediaModal").modal("show");
            $(".close").click(function(){
                $("#wikipediaModal").modal('hide');
            });
        }
    }, {
        icon: 'fa-globe',
        stateName: 'checked',
        onClick: function(btn,map) {
            btn.state('unchecked');
        }
    }]
}).addTo(myMap);


//weather update L.easyButton
L.easyButton({
    position: 'topleft',
    id: 'weatherModal',
    states: [{
        icon: " fa-cloud",
        stateName: 'unloaded',
        title: 'Weather',
        onClick: function(btn,map) {
            $("#weatherModal").modal("show");
            $(".close").click(function(){
                $("#weatherModal").modal('hide');
            });
        }
    }, {
        icon: '&curren;',
        stateName: 'checked',
        onClick: function(btn,map) {
            btn.state('unchecked');
        }
    }]
}).addTo(myMap);


//country information L.easyButton
L.easyButton({
    position: 'topleft',
    id: 'countryInfoModal',
    states: [{
        icon: "fa-location-arrow",
        stateName: 'unloaded',
        title: 'Country Details',
        onClick: function(btn,map) {
            $("#countryInfoModal").modal('show');
            $(".close").click(function(){
                $("#countryInfoModal").modal('hide');
            });
        }
    }, {
        icon: 'fa-location-arrow',
        stateName: 'checked',
        onClick: function(btn,map) {
            btn.state('unchecked');
        }
    }]
}).addTo(myMap);


//Currency L.easyButton
L.easyButton({
    position: 'topleft',
    id: 'currencyModal',
    states: [{
        icon: "fa-solid fa-coins",
        stateName: 'unloaded',
        title: 'Currency',
        onClick: function(btn,map) {
            $("#currencyModal").modal("show");
            $(".close").click(function(){
                $("#currencyModal").modal('hide');
            });
        }
    },
     {
        icon: "fa-solid fa-coins",
        stateName: 'checked',
        onClick: function(btn,map) {
            btn.state('unchecked');
        }
    }]
}).addTo(myMap);


//Covi19 L.EasyButton
L.easyButton({
    position: 'topleft',
    id: 'covidInfoModal',
    states: [{
        icon: "fa-virus-covid",
        stateName: 'unloaded',
        title: 'Covid19',
        onClick: function(btn,map) {
            $("#covidInfoModal").modal("show");
            $(".close").click(function(){
                $("#covidInfoModal").modal('hide');
            });
        }
    },
     {
        icon: "fa-virus-covid",
        stateName: 'checked',
        onClick: function(btn,map) {
            btn.state('unchecked');
        }
    }]
}).addTo(myMap);
