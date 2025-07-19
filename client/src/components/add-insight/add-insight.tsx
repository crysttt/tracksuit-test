import type React from "react";
import { useContext } from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { InsightsContext } from "../../routes/app.tsx";

type AddInsightProps = ModalProps & {
  onClose: () => void;
};

export const AddInsight = (props: AddInsightProps) => {
  const context = useContext(InsightsContext);
  const addInsight = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const brandId = formData.get("brand") as string;
    const text = formData.get("text") as string;

    const body = JSON.stringify({ brand: brandId, text });

    try {
      const response = await fetch(`/api/insights/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        // TODO: update this to show on the form
        throw new Error(
          `Error adding insight: ${response.status} ${await response.text()}`,
        );
      }
      await context?.getInsights();
      props.onClose();
    } catch (error) {
      // TODO: update this to show on the form
      console.error("Error adding insight:", error);
    }
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label className={styles.field} htmlFor="brand">
          <select className={styles["field-input"]} name="brand">
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </label>
        <label className={styles.field} htmlFor="text">
          Insight
          <textarea
            className={styles["field-input"]}
            name="text"
            rows={5}
            placeholder="Something insightful..."
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
