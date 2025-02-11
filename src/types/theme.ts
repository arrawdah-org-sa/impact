export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  accent: {
    primary: string;
    secondary: string;
    hover: string;
  };
  border: string;
  shadow: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
}

export type ThemeName = 'light' | 'dark' | 'nature' | 'desert';