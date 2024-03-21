import axios from "axios";


const getData = (url) => {
    axios.get(url)
    .then((response) => {
        return response.data;
    })
    .catch((ex) => console.log("Error fetching data:", ex));
}

export default getData;
