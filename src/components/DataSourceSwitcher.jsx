import { useDataSource } from "../context/DataSourceContext";

function DataSourceSwitcher() {
  const { source, setSource } = useDataSource();

  return (
    <div
      className="data-source-switcher"
      role="group"
      aria-label="Source des données"
    >
      <span className="data-source-switcher__label">Données :</span>
      <button
        type="button"
        className={source === "api" ? "is-active" : ""}
        aria-pressed={source === "api"}
        onClick={() => setSource("api")}
      >
        API
      </button>
      <button
        type="button"
        className={source === "mock" ? "is-active" : ""}
        aria-pressed={source === "mock"}
        onClick={() => setSource("mock")}
      >
        Mock
      </button>
    </div>
  );
}

export default DataSourceSwitcher;
