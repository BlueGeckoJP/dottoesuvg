import styles from "./App.module.css";

import { createSignal, type Component } from "solid-js";

type HexCode = `#${string}`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

function isHexCode(hex: string): hex is HexCode {
  return /^#[0-9A-F]{6}$/i.test(hex);
}

function isRGBA(rgba: string): rgba is RGBA {
  return /^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, \d(\.\d)?\)$/.test(rgba);
}

const App: Component = () => {
  const [colors, setColors] = createSignal<RGBA[][]>(
    Array.from({ length: 8 }, () => Array(8).fill("rgba(0, 0, 0, 0"))
  );
  const [alpha, setAlpha] = createSignal<number>(255);
  const [penColor, setPenColor] = createSignal<HexCode>("#000000");
  const [actuallyRGBA, setActuallyRGBA] =
    createSignal<RGBA>("rgba(0, 0, 0, 1)");
  const [recentColors, setRecentColors] = createSignal<RGBA[]>(Array(3));

  function onClickCell(me: MouseEvent) {
    const cell = me.target as HTMLElement;
    cell.style.backgroundColor = actuallyRGBA();
  }

  function setRGBA(hex: string, alpha: number) {
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgba = rgb
      ? `rgba(${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)}, ${parseInt(
          rgb[3],
          16
        )}, ${Math.floor((alpha / 255) * 10) / 10})`
      : "rgba(0, 0, 0, 1)";

    if (isHexCode(hex) && isRGBA(rgba)) {
      setPenColor(hex);
      setActuallyRGBA(rgba);
      setAlpha(alpha);
      setRecentColors([rgba].concat(recentColors().slice(0, 2)));

      console.log("penColor: ", penColor());
      console.log("actuallyRGBA: ", actuallyRGBA());
    }
  }

  return (
    <div class={styles["top-container"]}>
      <div class={styles["dot-canvas-container"]}>
        <div
          class={`${styles["dot-canvas-grid"]} ${styles["checkered-background"]}`}
        >
          {colors().map((colorsRow) => (
            <div class={styles.row}>
              {colorsRow.map((color) => (
                <div
                  class={styles.cell}
                  style={{ "background-color": color }}
                  onclick={onClickCell}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div class={styles["color-picker-container"]}>
        <input
          type="color"
          value={penColor()}
          onchange={(e) => {
            setRGBA(e.currentTarget.value, alpha());
          }}
        />
        <input
          class={styles["alpha-slider"]}
          type="range"
          min="0"
          max="255"
          value={alpha()}
          onchange={(e) => {
            setRGBA(penColor(), e.currentTarget.valueAsNumber);
          }}
        />
        <div
          class={styles["recent-colors"]}
          style={{ "background-color": recentColors()[0] }}
        ></div>
        <div
          class={styles["recent-colors"]}
          style={{ "background-color": recentColors()[1] }}
        ></div>
        <div
          class={styles["recent-colors"]}
          style={{ "background-color": recentColors()[2] }}
        ></div>
      </div>
    </div>
  );
};

export default App;
