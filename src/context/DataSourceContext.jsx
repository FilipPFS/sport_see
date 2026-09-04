import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "sportsee.dataSource";
const DataSourceContext = createContext(null);

function readInitialSource() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "api" || stored === "mock") return stored;
  } catch {}
  return "api";
}

export function DataSourceProvider({ children }) {
  const [source, setSource] = useState(readInitialSource);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, source);
    } catch {}
  }, [source]);

  const toggleSource = useCallback(() => {
    setSource((prev) => (prev === "api" ? "mock" : "api"));
  }, []);

  return (
    <DataSourceContext.Provider value={{ source, setSource, toggleSource }}>
      {children}
    </DataSourceContext.Provider>
  );
}

export function useDataSource() {
  const ctx = useContext(DataSourceContext);
  if (!ctx) {
    throw new Error(
      "useDataSource doit être utilisé dans un <DataSourceProvider>",
    );
  }
  return ctx;
}
