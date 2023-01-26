async function getIndexFromLocation() {
    let response = await fetch("https://raw.githubusercontent.com/leogenot/havenAPI/main/havenAPI.json");
    let data = await response.json();
    return data;
}


export default getIndexFromLocation;