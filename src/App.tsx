import styles from "./App.module.css";

import { createSignal, type Component } from "solid-js";

const App: Component = () => {
  const [colors, setColors] = createSignal<string[][]>(
    Array.from({ length: 8 }, () => Array(8).fill("blue"))
  );

  return (
    <div>
      <div class={styles["dot-canvas-grid"]}>
        {colors().map((colorsRow) => (
          <div class={styles.row}>
            {colorsRow.map((color) => (
              <div
                class={styles.cell}
                style={{ "background-color": color }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
