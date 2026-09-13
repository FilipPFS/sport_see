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
    // on ne garde la valeur stockée que si elle est encore valide
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "api" || stored === "mock") return stored;
  } catch {}
  // localStorage peut être indisponible (navigation privée) ou vide au premier lancement
  return "api";
}

export function DataSourceProvider({ children }) {
  // readInitialSource passée en référence pour ne lire le storage qu'au premier rendu
  const [source, setSource] = useState(readInitialSource);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, source);
    } catch {}
  }, [source]);

  // permet de basculer manuellement entre l'API et les données mockées depuis l'UI
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
