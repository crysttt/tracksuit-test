import { createContext, useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

type InsightsContextType = {
  getInsights: () => Promise<void>;
};

export const InsightsContext = createContext<InsightsContextType | undefined>(
  undefined,
);

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  const getInsights = async () => {
    try {
      const response = await fetch(`/api/insights`);
      if (!response.ok) {
        throw new Error(`Error fetching insights: ${response.status}`);
      }
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <InsightsContext.Provider value={{ getInsights }}>
      <main className={styles.main}>
        <Header />
        <Insights className={styles.insights} insights={insights} />
      </main>
    </InsightsContext.Provider>
  );
};
