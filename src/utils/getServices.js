import fetchServices from "./fetchServices";

const getServices = async (lat, lon, radius) => {
    const service = await fetchServices(lat, lon, radius);
    console.log("service", service);
    return service;
};


export default getServices;