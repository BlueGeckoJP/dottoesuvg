import styles from "./App.module.css";

import { createSignal, type Component } from "solid-js";

const App: Component = () => {
  const [colors, setColors] = createSignal<string[][]>(
    Array.from({ length: 8 }, () => Array(8).fill("blue"))
  );
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
            setPenColor(e.currentTarget.value);
            setRecentColors(
              [e.currentTarget.value].concat(recentColors().slice(0, 2))
            );
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
