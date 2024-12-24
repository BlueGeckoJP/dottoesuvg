import styles from "./ColorPicker.module.css";

import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Setter,
} from "solid-js";

type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

function isRGBA(rgba: string): rgba is RGBA {
  return /^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, \d(\.\d)?\)$/.test(rgba);
}

const ColorPicker: Component<{
  penColor: Accessor<RGBA>;
  setPenColor: Setter<RGBA>;
}> = (props) => {
  const [red, setRed] = createSignal<number>(0);
  const [green, setGreen] = createSignal<number>(0);
  const [blue, setBlue] = createSignal<number>(0);
  const [alpha, setAlpha] = createSignal<number>(1);

  createEffect(() => {
    setRGBA(rgbToHex(red(), green(), blue()), alpha());
  });

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

  function setRGBA(hex: string, alpha: number) {
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgba = rgb
      ? `rgba(${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)}, ${parseInt(
          rgb[3],
          16
        )}, ${alpha})`
      : "rgba(0, 0, 0, 1)";

    if (isRGBA(rgba)) {
      props.setPenColor(rgba);

      console.log("rgbaColor: ", props.penColor());
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
