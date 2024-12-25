import styles from "./App.module.css";

import type { RGBA, RGBAString } from "./types";

import { createSignal, type Component } from "solid-js";

import ColorPicker from "./components/ColorPicker";

const App: Component = () => {
  const [colors, setColors] = createSignal<RGBAString[][]>(
    Array.from({ length: 8 }, () => Array(8).fill("rgba(0, 0, 0, 0)"))
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
  const [penMode, setPenMode] = createSignal<string>("Pen");

  function convertToRGBAString(rgba: RGBA): RGBAString {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  }

  function onClickCell(me: MouseEvent) {
    const cell = me.target as HTMLElement;

    if (penMode() === "Pen") {
      cell.style.backgroundColor = convertToRGBAString(penColor());
    } else if (penMode() === "Erase") {
      cell.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }

    if (penColor() !== recentColors()[0]) {
      setRecentColors([penColor(), recentColors()[0], recentColors()[1]]);
    }

    setColors((c) => {
      const [row, col] = cell.id.split("-").slice(1).map(Number);
      const newColors = c.map((row) => row.slice());
      newColors[row][col] = cell.style.backgroundColor as RGBAString;
      return newColors;
    });
  }

  function onClickSaveToSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("width", "8");
    svg.setAttribute("height", "8");

    colors().forEach((row, ri) => {
      row.forEach((color, ci) => {
        if (color !== "rgba(0, 0, 0, 0)") {
          const rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );

          rect.setAttribute("x", String(ci));
          rect.setAttribute("y", String(ri));
          rect.setAttribute("width", "1");
          rect.setAttribute("height", "1");
          rect.setAttribute("fill", color);

          svg.appendChild(rect);
        }
      });
    });

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "pixel-art.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div class={styles["top-container"]}>
      <div class={styles["dot-canvas-container"]}>
        <div
          class={`${styles["dot-canvas-grid"]} ${styles["checkered-background"]}`}
        >
          {colors().map((colorsRow, ri) => (
            <div class={styles.row}>
              {colorsRow.map((color, ci) => (
                <div
                  class={styles.cell}
                  style={{ "background-color": color }}
                  id={`cell-${ri}-${ci}`}
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
        <div>
          <input
            type="radio"
            name="pen-mode"
            value="Pen"
            id="pen-mode-pen"
            checked={penMode() === "Pen"}
            onchange={() => setPenMode("Pen")}
          />
          <label for="pen-mode-pen">Pen</label>
          <input
            type="radio"
            name="pen-mode"
            value="Erase"
            id="pen-mode-erase"
            checked={penMode() === "Erase"}
            onchange={() => setPenMode("Erase")}
          />
          <label for="pen-mode-erase">Erase</label>
        </div>
        <button onclick={onClickSaveToSVG}>Save To SVG</button>
      </div>
    </div>
  );
};

export default App;
