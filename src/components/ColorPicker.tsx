import styles from "./ColorPicker.module.css";

import { Component, createSignal } from "solid-js";

const ColorPicker: Component = () => {
  const [red, setRed] = createSignal<number>(0);
  const [green, setGreen] = createSignal<number>(0);
  const [blue, setBlue] = createSignal<number>(0);
  const [alpha, setAlpha] = createSignal<number>(1);

  return (
    <div>
      <div class={styles["red-container"]}>
        <input
          type="range"
          min="0"
          max="255"
          value={red()}
          onInput={(e) => setRed(parseInt(e.currentTarget.value))}
        />
        <input
          type="number"
          min="0"
          max="255"
          value={red()}
          onInput={(e) => setRed(parseInt(e.currentTarget.value))}
        />
      </div>
      <div class={styles["green-container"]}>
        <input
          type="range"
          min="0"
          max="255"
          value={green()}
          onInput={(e) => setGreen(parseInt(e.currentTarget.value))}
        />
        <input
          type="number"
          min="0"
          max="255"
          value={green()}
          onInput={(e) => setGreen(parseInt(e.currentTarget.value))}
        />
      </div>
      <div class={styles["blue-container"]}>
        <input
          type="range"
          min="0"
          max="255"
          value={blue()}
          onInput={(e) => setBlue(parseInt(e.currentTarget.value))}
        />
        <input
          type="number"
          min="0"
          max="255"
          value={blue()}
          onInput={(e) => setBlue(parseInt(e.currentTarget.value))}
        />
      </div>
      <div class={styles["alpha-container"]}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={alpha()}
          onInput={(e) => setAlpha(parseFloat(e.currentTarget.value))}
        />
        <input
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={alpha()}
          onInput={(e) => setAlpha(parseFloat(e.currentTarget.value))}
        />
      </div>
      <div class={styles["hex-code-container"]}></div>
    </div>
  );
};

export default ColorPicker;
