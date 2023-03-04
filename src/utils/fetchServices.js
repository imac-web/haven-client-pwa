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



const fetchService = async (lat, lon, radius, url, callback) => {
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
    return callback(null, services);
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
                fetchService(lat, lon, radius, "https://europe-west3-haven-5f945.cloudfunctions.net/getServices?", callback)
            },
            two: function (callback) {
                fetchService(lat, lon, radius, "https://europe-west3-haven-5f945.cloudfunctions.net/getServices?", callback)
            },
        });
        return services;
    }
    catch (err) {
        console.log(err);
    }
}

export default fetchServices;