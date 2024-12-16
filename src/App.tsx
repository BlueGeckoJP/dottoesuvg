import { createSignal, type Component } from "solid-js";

const App: Component = () => {
  const [colors, setColors] = createSignal<string[][]>(
    Array.from({ length: 8 }, () => Array(8).fill("blue"))
  );

  return (
    <div>
      <div id="dot-canvas-grid">
        {colors().map((colorsRow) => (
          <div
            style={{
              border: "1px solid #000000",
              display: "flex",
              padding: "4px",
            }}
          >
            {colorsRow.map((color) => (
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  "background-color": color,
                  border: "1px solid #000000",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
