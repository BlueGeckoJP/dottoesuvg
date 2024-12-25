import styles from "./ColorPicker.module.css";

import type { RGBA } from "../types";

import { Accessor, Component, Setter } from "solid-js";

const ColorPicker: Component<{
  penColor: Accessor<RGBA>;
  setPenColor: Setter<RGBA>;
}> = (props) => {
  function rgbToHex(): string {
    const { r, g, b } = props.penColor();
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function setPenColorFromHex(hex: string) {
    const hexColor = hex.replace("#", "");
    props.setPenColor({
      r: parseInt(hexColor.substring(0, 2), 16),
      g: parseInt(hexColor.substring(2, 4), 16),
      b: parseInt(hexColor.substring(4, 6), 16),
      a: props.penColor().a,
    });
  }

  return (
    <div>
      <div class={styles["color-container"]}>
        <input
          type="range"
          min="0"
          max="255"
          value={props.penColor().r}
          onInput={(e) =>
            props.setPenColor({
              ...props.penColor(),
              r: parseInt(e.currentTarget.value),
            })
          }
        />
        <input
          type="number"
          min="0"
          max="255"
          value={props.penColor().r}
          onInput={(e) =>
            props.setPenColor({
              ...props.penColor(),
              r: parseInt(e.currentTarget.value),
            })
          }
          class={styles["color-input-number"]}
          style={{
            "background-color": `rgba(255, ${255 - props.penColor().r}, ${
              255 - props.penColor().r
            }, 1)`,
          }}
        />
      </div>
      <div class={styles["color-container"]}>
        <input
          type="range"
          min="0"
          max="255"
          value={props.penColor().g}
          onInput={(e) =>
            props.setPenColor({
              ...props.penColor(),
              g: parseInt(e.currentTarget.value),
            })
          }
        />
        <input
          type="number"
          min="0"
          max="255"
          value={props.penColor().g}
          onInput={(e) =>
            props.setPenColor({
              ...props.penColor(),
              g: parseInt(e.currentTarget.value),
            })
          }
          class={styles["color-input-number"]}
          style={{
            "background-color": `rgba(${255 - props.penColor().g}, 255, ${
              255 - props.penColor().g
            }, 1)`,
          }}
        />
      </div>
      <div class={styles["color-container"]}>
        <input
          type="range"
          min="0"
          max="255"
          value={props.penColor().b}
          onInput={(e) =>
            props.setPenColor({
              ...props.penColor(),
              b: parseInt(e.currentTarget.value),
            })
          }
        />
        <input
          type="number"
          min="0"
          max="255"
          value={props.penColor().b}
          onInput={(e) =>
            props.setPenColor({
              ...props.penColor(),
              b: parseInt(e.currentTarget.value),
            })
          }
          class={styles["color-input-number"]}
          style={{
            "background-color": `rgba(${255 - props.penColor().b}, ${
              255 - props.penColor().b
            }, 255, 1)`,
          }}
        />
      </div>
      <div class={styles["color-container"]}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={props.penColor().a}
          onInput={(e) =>
            props.setPenColor({
              ...props.penColor(),
              a: parseFloat(e.currentTarget.value),
            })
          }
        />
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={props.penColor().a}
          onInput={(e) =>
            props.setPenColor({
              ...props.penColor(),
              a: parseFloat(e.currentTarget.value),
            })
          }
          class={styles["color-input-number"]}
        />
      </div>
      <div
        class={styles["hex-code-container"]}
        style={{ "background-color": rgbToHex() }}
      >
        <input
          type="text"
          value={rgbToHex()}
          onChange={(e) => setPenColorFromHex(e.currentTarget.value)}
          class={styles["hex-code"]}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
