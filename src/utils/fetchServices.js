import async from 'async';

//https://europe-west3-haven-5f945.cloudfunctions.net/getServices?lat=48.856614&lon=2.3522219&radius=1000

/* const fetchServices = async (lat, lon, radius) => {
    // Make an HTTP GET request to the Georisques API with the provided latitude, longitude, and radius as query parameters
    const response = await fetch(
        "https://europe-west3-haven-5f945.cloudfunctions.net/getServices?lat=" +
        lat +
        "&lon=" +
        lon +
        "&radius=" +
        radius +
        ""
    );
    // Parse the JSON response
    // console.log("response", response);
    const services = await response.json();
    // Return the risks data
    return services;
}; */



const fetchService = async (lat, lon, radius, url) => {
    // Make an HTTP GET request to the Georisques API with the provided latitude, longitude, and radius as query parameters
    const response = await fetch(
        url +
        "lat=" +
        lat +
        "&lon=" +
        lon +
        "&radius=" +
        radius +
        ""
    );
    // Parse the JSON response
    //console.log("response", response);
    const services = await response.json();
    // Return the risks data
    return services;
};

/* function fetchService(url, lat, lon, radius) {
    return new Promise((resolve, reject) => {
        fetch(url +
            "lat=" +
            lat +
            "&lon=" +
            lon +
            "&radius=" +
            radius +
            "")
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            });
    });
} */


// an example using an object instead of an array
/* const fetchServices = async (lat, lon, radius) => {
    try {
        let results = await async.parallel({
            one: function (callback) {
                callback(null, fetchService(lat, lon, radius, "https://europe-west3-haven-5f945.cloudfunctions.net/getServices?"));
            },
            //Add as much parallel calls as services you want to fetch

        });
        console.log(results);

        return results;
    }
    catch (err) {
        console.log(err);
    }
} */

const fetchServices = async (lat, lon, radius) => {
    try {
        const services = await async.parallel({
            one: function (callback) {
                callback(null, fetchService(lat, lon, radius, "https://europe-west3-haven-5f945.cloudfunctions.net/getServices?"));
            },
            two: function (callback) {
                callback(null, fetchService(lat, lon, radius, "https://europe-west3-haven-5f945.cloudfunctions.net/getServices?"));
            },
        });
        return services;
    }
    catch (err) {
        console.log(err);
    }
}


/* Expected output before async paralel:

{
    "name": "Haven",
        "version": "0.1",
            "description": "Measure a place vivability and quality of life",
                "services": [
                    {
                        "label": "Risques naturels",
                        "score": 1,
                        "description": "",
                        "contains": [
                            {
                                "label": "Innondations",
                                "description": "",
                                "score": 3
                            },
                            {
                                "label": "Risque sismique",
                                "description": "",
                                "score": 1
                            },
                            {
                                "label": "Feux de forêts",
                                "description": "",
                                "score": 7
                            }
                        ]
                    },
                    {
                        "label": "Risques industriels",
                        "score": 1,
                        "description": "",
                        "contains": [
                            {
                                "label": "Sites SEVESO",
                                "description": "",
                                "score": 4
                            },
                            {
                                "label": "Centrales nucléaires",
                                "description": "",
                                "score": 1
                            },
                            {
                                "label": "Epandage d'engrais",
                                "description": "",
                                "score": 1
                            },
                            {
                                "label": "Pollution de l'air",
                                "description": "",
                                "score": 1
                            },
                            {
                                "label": "Pollution de l'eau",
                                "description": "",
                                "score": 5
                            }
                        ]
                    },
                    {
                        "label": "Services publics",
                        "score": 1,
                        "description": "",
                        "contains": [
                            {
                                "label": "Hopitaux/cliniques",
                                "description": "",
                                "score": 1
                            },
                            {
                                "label": "Ecoles",
                                "description": "",
                                "score": 1
                            },
                            {
                                "label": "Préfécture",
                                "description": "",
                                "score": 6
                            },
                            {
                                "label": "Gares",
                                "description": "",
                                "score": 1
                            }
                        ]
                    }
                ],
                    "global": {
        "label": "Indice de qualité de vie",
            "score": 8
    }
} */

export default fetchServices;