//make the functions to call an array from json file and export it to use in other files
/* const getIndexFromLocation = () => {
    return fetch("static/api/havenAPI.json")
        .then((response) => response.json())
        .then((data) => data);
} */



/* const api = fetch("static/api/havenAPI.json")
    .then((response) => response.json())
    .then((api) => {
        //console.log(api)
        return api;
    });

const getIndexFromLocation = async () => {
    const a = await api;
    //return a
    //console.log(a)
}; */

async function getIndexFromLocation() {
    let response = await fetch("static/api/havenAPI.json");
    let data = await response.json();
    return data;
}


export default getIndexFromLocation;