import { useEffect, useState } from "react";
import {
  getUserInfoById,
  getUserActivityById,
  getUserAverageSessionsById,
  getUserPerformanceById,
} from "../services/userService";
import KeyDataCard from "../components/KeyDataCard";

function Home() {
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [averageSessions, setAverageSessions] = useState(null);
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserInfoById(12);
      setUser(res.data);
    };
    const fetchActivity = async () => {
      const res = await getUserActivityById(12);
      setActivity(res.data);
    };
    const fetchAverageSessions = async () => {
      const res = await getUserAverageSessionsById(12);
      setAverageSessions(res.data);
    };
    const fetchPerformance = async () => {
      const res = await getUserPerformanceById(12);
      setPerformance(res.data);
    };
    fetchUser();
    fetchActivity();
    fetchAverageSessions();
    fetchPerformance();
  }, []);

  if (!user) {
    return <p className="loading">Chargement...</p>;
  }

  const { firstName } = user.userInfos;
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
    user.keyData;

  return (
    <main className="content">
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
