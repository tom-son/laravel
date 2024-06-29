import axios from "axios";

const requestHandler = axios.create({
  timeout: 30000,
  headers: {},
});

export default requestHandler;
