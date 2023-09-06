// Creating map and tiles
const myMap = L.map('gazMap').setView([0, 0], 4);

const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(myMap);

let Stadia_OSMBright = L.marker([39.73, -104.8]).bindPopup('This is Stadia_OSMBright map.'),
Stadia_AlidadeSmooth = L.marker([39.75, -105.23]).bindPopup('This is Stadia_AlidadeSmooth map.'),
USGS_USImageryTopo = L.marker([39.79, -105.23]).bindPopup('This is USGS_USImageryTopo map.'),
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

    

// BaseMap, and OverLayers
let World7wonder;
    const baseMaps = {
        "googleStreet": googleStreet,
    };
    const overlayMaps = {
        "googleStreet": googleStreet,
    };
    
    const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    const mousePosition = L.control.mousePosition().addTo(myMap);
    const scalBar = L.control.scale({position:'bottomleft', maxwidth:300}).addTo(myMap);
    const ploylineDraw = L.control.polylineMeasure().addTo(myMap);
    const searchBar = L.Control.openCageSearch({key:'17215bab532f416fb56b5d34e70f108b', limit:10}).addTo(myMap);

    // Adding BaseLayer 
    layerControl.addBaseLayer(satellite, "Satellite"),
    layerControl.addBaseLayer(Stadia_OSMBright, "Stadia_OSMBright"),
    layerControl.addBaseLayer(Stadia_AlidadeSmooth, "Stadia_AlidadeSmooth");


//World 7 wonder with overLayer
let theColosseumMarker = L.marker([41.89032198651016, 12.492155794382084]).bindPopup(`<strong>1.The Colosseum, Rome, Italy</strong><br>The Colosseum is the great oval amphitheater in the center of Rome where gladiators once fought for their life. The largest amphitheater ever built, it was constructed from sand and stone over eight years, from AD72 to AD80. The colossal structure could hold 80,000 spectators, arranged in a circular ring around the central stage. <br>
<img width= 180 height= 180 src ="libs/images/colosseum1.webp" />`);

    theGreatWallMarker = L.marker([40.432722885980226, 116.56998831293743]).bindPopup(`<strong>2.The Great Wall of China</strong><br>The Great Wall of China is a huge barrier that spans thousands of miles along China’s historic northern border. Created over millennia, the wall began its life as a series of smaller walls dating back to the 7th century BCE, built as protective barriers against nomadic raids. In 220 BCE, measures a whopping 13,171 miles.<br>
<img width= 180 height= 180 src ="libs/images/great-wall-china2.webp" />`);

    theTajMahalMarker = L.marker([27.17528794423407, 78.0420670936512]).bindPopup(`<strong>3.The Taj Mahal, India</strong><br>ndia’s renowned Taj Mahal (Persian for Crown of Palaces) is the stunning white marble mausoleum on the bank of the Yamuna River in the city of Agra. Mughal emperor, Shah Jahan built the temple as a tomb for his beloved wife Mumtaz Mahal, who died during childbirth in 1631. A marble tomb in the center is surrounded by 42 acres of grounds, where gardens, a mosque, guest house and pool complete the complex. The project took over 22 years to complete by 20,000 workers at a cost of 32 million rupees (around US$827 million by today’s standards).<br>
<img width= 180 height= 180 src ="libs/images/the-taj-mahal3.webp" />`),

    christTheRedeemerMarker = L.marker([-22.9516689924088, -43.210551577670024]).bindPopup(`<strong>4.Christ the Redeemer, Brazil</strong><br>The totemic statue of Christ the Redeemer stands over Rio de Janeiro on the top of Mount Corcovado. At 30 meters tall, this monument is an iconic emblem of Brazil. This huge public artwork was designed by the Polish-French sculptor Paul Landowski in the 1920s and completed by Brazilian engineer Heitor da Silva Costa, and French engineer Albert Caquot in 1931. Made from reinforced concrete clad in over 6 million soapstone tiles, Christ the Redeemer is the largest Art Deco sculpture in the world. Built just after the end of the First World War.<br>
<img width= 180 height= 180 src ="libs/images/christ-the-redeemer3.webp" />`),

    theMachuPicchuMarker = L.marker([-13.171609953700436, -72.54265302896307]).bindPopup(`<strong>5.Machu Picchu, Peru</strong><br>Machu Picchu is a lost treasure of the 15th century, a rare citadel discovered high in the Andes mountains above the Peruvian Sacred Valley. Astonishingly, it is one of the only pre-Columbian ruins found nearly intact, featuring evidence of former plazas, temples, agricultural terraces and homes. Archaeologists believe the citadel was built as an estate for the Inca emperor Pachacuti in around 1450 in polished drystone walls.<br>
<img width= 180 height= 180 src ="libs/images/machu-picchu4.webp" />`);

    theChichénItzáMarker = L.marker([20.68480057843818, -88.56796275716576]).bindPopup(`<strong>6.Chichén Itzá, Mexico</strong><br>Chichen Itza, a historic Mayan city built between the 9th and 12th centuries. Constructed by the pre-Columbian Mayan tribe Itzá, the city includes a series of monuments and temples.<br>
<img width= 180 height= 180 src ="libs/images/chichen-itza6.webp" />`);

    thePetraMarker = L.marker([30.371717556690538, 35.46164280344782]).bindPopup(`<strong>7. Petra, Jordan</strong><br> Petra, the ancient city in southern Jordan is also known as the ‘rose city’ for its golden hue.<br>
<img width= 180 height= 180 src ="libs/images/Petra7.jpg" />`);



// Layer Group
let theColosseum = L.layerGroup([theColosseumMarker]);
let theGreatWall = L.layerGroup([theGreatWallMarker]);
let theTajMahal = L.layerGroup([theTajMahalMarker]);
let christTheRedeemer = L.layerGroup([christTheRedeemerMarker]);
let theMachuPicchu = L.layerGroup([theMachuPicchuMarker]);
let theChichénItzá = L.layerGroup([theChichénItzáMarker]);
let thePetra = L.layerGroup([thePetraMarker]);

// Adding OverLAyer 
layerControl.addOverlay(theColosseum, "1.The Colosseum, Rome, Italy");
layerControl.addOverlay(theGreatWall, "2.The Great Wall of China");
layerControl.addOverlay(theTajMahal, "3.The Taj Mahal, India");
layerControl.addOverlay(christTheRedeemer, "4.Christ the Redeemer, Brazil");
layerControl.addOverlay(theMachuPicchu, "5.Machu Picchu, PerueMachuPicchu");
layerControl.addOverlay(theChichénItzá, "6.Chichén Itzá, Mexico");
layerControl.addOverlay(thePetra, "7.Petra, Jordan");


//DOM Element
const weatherDisplay = document.querySelector('.weather');
const countryInfoDisplay = document.querySelector('.country_Info');
const currencyDisplay = document.querySelector('.currency');
const wikipediaLink = document.querySelector('.wikipedia');
const covid19Link = document.querySelector('.covid19');



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
            console.log(response)
            var countryCode = response.data.countryCode;
            $('#countryList').val(countryCode).change();
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
    const marker =  L.marker([lat,lng]).addTo(myMap);
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
           let border = L.geoJSON(result.data).addTo(myMap);
           myMap.fitBounds(border.getBounds());
        },
        error: function (err) {
            console.log(err);
        }
    });
})

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

                $.ajax({
                    url: "libs/php/weather.php",
                    type: 'POST',
                    dataType: 'json',
                    data:{
                        latitude: result.data.results[0].geometry.lat,
                        longitude: result.data.results[0].geometry.lng
                    },
                        success: function(result1) {
                            // console.log(JSON.stringify(result1));
                         if (result1.status.name == "ok") {
                            weatherDisplay.innerHTML = "";
                            weatherDisplay.innerHTML += 
                            `<img src = https://openweathermap.org/img/wn/${result1.data.weather[0].icon}@2x.png><br>
                            <strong>Country: </strong> ${result1.data.sys.country}, ${result1.data.name}<br>
                            <strong>Temperature: </strong>${result1.data.main.temp}&deg;C <br>
                            <strong>Max_temp: </strong>${result1.data.main.temp_max}&deg;C <br>
                            <strong>Min_temp: </strong>${result1.data.main.temp_min}&deg;C <br>
                            <strong>Feels-Like: </strong>${result1.data.main.feels_like}&deg;C<br>
                            <strong>Humidity: </strong>${result1.data.main.humidity}%<br>
                            <strong>Cloud: </strong>${result1.data.weather[0].description}<br>`
                            // console.log(result1);
                            $('#weatherUpdate').modal("show");
                            // $('#weatherUpdate').modal("show");
                         }
               },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                    }
                });

             }
            },
    });

    $.ajax({
        url: "libs/php/geographicalInformation.php",
        type: 'POST',
        dataType: 'json',
        data:{
            country:$('#countryList').val()
        },
            success: function(result2) {
                // console.log(JSON.stringify(result2));
             if (result2.status.code == "200") {
                // create cities ajax request here
                // console.log(result2.status.code, typeof result2.status.code);
                
                  let areaSqm = parseFloat(result2.data[0].areaInSqKm).toLocaleString('en');
                  let population = parseFloat(result2.data[0].population).toLocaleString('en');
                  
                countryInfoDisplay.innerHTML = "";
                countryInfoDisplay.innerHTML +=
                `<strong>Country Name: </strong> ${result2.data[0].countryName}, ${result2.data[0].isoAlpha3}<br>
                <strong>Capital: </strong> ${result2.data[0].capital}<br>
                <strong>Continent: </strong> ${result2.data[0].continentName}<br>
                <strong>Area-In-SqKm: </strong> ${areaSqm}<br>
                <strong>Population: </strong>  ${population}<br>
                <strong>Languages: </strong> ${result2.data[0].languages}<br>`
                $('#country_information').modal();
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
                console.log(geoResult);
             if (geoResult.status.code == "200") {
                // create cities ajax request here
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
                        if(citiesResult.status.code == "200"){
                            console.log(citiesResult);
                            let marker_cluster = L.markerClusterGroup();
                           for (const iterator of citiesResult.data.geonames) {
                            marker_cluster.addLayer(L.marker([iterator.lat, iterator.lng]).bindPopup(`<p>${iterator.name}</p>`));
                           }
                            myMap.addLayer(marker_cluster);
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

//Currency 
    $.ajax({
        url: "libs/php/currency.php",
        type: "POST",
        datatype: "json",
        data:{
            country:$('#countryList').val()
        },
            success: function(result3) {
                // console.log(JSON.stringify(result3));
                if (result3.status.code == "200") {
                    // console.log(result3.status.code, typeof result3.status.code);
                    currencyDisplay.innerHTML = "";
                    currencyDisplay.innerHTML +=`
                    <strong> USD Doller: </strong>${result3.data[0]} <br>
                    <strong> ${result3.data[1]} : </strong>${result3.data[2]}<br>
                    `
                    $('#currency_info').modal();
                }

            },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
             }
    });

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
                    wikipediaLink.innerHTML = "";
                    wikipediaLink.innerHTML +=`
                    <strong> Country title: </strong>${result4.data.geonames[0].title}<br>
                    <strong> Rank: </strong>${result4.data.geonames[0].rank}<br>
                    <strong><img src="${result4.data.geonames[0].thumbnailImg}" height="100" width="200"><br>
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


//Covid19 Modal
    $.ajax({
        url: "libs/php/covid19.php",
        type: "POST",
        datatype: "json",
        data:{
            country:encodeURI($('#countryList option:selected').text()),
        },
            success: function(covid_Result) {
            console.log(JSON.stringify(covid_Result));
            console.log(covid_Result.data)
                if (covid_Result.status.code == "200") {
                    console.log(covid_Result);
                    let active_case =  parseFloat(covid_Result.data.response[0].cases.active).toLocaleString('en');
                    let critical = parseFloat(covid_Result.data.response[0].cases.critical).toLocaleString('en');
                    let recovred = parseFloat(covid_Result.data.response[0].cases.recovered).toLocaleString('en');
                    let total = parseFloat(covid_Result.data.response[0].cases.total).toLocaleString('en');
                    let total_deaths = parseFloat(covid_Result.data.response[0].deaths.total).toLocaleString('en');

                    covid19Link.innerHTML = "";
                    covid19Link.innerHTML +=`
                    <strong> Country: </strong>${covid_Result.data.response[0].country}<br>
                    <strong> Active Case: </strong>${active_case}<br>
                    <strong> Critical: </strong>${critical}<br>
                    <strong> Recovered: </strong>${recovred}<br>
                    <strong> Total: </strong>${total}<br>
                    <strong> Total Death: </strong>${total_deaths}<br>
                    
                    `
                    $('#covid19_Info').modal();
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
    id:'wikipedia_Info',
    states: [{
        icon: "fa-globe",
        stateName: 'unloaded',
        title: 'Wikipeadia',
        onClick: function(btn,map) {
            $("#wikipedia_Info").modal("show");
            $(".close").click(function(){
                $("#wikipedia_Info").modal('hide');
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
    id: 'weatherUpdate',
    states: [{
        icon: "fa-solid fa-cloud",
        stateName: 'unloaded',
        title: 'Weather',
        onClick: function(btn,map) {
            $("#weatherUpdate").modal("show");
            $(".close").click(function(){
                $("#weatherUpdate").modal('hide');
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
    id: 'country_information',
    states: [{
        icon: "fa-location-arrow",
        stateName: 'unloaded',
        title: 'Country Details',
        onClick: function(btn,map) {
            $("#country_information").modal('show');
            $(".close").click(function(){
                $("#country_information").modal('hide');
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
    id: 'currency_info',
    states: [{
        icon: "fa-solid fa-flag-checkered",
        stateName: 'unloaded',
        title: 'Currency',
        onClick: function(btn,map) {
            $("#currency_info").modal("show");
            $(".close").click(function(){
                $("#currency_info").modal('hide');
            });
        }
    },
     {
        icon: 'fa-solid fa-flag-checkered',
        stateName: 'checked',
        onClick: function(btn,map) {
            btn.state('unchecked');
        }
    }]
}).addTo(myMap);


//Covi19 L.EasyButton
L.easyButton({
    position: 'topleft',
    id: 'covid19_Info',
    states: [{
        icon: "fa-solid fa-plus",
        stateName: 'unloaded',
        title: 'Covid19',
        onClick: function(btn,map) {
            $("#covid19_Info").modal("show");
            $(".close").click(function(){
                $("#covid19_Info").modal('hide');
            });
        }
    },
     {
        icon: "fa-solid fa-plus",
        stateName: 'checked',
        onClick: function(btn,map) {
            btn.state('unchecked');
        }
    }]
}).addTo(myMap);