// Creating map and tiles
const myMap = L.map('gazMap').setView([0, 0], 5);
const tileLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'}).addTo(myMap);

// Tile-Layereet = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}').bindPopup('I am Google map.'),
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

    // Marking Current Poisition
    let currentPossition = navigator.geolocation.getCurrentPosition(success);
    function success (position){
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        const marker =  L.marker([lat,lng]).addTo(myMap);
       let circle = L.circle([lat,lng],
        {
        color:'blue',
        fillColor:'#f03',
        fillOpacity:0.5,
        redius:accuracy
        }).addTo(myMap);
    
        marker.bindPopup("[ lat: 51.752 ]<br>[ lng:-0.925 ]").openPopup();
    }
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
let theColosseumMarker = L.marker([41.89032198651016, 12.492155794382084]).bindPopup(`<strong>1.The Colosseum, Rome, Italy</strong><br>The Colosseum is the great oval amphitheater in the center of Rome where gladiators once fought for their life. The largest amphitheater ever built, it was constructed from sand and stone over eight years, from AD72 to AD80. The colossal structure could hold 80,000 spectators, arranged in a circular ring around the central stage. `);
    theGreatWallMarker = L.marker([40.432722885980226, 116.56998831293743]).bindPopup(`<strong>2.The Great Wall of China</strong><br>The Great Wall of China is a huge barrier that spans thousands of miles along China’s historic northern border. Created over millennia, the wall began its life as a series of smaller walls dating back to the 7th century BCE, built as protective barriers against nomadic raids. In 220 BCE, China’s first Emperor Qin Shi Huang masterminded the unification of all China’s walls into one almighty barrier, strengthening and extending the wall to keep out northern invaders. Today the wall is recognized as one of the seven wonders, which, including all its branches, measures a whopping 13,171 miles.`);
    theTajMahalMarker = L.marker([27.17528794423407, 78.0420670936512]).bindPopup(`<strong>3.The Taj Mahal, India</strong><br>ndia’s renowned Taj Mahal (Persian for Crown of Palaces) is the stunning white marble mausoleum on the bank of the Yamuna River in the city of Agra, and it has been selected as one of the seven wonders of the world. Mughal emperor, Shah Jahan built the temple as a tomb for his beloved wife Mumtaz Mahal, who died during childbirth in 1631. A marble tomb in the center is surrounded by 42 acres of grounds, where gardens, a mosque, guest house and pool complete the complex. The entire project took over 22 years to complete by 20,000 workers at a cost of 32 million rupees (around US$827 million by today’s standards).`),
    christTheRedeemerMarker = L.marker([-22.9516689924088, -43.210551577670024]).bindPopup(`<strong>4.Christ the Redeemer, Brazil</strong><br>The totemic statue of Christ the Redeemer stands over Rio de Janeiro on the top of Mount Corcovado. At 30 meters tall, this monument is an iconic emblem of Brazil. This huge public artwork was designed by the Polish-French sculptor Paul Landowski in the 1920s and completed by Brazilian engineer Heitor da Silva Costa, and French engineer Albert Caquot in 1931. Made from reinforced concrete clad in over 6 million soapstone tiles, Christ the Redeemer is the largest Art Deco sculpture in the world. Built just after the end of the First World War, the sculpture was an overpowering symbol of Christianity and hope when the world had been brought to its knees, so its no surprise that this monument made the list for today’s seven wonders.`),
    theMachuPicchuMarker = L.marker([-13.171609953700436, -72.54265302896307]).bindPopup(`<strong>5.Machu Picchu, Peru</strong><br>Machu Picchu is a lost treasure of the 15th century, a rare citadel discovered high in the Andes mountains above the Peruvian Sacred Valley. Astonishingly, it is one of the only pre-Columbian ruins found nearly intact, featuring evidence of former plazas, temples, agricultural terraces and homes. Archaeologists believe the citadel was built as an estate for the Inca emperor Pachacuti in around 1450 in polished drystone walls. The Incas abandoned the site a century later and it remained hidden for millennia, before being brought to public attention by American historian Hiram Bingham in 1911. Because of this remarkable preservation, it is recognized today as one of the seven wonders.`);
    theChichénItzáMarker = L.marker([20.68480057843818, -88.56796275716576]).bindPopup(`<strong>6.Chichén Itzá, Mexico</strong><br>Chichen Itza, a historic Mayan city built between the 9th and 12th centuries. Constructed by the pre-Columbian Mayan tribe Itzá, the city includes a series of monuments and temples.`);
    thePetraMarker = L.marker([30.371717556690538, 35.46164280344782]).bindPopup(`<strong>7. Petra, Jordan</strong><br> Petra, the ancient city in southern Jordan is also known as the ‘rose city’ for its golden hue`);

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


//Uk Border Polygon
let currentGeoCountry = [{
    "type": "Feature",
    "properties": {"name": "United Kingdom"},
    "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[-5.661948614921897,54.55460317648385],[-6.197884894220977,53.86756500916334],[-6.953730231137996,54.073702297575636],[-7.572167934591079,54.05995636658599],[-7.366030646178785,54.595840969452695],[-7.572167934591079,55.1316222194549],[-6.733847011736145,55.1728600124238],[-5.661948614921897,54.55460317648385]]],[[[-3.005004848635281,58.63500010846633],[-4.073828497728016,57.55302480735525],[-3.055001796877661,57.69001902936095],[-1.959280564776918,57.68479970969951],[-2.219988165689301,56.87001740175353],[-3.119003058271118,55.973793036515474],[-2.085009324543023,55.90999848085127],[-2.005675679673857,55.80490285035023],[-1.11499101399221,54.62498647726539],[-0.4304849918542,54.46437612570216],[0.184981316742039,53.32501414653103],[0.469976840831777,52.92999949809197],[1.681530795914739,52.739520168664],[1.559987827164377,52.09999848083601],[1.050561557630914,51.806760565795685],[1.449865349950301,51.28942780212196],[0.550333693045502,50.765738837275876],[-0.78751746255864,50.77498891865622],[-2.489997524414377,50.50001862243124],[-2.956273972984036,50.696879991247016],[-3.617448085942328,50.22835561787272],[-4.542507900399244,50.34183706318566],[-5.245023159191135,49.95999990498108],[-5.776566941745301,50.15967763935682],[-4.309989793301838,51.21000112568916],[-3.414850633142123,51.42600861266925],[-3.422719467108323,51.42684816740609],[-4.984367234710874,51.593466091510976],[-5.267295701508885,51.99140045837458],[-4.222346564134853,52.301355699261364],[-4.770013393564113,52.840004991255626],[-4.579999152026915,53.49500377055517],[-3.093830673788659,53.404547400669685],[-3.092079637047106,53.404440822963544],[-2.945008510744344,53.984999701546684],[-3.614700825433034,54.600936773292574],[-3.63000545898933,54.615012925833014],[-4.844169073903004,54.790971177786844],[-5.082526617849226,55.06160065369937],[-4.719112107756644,55.50847260194348],[-5.047980922862109,55.78398550070752],[-5.586397670911139,55.31114614523682],[-5.644998745130181,56.275014960344805],[-6.149980841486354,56.78500967063354],[-5.786824713555291,57.81884837506465],[-5.009998745127575,58.63001333275005],[-4.211494513353557,58.55084503847917],[-3.005004848635281,58.63500010846633]
        ]]]
    },
}];

L.geoJSON(currentGeoCountry, {
    style: function(feature) {
        switch (feature.properties.name) {
            case 'United Kingdom': return {color: "dogerblue"};
        }
    currentGeoCountry.bindPopup("This is Uk border polygon ").addTo(myMap);
    }
}).addTo(myMap);




//DOM Element
const weatherDisplay = document.querySelector('.weather');
const countryInfoDisplay = document.querySelector('.country_Info');
const currencyDisplay = document.querySelector('.currency');
const wikipediaLink = document.querySelector('.wikipedia');



//Render GeoData for weather
$.ajax({url: 'libs/php/countryBorder.php',
    type: 'GET',
    dataType: 'JSON',
    success:function(result){
        console.log(result);
        for (const feature of result.data) {
            $('#countryList').append(`<option value='${feature.iso_a2}'>${feature.name}</option>`);
        }
    },
    error:function(err){
        console.log(err);
    }
});



//Forword_Geo_Coding and Weather 
$('#countryList').change(function(){
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
                            console.log(JSON.stringify(result1));
                         if (result1.status.name == "ok") {
                            weatherDisplay.innerHTML += 
                            `<img src = https://openweathermap.org/img/wn/${result1.data.weather[0].icon}@2x.png><br>
                            <strong>Country: </strong> ${result1.data.sys.country}, ${result1.data.name}<br>
                            <strong>Temperature: </strong>${result1.data.main.temp}&deg;C <br>
                            <strong>Max_temp: </strong>${result1.data.main.temp_max}&deg;C <br>
                            <strong>Min_temp: </strong>${result1.data.main.temp_min}&deg;C <br>
                            <strong>Feels-Like: </strong>${result1.data.main.feels_like}&deg;C<br>
                            <strong>Humidity: </strong>${result1.data.main.humidity}%<br>
                            <strong>Cloud: </strong>${result1.data.weather[0].description}<br>`
                            console.log('It\'s working!!!');
                            console.log(result1);
                            $('#weatherUpdate').modal();
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
                console.log(JSON.stringify(result2));
             if (result2.status.code == "200") {
                console.log(result2.status.code, typeof result2.status.code);
                console.log(result2.data[0].capital);

                countryInfoDisplay.innerHTML +=
                `<strong>Country Name: </strong> ${result2.data[0].countryName}, ${result2.data[0].isoAlpha3}<br>
                <strong>Capital: </strong> ${result2.data[0].capital}<br>
                <strong>Continent: </strong> ${result2.data[0].continentName}<br>
                <strong>Area-In-SqKm: </strong> ${result2.data[0].areaInSqKm}<br>
                <strong>Population: </strong> ${result2.data[0].population}<br>
                <strong>Languages: </strong> ${result2.data[0].languages}<br>`
                console.log(result2);
                $('#country_information').modal();
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
                console.log(JSON.stringify(result3));
                if (result3.status.code == "200") {
                    console.log();
                    console.log(result3.status.code, typeof result3.status.code);
                    console.log(result3);
                    currencyDisplay.innerHTML +=`
                    <strong> Base: </strong> ${result3.data.base}<br>
                    <strong> England: </strong>${result3.data.rates.GBP}<br>
                    <strong> Saudi: </strong>${result3.data.rates.SAR}<br>
                    <strong> Bangladesh: </strong>${result3.data.rates.BDT}<br>
                    <strong> Europe: </strong>${result3.data.rates.EUR}<br>
                    <strong> America: </strong>${result3.data.rates.USD}<br>
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
                q:$('#countryList').val()
        },
            success: function(result4) {
                console.log(JSON.stringify(result4));
                if (result4.status.code == "200") {
                    console.log(result4.status.code, typeof result4.status.code);
                    console.log(result4);
                    wikipediaLink.innerHTML +=`
                    <strong> Country title: </strong>${result4.data.geonames[0].title}<br>
                    <strong> Rank: </strong>${result4.data.geonames[0].rank}<br>
                    <strong> Wikipedua URL: </strong>${result4.data.geonames[0].wikipediaUrl
                    }<br>
                    <strong> Summary: </strong> ${result4.data.geonames[0].summary}<br>
                    `
                    $('#wikipedia_Info').modal();
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
        title: 'Show Weather Information',
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
        title: 'Show Country Information',
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

L.easyButton({
    position: 'topleft',
    id: 'currency_info',
    states: [{
        icon: "fa-solid fa-flag-checkered",
        stateName: 'unloaded',
        title: 'Currency Compare',
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