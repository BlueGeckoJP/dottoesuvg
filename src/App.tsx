import styles from "./App.module.css";

import { createSignal, type Component } from "solid-js";

const App: Component = () => {
  const [colors, setColors] = createSignal<string[][]>(
    Array.from({ length: 8 }, () => Array(8).fill("blue"))
  );
  const [penColor, setPenColor] = createSignal("#000000");

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
      <div>
        <input
          type="color"
          value={penColor()}
          onchange={(e) => setPenColor(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default App;
