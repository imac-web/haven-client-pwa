async function invertGeocoding(lat, long) {
    let url = "https://api-adresse.data.gouv.fr/reverse/?lon=" + long + "&lat=" + lat;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}


export default invertGeocoding;