import styles from "./App.module.css";

import type { RGBA, RGBAString } from "./types";

import { createEffect, createSignal, type Component } from "solid-js";
import { Fa } from "solid-fa";
import {
  faPen,
  faEraser,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

import ColorPicker from "./components/ColorPicker";

const App: Component = () => {
  const [size, setSize] = createSignal<number>(8);
  const [colors, setColors] = createSignal<RGBAString[][]>(
    Array.from({ length: size() }, () => Array(size()).fill("rgba(0, 0, 0, 0)"))
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

    svg.setAttribute("width", size().toString());
    svg.setAttribute("height", size().toString());

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

  createEffect(() => {
    setColors(
      Array.from({ length: size() }, () =>
        Array(size()).fill("rgba(0, 0, 0, 0)")
      )
    );
  });

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
        <div
          class={`${styles["recent-colors-container"]} ${styles["checkered-background"]}`}
        >
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
        <div class={styles["pen-mode-container"]}>
          <div
            class={styles["pen-mode"]}
            onclick={() => setPenMode("Pen")}
            style={{
              "background-color": `${
                penMode() === "Pen" ? "white" : "transparent"
              }`,
            }}
          >
            <span
              style={{
                "font-size": "30px",
                color: `${penMode() === "Pen" ? "#3080DE" : "white"}`,
              }}
            >
              <Fa icon={faPen} />
            </span>
          </div>
          <div
            class={styles["pen-mode"]}
            onclick={() => setPenMode("Erase")}
            style={{
              "background-color": `${
                penMode() === "Erase" ? "white" : "transparent"
              }`,
            }}
          >
            <span
              style={{
                "font-size": "30px",
                color: `${penMode() === "Erase" ? "#3080DE" : "white"}`,
              }}
            >
              <Fa icon={faEraser} />
            </span>
          </div>
        </div>
        <div class={styles["bottom-container"]}>
          <div class={styles["save-to-svg"]} onclick={onClickSaveToSVG}>
            <span
              class={styles["stg-floppy"]}
              style={{ "font-size": "24px", color: "white" }}
            >
              <Fa icon={faFloppyDisk} />
            </span>
            <span class={styles["stg-string"]}>Save To SVG</span>
          </div>
          <input
            type="number"
            min="1"
            max="32"
            value={size()}
            onInput={(e) => setSize(parseInt(e.currentTarget.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
