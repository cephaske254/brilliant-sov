import colorAlpha from "color-alpha";
import { createContext, ReactNode } from "react";
import theme from "../theme/theme";

const initialValues = {
  ...theme,
  alpha: colorAlpha,
};
const ThemeContext = createContext(initialValues);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={initialValues}>
      {children}
    </ThemeContext.Provider>
  );
};


export { ThemeContext, ThemeProvider };

