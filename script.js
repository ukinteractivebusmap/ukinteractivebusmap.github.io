// ============================================================
// UK Interactive Bus Map
// Static demo
// ============================================================


// ------------------------------------------------------------
// Create map
// ------------------------------------------------------------

const map = L.map("map").setView(
    [52.2405, -0.9027], // Northampton
    8
);


// ------------------------------------------------------------
// Basemap
// ------------------------------------------------------------

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// ------------------------------------------------------------
// GeoJSON datasets
// ------------------------------------------------------------

const datasets = [

    {
        file: "./data/stagecoach_midlands_routes.geojson",
        operator: "Stagecoach Midlands",
        color: "#f9ae00"
    },

    {
        file: "./data/stagecoach_oxford_routes.geojson",
        operator: "Stagecoach Oxfordshire",
        color: "#f9ae00"
    },

    {
        file: "./data/Arriva_Beds_and_Bucks_OP58.geojson",
        operator: "Arriva Beds and Bucks",
        color: "#004d73"
    },

    {
        file: "./data/Arriva_Herts_and_Essex_OP50.geojson",
        operator: "Arriva Herts and Essex",
        color: "#004d73"
    },

    {
        file: "./data/Redline_OP71.geojson",
        operator: "Redline",
        color: "red"
    },

    {
        file: "./data/Red_Rose_Travel_OP362.geojson",
        operator: "Red Rose Travel",
        color: "red"
    }

];


// ------------------------------------------------------------
// Work out a route number/name
// ------------------------------------------------------------

function getRouteName(properties) {

    if (properties.route) {
        return properties.route;
    }

    if (properties.route_name) {
        return properties.route_name;
    }

    return "Unknown route";
}


// ------------------------------------------------------------
// Work out route description
// ------------------------------------------------------------

function getRouteDescription(properties) {

    if (properties.description) {
        return properties.description;
    }

    if (properties.route_name) {
        return properties.route_name;
    }

    return "";
}


// ------------------------------------------------------------
// Create popup for each route
// ------------------------------------------------------------

function addRoutePopup(feature, layer, operatorName) {

    const properties = feature.properties || {};

    const routeName =
        getRouteName(properties);

    const description =
        getRouteDescription(properties);


    let popup = `
        <strong>${operatorName}</strong><br>
        Route: ${routeName}
    `;


    if (description) {

        popup += `
            <br>${description}
        `;

    }


    layer.bindPopup(popup);
}


// ------------------------------------------------------------
// Load one GeoJSON dataset
// ------------------------------------------------------------

async function loadDataset(dataset) {

    try {

        console.log(
            `Loading ${dataset.operator}...`
        );


        const response = await fetch(
            dataset.file
        );


        if (!response.ok) {

            throw new Error(
                `${response.status} ${response.statusText}`
            );

        }


        const geojson = await response.json();


        const layer = L.geoJSON(
            geojson,
            {

                // ------------------------------------------------
                // Route appearance
                // ------------------------------------------------

                style: {
                    color: dataset.color,
                    weight: 3,
                    opacity: 0.75
                },


                // ------------------------------------------------
                // Popup
                // ------------------------------------------------

                onEachFeature: function(feature, layer) {

                    addRoutePopup(
                        feature,
                        layer,
                        dataset.operator
                    );

                }

            }
        );


        layer.addTo(map);


        console.log(
            `${dataset.operator} loaded`
        );

    }


    catch (error) {

        console.error(
            `Failed to load ${dataset.operator}:`,
            error
        );

    }

}


// ------------------------------------------------------------
// Load every operator
// ------------------------------------------------------------

async function loadAllDatasets() {

    for (const dataset of datasets) {

        await loadDataset(dataset);

    }

}


// ------------------------------------------------------------
// Start
// ------------------------------------------------------------

loadAllDatasets();