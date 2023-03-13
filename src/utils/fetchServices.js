import async from 'async';

const fetchService = async (lat, lon, radius, citycode, url, callback) => {
    // Make an HTTP GET request to the Georisques API with the provided latitude, longitude, and radius as query parameters
    let response = undefined
    if (citycode) {
        response = await fetch(
            url +
            "insee=" +
            citycode +
            ""
        );
    }
    else {
        response = await fetch(
            url +
            "lat=" +
            lat +
            "&lng=" +
            lon +
            "&radius=" +
            radius +
            ""
        );
    }
    // Parse the JSON respons
    const services = await response.json();
    // Return the risks data
    return callback(null, services);
};

const fetchInsee = async (lat, lon) => {
    const url = "https://api-adresse.data.gouv.fr/reverse/?"
    const response = await fetch(
        url +
        "lon=" +
        lon +
        "&lat=" +
        lat
    );
    // Parse the JSON respons
    const request = await response.json();

    return request.features[0]?.properties?.citycode
}

const fetchServices = async (lat, lon, radius, citycode) => {

    citycode ? citycode = citycode : citycode = await fetchInsee(lat, lon)


    try {
        const services = await async.parallel({
            publicServices: function (callback) {
                fetchService(lat, lon, radius, null, "https://europe-west3-haven-5f945.cloudfunctions.net/getPublicServices?", callback)
            },
            naturalHazards: function (callback) {
                fetchService(lat, lon, radius, null, "https://europe-west3-haven-5f945.cloudfunctions.net/getNaturalHazards?", callback)
            },
            wellBeing: function (callback) {
                fetchService(lat, lon, radius, citycode, "https://europe-west3-haven-5f945.cloudfunctions.net/getWellBeing?", callback)
            },
        });
        return services;
    }
    catch (err) {
        console.log(err);
    }
}



export default fetchServices;