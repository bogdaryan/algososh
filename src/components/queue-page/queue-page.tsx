import React, { ChangeEvent, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./Queue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {
  const queue = useRef(new Queue(7));
  const [queueItems, setQueueItems] = useState(queue.current.elements);
  const [inputValue, setInputValue] = useState("");
  const [loadingState, setLoadingState] = useState({
    enqueuing: false,
    dequeuing: false,
  });
  const [elementStates, setElementStates] = useState({
    head: ElementStates.Default,
    tail: ElementStates.Default,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const enqueueHandler = (item: string) => {
    setLoadingState((prev) => ({ ...prev, enqueuing: true }));
    setElementStates((prev) => ({ ...prev, tail: ElementStates.Changing }));

    queue.current.enqueue(item);
    setQueueItems(queue.current.elements);
    setInputValue("");

    setTimeout(() => {
      setLoadingState((prev) => ({ ...prev, enqueuing: false }));
      setElementStates((prev) => ({ ...prev, tail: ElementStates.Default }));
    }, SHORT_DELAY_IN_MS);
  };

  const dequeueHandler = () => {
    setLoadingState((prev) => ({ ...prev, dequeuing: true }));
    if (queue.current.len === 1) {
      setElementStates((prev) => ({ ...prev, tail: ElementStates.Changing }));
    } else {
      setElementStates((prev) => ({ ...prev, head: ElementStates.Changing }));
    }

    setTimeout(() => {
      queue.current.dequeue();
      setQueueItems(queue.current.elements);
      if (queue.current.len === 0) {
        setElementStates((prev) => ({ ...prev, tail: ElementStates.Default }));
      } else {
        setElementStates((prev) => ({ ...prev, head: ElementStates.Default }));
      }
      setLoadingState((prev) => ({ ...prev, dequeuing: false }));
    }, SHORT_DELAY_IN_MS);
  };

  const clearQueue = () => {
    queue.current.clear();
    setQueueItems(queue.current.elements);
  };

  const getCircleState = (queue: Queue, index: number) => {
    if (index === queue.tailIdx) {
      return elementStates.tail;
    } else if (index === queue.headIdx) {
      return elementStates.head;
    } else {
      return ElementStates.Default;
    }
  };

  return (
    <SolutionLayout title="Очередь">
      <section className="container">
        <form className="form">
          <div className="wrapper">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              isLimitText={true}
              maxLength={4}
              extraClass="mr-12"
            />
            <Button
              text="Добавить"
              onClick={() => enqueueHandler(inputValue)}
              disabled={
                !inputValue || queue.current.isFull || loadingState.dequeuing
              }
              isLoader={loadingState.enqueuing}
            />
            <Button
              text="Удалить"
              onClick={dequeueHandler}
              disabled={queue.current.isEmpty || loadingState.enqueuing}
              isLoader={loadingState.dequeuing}
            />
          </div>
          <Button
            text="Очистить"
            onClick={clearQueue}
            disabled={
              queue.current.isEmpty ||
              loadingState.enqueuing ||
              loadingState.dequeuing
            }
          />
        </form>
        <div className="field">
          {queueItems &&
            queueItems.map((i, index) => (
              <Circle
                letter={i}
                index={index}
                head={
                  !queue.current.isEmpty && index === queue.current.headIdx
                    ? HEAD
                    : null
                }
                tail={
                  !queue.current.isEmpty && index === queue.current.tailIdx
                    ? TAIL
                    : null
                }
                state={getCircleState(queue.current, index)}
                key={index}
              />
            ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
