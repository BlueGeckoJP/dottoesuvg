import styles from "./ColorPicker.module.css";

import { Component, createSignal } from "solid-js";

const ColorPicker: Component = () => {
  const [red, setRed] = createSignal<number>(0);
  const [green, setGreen] = createSignal<number>(0);
  const [blue, setBlue] = createSignal<number>(0);
  const [alpha, setAlpha] = createSignal<number>(1);

  function rgbToHex(r: number, g: number, b: number) {
    const toHex = (value: number) => {
      const hex = Math.round(value).toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function setRGBFromHex(hex: string) {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (match) {
      setRed(parseInt(match[1], 16));
      setGreen(parseInt(match[2], 16));
      setBlue(parseInt(match[3], 16));
    }
  }

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
          step="0.1"
          value={alpha()}
          onInput={(e) => setAlpha(parseFloat(e.currentTarget.value))}
        />
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={alpha()}
          onInput={(e) => setAlpha(parseFloat(e.currentTarget.value))}
        />
      </div>
      <div class={styles["hex-code-container"]}>
        <input
          type="text"
          value={rgbToHex(red(), green(), blue())}
          onInput={(e) => setRGBFromHex(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
