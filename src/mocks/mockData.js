export const MOCK_USER_MAIN_DATA = {
  12: {
    data: {
      id: 12,
      // Valeurs volontairement différentes de l'API pour distinguer la source.
      userInfos: { firstName: "Karl", lastName: "Dovineau", age: 29 },
      todayScore: 0.24,
      keyData: {
        calorieCount: 2450,
        proteinCount: 128,
        carbohydrateCount: 220,
        lipidCount: 72,
      },
    },
  },
  18: {
    data: {
      id: 18,
      userInfos: { firstName: "Cecilia", lastName: "Ratorez", age: 34 },
      score: 0.3,
      keyData: {
        calorieCount: 2500,
        proteinCount: 90,
        carbohydrateCount: 150,
        lipidCount: 120,
      },
    },
  },
};

export const MOCK_USER_ACTIVITY = {
  12: {
    data: {
      userId: 12,
      sessions: [
        { day: "2020-07-01", kilogram: 74, calories: 310 },
        { day: "2020-07-02", kilogram: 74, calories: 185 },
        { day: "2020-07-03", kilogram: 75, calories: 260 },
        { day: "2020-07-04", kilogram: 74, calories: 340 },
        { day: "2020-07-05", kilogram: 73, calories: 205 },
        { day: "2020-07-06", kilogram: 73, calories: 290 },
        { day: "2020-07-07", kilogram: 72, calories: 420 },
      ],
    },
  },
  18: {
    data: {
      userId: 18,
      sessions: [
        { day: "2020-07-01", kilogram: 70, calories: 240 },
        { day: "2020-07-02", kilogram: 69, calories: 220 },
        { day: "2020-07-03", kilogram: 70, calories: 280 },
        { day: "2020-07-04", kilogram: 70, calories: 500 },
        { day: "2020-07-05", kilogram: 69, calories: 160 },
        { day: "2020-07-06", kilogram: 69, calories: 162 },
        { day: "2020-07-07", kilogram: 69, calories: 390 },
      ],
    },
  },
};

export const MOCK_USER_AVERAGE_SESSIONS = {
  12: {
    data: {
      userId: 12,
      sessions: [
        { day: 1, sessionLength: 45 },
        { day: 2, sessionLength: 25 },
        { day: 3, sessionLength: 35 },
        { day: 4, sessionLength: 60 },
        { day: 5, sessionLength: 20 },
        { day: 6, sessionLength: 40 },
        { day: 7, sessionLength: 55 },
      ],
    },
  },
  18: {
    data: {
      userId: 18,
      sessions: [
        { day: 1, sessionLength: 30 },
        { day: 2, sessionLength: 23 },
        { day: 3, sessionLength: 45 },
        { day: 4, sessionLength: 50 },
        { day: 5, sessionLength: 0 },
        { day: 6, sessionLength: 0 },
        { day: 7, sessionLength: 60 },
      ],
    },
  },
};

export const MOCK_USER_PERFORMANCE = {
  12: {
    data: {
      userId: 12,
      kind: {
        1: "cardio",
        2: "energy",
        3: "endurance",
        4: "strength",
        5: "speed",
        6: "intensity",
      },
      data: [
        { value: 110, kind: 1 },
        { value: 90, kind: 2 },
        { value: 160, kind: 3 },
        { value: 80, kind: 4 },
        { value: 150, kind: 5 },
        { value: 120, kind: 6 },
      ],
    },
  },
  18: {
    data: {
      userId: 18,
      kind: {
        1: "cardio",
        2: "energy",
        3: "endurance",
        4: "strength",
        5: "speed",
        6: "intensity",
      },
      data: [
        { value: 200, kind: 1 },
        { value: 240, kind: 2 },
        { value: 80, kind: 3 },
        { value: 80, kind: 4 },
        { value: 220, kind: 5 },
        { value: 110, kind: 6 },
      ],
    },
  },
};

const NOT_FOUND = (id) =>
  new Error(`Aucune donnée mockée pour l'utilisateur ${id}`);

export function getMockUserInfoById(id) {
  const entry = MOCK_USER_MAIN_DATA[id];
  if (!entry) throw NOT_FOUND(id);
  return entry;
}

export function getMockUserActivityById(id) {
  const entry = MOCK_USER_ACTIVITY[id];
  if (!entry) throw NOT_FOUND(id);
  return entry;
}

export function getMockUserAverageSessionsById(id) {
  const entry = MOCK_USER_AVERAGE_SESSIONS[id];
  if (!entry) throw NOT_FOUND(id);
  return entry;
}

export function getMockUserPerformanceById(id) {
  const entry = MOCK_USER_PERFORMANCE[id];
  if (!entry) throw NOT_FOUND(id);
  return entry;
}
