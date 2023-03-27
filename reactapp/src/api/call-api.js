import { API_BASE } from "../helpers/constants";

export const getData = async (endpoint) => {
  return await callApi(endpoint, null, null);
}

export const postData = async (endpoint, payload) => {
  return await callApi(endpoint, payload, 'POST');
}

export const callApi = async (endpoint, payload, method) => {
  const config = {
    method: method ?? 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  }
  if (payload != null) config.body = JSON.stringify(payload);
  
  const response = await fetch(`${API_BASE}/${endpoint}`, config);
  return response.json();
}