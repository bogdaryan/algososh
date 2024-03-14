import React from "react";
import { Input } from "../input/input";
import { Button } from "../button/button";

import styles from "./form.module.css";

type Props = {
  textButton: string;
  isLimitText: boolean;
  max: number;
  maxLength: number;
};

export const Form: React.FC<Props> = ({
  textButton,
  isLimitText,
  maxLength,
  max,
}) => (
  <form className={styles.form}>
    <Input
      isLimitText={isLimitText}
      max={max}
      maxLength={maxLength}
      extraClass="mr-12"
    />
    <Button text={textButton} />
  </form>
);
