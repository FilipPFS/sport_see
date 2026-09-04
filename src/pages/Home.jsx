import { useEffect, useState } from "react";
import {
  getUserInfoById,
  getUserActivityById,
  getUserAverageSessionsById,
  getUserPerformanceById,
} from "../services/userService";
import { useDataSource } from "../context/DataSourceContext";
import KeyDataCard from "../components/KeyDataCard";

const USER_ID = 12;

function Home() {
  const { source } = useDataSource();

  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [averageSessions, setAverageSessions] = useState(null);
  const [performance, setPerformance] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Vraie source utilisée après coup (peut différer de `source` si l'API a échoué).
  const [effectiveSource, setEffectiveSource] = useState(source);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [userRes, activityRes, sessionsRes, perfRes] = await Promise.all([
          getUserInfoById(USER_ID, source),
          getUserActivityById(USER_ID, source),
          getUserAverageSessionsById(USER_ID, source),
          getUserPerformanceById(USER_ID, source),
        ]);

        if (cancelled) return;

        setUser(userRes.data);
        setActivity(activityRes.data);
        setAverageSessions(sessionsRes.data);
        setPerformance(perfRes.data);

        // Si au moins un appel a basculé sur les mocks, on le signale.
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
          <div className="placeholder daily-activity">Activité quotidienne</div>
          <div className="charts-row">
            <div className="placeholder session-duration">
              Durée moyenne des sessions
            </div>
            <div className="placeholder intensity">Intensité</div>
            <div className="placeholder score">Score</div>
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

      {user && (
        <div className="activity-debug">
          <h2>Informations utilisateur (debug)</h2>
          <pre>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        </div>
      )}

      {activity && (
        <div className="activity-debug">
          <h2>Données d'activité (debug)</h2>
          <pre>
            <code>{JSON.stringify(activity, null, 2)}</code>
          </pre>
        </div>
      )}

      {averageSessions && (
        <div className="activity-debug">
          <h2>Durée moyenne des sessions (debug)</h2>
          <pre>
            <code>{JSON.stringify(averageSessions, null, 2)}</code>
          </pre>
        </div>
      )}

      {performance && (
        <div className="activity-debug">
          <h2>Performance (debug)</h2>
          <pre>
            <code>{JSON.stringify(performance, null, 2)}</code>
          </pre>
        </div>
      )}
    </main>
  );
}

export default Home;
