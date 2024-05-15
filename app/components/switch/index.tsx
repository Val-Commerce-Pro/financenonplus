import type { ChangeEvent } from "react";
import styles from "./styles.module.css";

type SwitchProps = {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkboxValue?: boolean;
  name: string;
};

export const Switch = ({
  handleOnChange,
  checkboxValue,
  name,
}: SwitchProps) => {
  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          name={name}
          id="toggleSwitch"
          className={styles.toggleCheckbox}
          onChange={(e) => handleOnChange(e)}
          checked={checkboxValue}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};
