import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";
import { useContext } from "react";
import { InsightsContext } from "../../routes/app.tsx";


type InsightsProps = {
  insights: Insight[];
  className?: string;
};

export const Insights = ({ insights, className }: InsightsProps) => {
  const context = useContext(InsightsContext);

  const deleteInsight = async (id: number) => {
    console.log("Deleting insight with ID:", id);
    try {
      const response = await fetch(`/api/insights/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      console.log("Insight deleted successfully");
      await context?.getInsights();
      
    } catch (error) {
      console.error("Error deleting insight:", error);
    }
  };

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length
          ? (
            insights.map(({ id, text, createdAt, brand }) => (
              <div className={styles.insight} key={id}>
                <div className={styles["insight-meta"]}>
                  <span>Brand {brand}</span>
                  <div className={styles["insight-meta-details"]}>
                    <span>{createdAt.toString()}</span>
                    <Trash2Icon
                      className={styles["insight-delete"]}
                      onClick={async () => await deleteInsight(id)}
                    />
                  </div>
                </div>
                <p className={styles["insight-content"]}>{text}</p>
              </div>
            ))
          )
          : <p>We have no insight!</p>}
      </div>
    </div>
  );
};
