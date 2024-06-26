import type { ChangeEvent } from "react";
import styles from "./styles.module.css";

type SwitchProps = {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkboxValue?: boolean;
  name: string;
  disabled?: boolean;
};

export const Switch = ({
  handleOnChange,
  checkboxValue,
  name,
  disabled = false,
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
          disabled={disabled}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};
