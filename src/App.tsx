import styles from "./App.module.css";

import type { RGBA, RGBAString } from "./types";

import { createSignal, type Component } from "solid-js";

import ColorPicker from "./components/ColorPicker";

const App: Component = () => {
  const [colors, setColors] = createSignal<RGBAString[][]>(
    Array.from({ length: 8 }, () => Array(8).fill("rgba(0, 0, 0, 0"))
  );
  const [penColor, setPenColor] = createSignal<RGBA>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [recentColors, setRecentColors] = createSignal<RGBA[]>(
    Array(3).fill({ r: 0, g: 0, b: 0, a: 0 })
  );

  function convertToRGBAString(rgba: RGBA): RGBAString {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  }

  function onClickCell(me: MouseEvent) {
    const cell = me.target as HTMLElement;
    cell.style.backgroundColor = convertToRGBAString(penColor());

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
        <div class={styles["recent-colors-container"]}>
          <div
            class={styles["recent-colors"]}
            style={{
              "background-color": convertToRGBAString(recentColors()[0]),
            }}
            onclick={() => setPenColor(recentColors()[0])}
          ></div>
          <div
            class={styles["recent-colors"]}
            style={{
              "background-color": convertToRGBAString(recentColors()[1]),
            }}
            onclick={() => setPenColor(recentColors()[1])}
          ></div>
          <div
            class={styles["recent-colors"]}
            style={{
              "background-color": convertToRGBAString(recentColors()[2]),
            }}
            onclick={() => setPenColor(recentColors()[2])}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
