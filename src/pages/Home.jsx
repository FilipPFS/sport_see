import { useEffect, useState } from "react";
import {
  getUserInfoById,
  getUserActivityById,
  getUserAverageSessionsById,
  getUserPerformanceById,
} from "../services/userService";
import { useDataSource } from "../context/DataSourceContext";
import KeyDataCard from "../components/KeyDataCard";
import DailyActivityChart from "../components/charts/DailyActivityChart";
import AverageSessionsChart from "../components/charts/AverageSessionsChart";
import PerformanceChart from "../components/charts/PerformanceChart";
import ScoreChart from "../components/charts/ScoreChart";

const USER_ID = 12;

function Home() {
  const { source } = useDataSource();

  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [averageSessions, setAverageSessions] = useState(null);
  const [performance, setPerformance] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [effectiveSource, setEffectiveSource] = useState(source);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        // on lance les 4 appels en parallèle pour ne pas attendre chaque requête l'une après l'autre
        const [userRes, activityRes, sessionsRes, perfRes] = await Promise.all([
          getUserInfoById(USER_ID, source),
          getUserActivityById(USER_ID, source),
          getUserAverageSessionsById(USER_ID, source),
          getUserPerformanceById(USER_ID, source),
        ]);

        // évite de mettre à jour le state si le composant a été démonté entre temps
        if (cancelled) return;

        setUser(userRes.data);
        setActivity(activityRes.data);
        setAverageSessions(sessionsRes.data);
        setPerformance(perfRes.data);

        // si l'API a échoué sur au moins une requête, le service a basculé sur le mock
        const usedMock = [userRes, activityRes, sessionsRes, perfRes].some(
          (r) => r.source === "mock",
        );
        setEffectiveSource(usedMock ? "mock" : "api");
      } catch (err) {
        if (cancelled) return;
        setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [source]);

  if (loading && !user) {
    return <p className="loading">Chargement...</p>;
  }

  if (error || !user) {
    return (
      <p className="loading">
        Impossible de charger les données{" "}
        {error?.message ? `(${error.message})` : ""}
      </p>
    );
  }

  const { firstName } = user.userInfos;
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
    user.keyData;
  // le champ n'a pas le même nom selon les endpoints, donc on prend celui qui existe
  const score = user.todayScore ?? user.score ?? 0;

  // on affiche le bandeau seulement si l'utilisateur voulait l'API mais qu'on a dû basculer sur le mock
  const fellBackToMock = source === "api" && effectiveSource === "mock";

  return (
    <main className="content">
      {fellBackToMock && (
        <p className="data-source-banner">
          ⚠️ L'API est injoignable : affichage des données mockées.
        </p>
      )}

      <h1>
        Bonjour <span className="accent">{firstName}</span>
      </h1>
      <p className="congrats">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>

      <div className="dashboard-grid">
        <div className="charts">
          {/* optional chaining car les données peuvent arriver après le premier rendu */}
          <DailyActivityChart sessions={activity?.sessions} />
          <div className="charts-row">
            <AverageSessionsChart sessions={averageSessions?.sessions} />
            <PerformanceChart
              kind={performance?.kind}
              data={performance?.data}
            />
            <ScoreChart score={score} />
          </div>
        </div>

        <div className="key-data">
          <KeyDataCard
            icon="🔥"
            iconBg="#FDEBEC"
            value={`${calorieCount}kCal`}
            label="Calories"
          />
          <KeyDataCard
            icon="💧"
            iconBg="#E7F2FA"
            value={`${proteinCount}g`}
            label="Protéines"
          />
          <KeyDataCard
            icon="🍎"
            iconBg="#FDF3E9"
            value={`${carbohydrateCount}g`}
            label="Glucides"
          />
          <KeyDataCard
            icon="🍔"
            iconBg="#FCEEF3"
            value={`${lipidCount}g`}
            label="Lipides"
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
