import axios from "axios";
import {
  getMockUserInfoById,
  getMockUserActivityById,
  getMockUserAverageSessionsById,
  getMockUserPerformanceById,
} from "../mocks/mockData";

const BASE_URL = "http://localhost:3000/user";

async function fetchResource(source, apiPath, getMock) {
  if (source === "mock") {
    return { data: getMock().data, source: "mock" };
  }

  try {
    const response = await axios.get(`${BASE_URL}${apiPath}`);
    return { data: response.data.data, source: "api" };
  } catch (error) {
    console.warn(
      `Appel API échoué (${apiPath}), utilisation des données mockées.`,
      error,
    );
    return { data: getMock().data, source: "mock", error };
  }
}

export function getUserInfoById(id, source = "api") {
  return fetchResource(source, `/${id}`, () => getMockUserInfoById(id));
}

export function getUserActivityById(id, source = "api") {
  return fetchResource(source, `/${id}/activity`, () =>
    getMockUserActivityById(id),
  );
}

export function getUserAverageSessionsById(id, source = "api") {
  return fetchResource(source, `/${id}/average-sessions`, () =>
    getMockUserAverageSessionsById(id),
  );
}

export function getUserPerformanceById(id, source = "api") {
  return fetchResource(source, `/${id}/performance`, () =>
    getMockUserPerformanceById(id),
  );
}
