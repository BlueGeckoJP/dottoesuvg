import styles from "./App.module.css";

import { createSignal, type Component } from "solid-js";

import ColorPicker from "./components/ColorPicker";

type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

const App: Component = () => {
  const [colors, setColors] = createSignal<RGBA[][]>(
    Array.from({ length: 8 }, () => Array(8).fill("rgba(0, 0, 0, 0"))
  );
  const [penColor, setPenColor] = createSignal<RGBA>("rgba(0, 0, 0, 1)");
  const [recentColors, setRecentColors] = createSignal<RGBA[]>(Array(3));

  function onClickCell(me: MouseEvent) {
    const cell = me.target as HTMLElement;
    cell.style.backgroundColor = penColor();

    if (penColor() !== recentColors()[0]) {
      setRecentColors([penColor(), recentColors()[0], recentColors()[1]]);
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
        <ColorPicker penColor={penColor} setPenColor={setPenColor} />
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
