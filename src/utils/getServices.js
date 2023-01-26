import fetchServices from "./fetchServices";

const getServices = async (lat, lon, radius) => {
    // Fetching risks data
    const service = await fetchServices(lat, lon, radius);
    // Return the risks
    return service;
};



export default getServices;