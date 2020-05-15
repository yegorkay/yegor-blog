import { Theme } from "theme-ui";

export const theme: Theme = {
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "hsl(0, 0%, 20%)",
    background: "	hsl(0, 0%, 100%)",
    primary: "hsl(0, 0%, 100%)",
  },
  space: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  fontSizes: {
    sm: {
      base: 12,
      tall: 14,
    },
    md: {
      base: 16,
      tall: 18,
    },
    lg: {
      base: 20,
      tall: 24,
    },
    xl: {
      base: 30,
      tall: 36,
    },
    xxl: {
      base: 48,
      tall: 60,
    },
  },
};

type GlobalTheme = {
  "*": {
    boxSizing: "border-box";
  };
  body: {
    background: string;
    fontFamily: string;
    color: string;
  };
};

export const globalStyles = (theme: Theme): GlobalTheme => ({
  "*": {
    boxSizing: "border-box",
  },
  body: {
    fontFamily: theme.fonts["body"],
    background: theme.colors.background,
    color: theme.colors.text,
  },
});
