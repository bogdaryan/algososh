import React, { useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";

import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <SolutionLayout title="Связный список">
      <section className="container">
        <div className={styles.panel}>
          <div className={styles.header}>
            <Input isLimitText={true} max={4} maxLength={4} ref={inputRef} />
            <Button text="Добавить в head" />
            <Button text="Добавить в tail" />
            <Button text="Удалить из head" />
            <Button text="Удалить из tail" />
          </div>
          <div className={styles.footer}>
            <Input placeholder="Введите иднекс" max={1} ref={inputRef} />
            <Button text="Добавить по индексу" />
            <Button text="Удалить по индексу" />
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.circleBox}>
            <Circle
              letter="1"
              head={<Circle isSmall letter="10" />}
              index={0}
            />
            <ArrowIcon />
          </div>
          <div className={styles.circleBox}>
            <Circle letter="2" index={1} />
            <ArrowIcon />
          </div>

          <div className={styles.circleBox}>
            <Circle letter="3" index={2} />
          </div>
        </div>
      </section>
    </SolutionLayout>
  );
};
