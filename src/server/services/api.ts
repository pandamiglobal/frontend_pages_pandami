import axios from "axios";

const API_URL = process.env.NEXT_SAAS_API_URL;

if (!API_URL) {
	throw new Error(
		"CONFIGURATION_ERROR: NEXT_SAAS_API_URL environment variable is not set"
	);
}

const api = axios.create({
  baseURL: API_URL,
});


export default api;
