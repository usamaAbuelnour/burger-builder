import axios from "axios";

export default axios.create({
    baseURL: 'https://my-app-c4c17-default-rtdb.firebaseio.com/'
});