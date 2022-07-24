import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Theme } from "../theme/theme";

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (typeof context === "undefined")
    throw new Error("Call useTheme inside a ThemeProvider.");

  return context;
}

type Props = { theme: Theme };



