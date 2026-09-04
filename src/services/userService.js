import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

export async function getUserInfoById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

export async function getUserActivityById(id) {
  const response = await axios.get(`${BASE_URL}/${id}/activity`);
  return response.data;
}

export async function getUserAverageSessionsById(id) {
  const response = await axios.get(`${BASE_URL}/${id}/average-sessions`);
  return response.data;
}

export async function getUserPerformanceById(id) {
  const response = await axios.get(`${BASE_URL}/${id}/performance`);
  return response.data;
}
