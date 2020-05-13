import { Theme } from "theme-ui";

export const theme: Theme = {
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "#333333",
    background: "white",
    primary: "white",
  },
  sizes: {
    full: "1024px",
  },
  radii: {
    hard: 2,
    medium: 4,
    soft: 8,
  },
  shadows: {
    card: "2px 9px 13px -2px rgba(51,51,51,0.20)",
  },
};

type GlobalTheme = {
  "*": {
    boxSizing: "border-box";
  };
  body: {
    background: string;
  };
};

export const globalStyles = (globalTheme: Theme): GlobalTheme => ({
  "*": {
    boxSizing: "border-box",
  },
  body: {
    background: globalTheme.colors.text,
  },
});
