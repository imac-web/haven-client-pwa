const fetchServices = async (lat, lon, radius) => {
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
};


export default fetchServices;