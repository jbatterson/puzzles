/**
 * Small script to help generate the hover variants of colors seen in
 * stitches.config.ts.
 */

import Color from "color";

const colors = {
  main: "#1a3d5b",
  mainLight: "#289ECC",
  white: "#FFF",
  bg: "$white",
  start: "#D6002C",
  impossible: "$start",
  op: "$main",
  disabled: "#E0E3E4",
  empty: "$disabled",
  interm1: "#FF00FF",
  interm2: "#0000FF",
  done: "#6b9b3b",
};

function transform(c) {
  if (c[0] === "$") {
    return c + "Hover";
  } else if (c[0] === "#") {
    const cObj = Color(c);
    return cObj.mix(Color("white"), 0.2).hex();
  }
}

Object.keys(colors).forEach(k => {
  const c = colors[k];
  const newC = transform(c);
  console.log(`\t${k}Hover: "${newC}",`);
});
