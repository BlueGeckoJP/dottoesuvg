import styles from "./App.module.css";

import { createSignal, type Component } from "solid-js";

const App: Component = () => {
  const [colors, setColors] = createSignal<string[][]>(
    Array.from({ length: 8 }, () => Array(8).fill("blue"))
  );
  const [alpha, setAlpha] = createSignal<number>(255);
  const [penColor, setPenColor] = createSignal("#000000");
  const [recentColors, setRecentColors] = createSignal<string[]>(Array(3));

  function onClickCell(me: MouseEvent) {
    const cell = me.target as HTMLElement;
    cell.style.backgroundColor = penColor();
  }

  return (
    <div class={styles["top-container"]}>
      <div class={styles["dot-canvas-grid"]}>
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
      <div class={styles["color-picker-container"]}>
        <input
          type="color"
          value={penColor()}
          onchange={(e) => {
            const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
              e.currentTarget.value
            );
            const rgba = rgb
              ? `rgba(${parseInt(rgb[1], 16)}, ${parseInt(
                  rgb[2],
                  16
                )}, ${parseInt(rgb[3], 16)}, ${
                  Math.floor((alpha() / 255) * 10) / 10
                })`
              : "rgba(0, 0, 0, 1)";

            setPenColor(rgba);
            setRecentColors([rgba].concat(recentColors().slice(0, 2)));
            console.log(rgba);
          }}
        />
        <input
          class={styles["alpha-slider"]}
          type="range"
          min="0"
          max="255"
          value={alpha()}
          onchange={(e) => {
            setAlpha(e.currentTarget.valueAsNumber);
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
