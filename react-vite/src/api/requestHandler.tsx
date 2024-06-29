import axios from "axios";

const requestHandler = axios.create({
  baseURL: "https://9k1hg47b1e.execute-api.ap-southeast-2.amazonaws.com/prd",
  timeout: 30000,
  headers: {},
});

export default requestHandler;
