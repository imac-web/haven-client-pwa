import async from 'async';
import timeout from 'async';

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}

const fetchService = async (lat, lon, radius, citycode, url, callback) => {
    try {
        let response = undefined
        if (citycode) {
            response = await fetchWithTimeout(
                url +
                "insee=" +
                citycode +
                ""
                , {
                    timeout: 5000
                });
        }
        else {
            response = await fetchWithTimeout(
                url +
                "lat=" +
                lat +
                "&lng=" +
                lon +
                "&radius=" +
                radius +
                ""
                , {
                    timeout: 5000
                });
        }
        // Parse the JSON respons
        const services = await response.json();
        // Return the risks data
        return callback(null, services);
    } catch (error) {
        return callback(null, null);
    }

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
            }
        });
        let servicesFixed = Object.fromEntries(Object.entries(services).filter(([_, v]) => v != null));
        return servicesFixed;
    }
    catch (err) {
        console.log(err);
    }
}



export default fetchServices;