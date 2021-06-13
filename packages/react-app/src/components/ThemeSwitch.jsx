import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Brightness3, Brightness5 } from "@material-ui/icons";

const marginBottom = -8;

export default function ThemeSwitcher() {
  const theme = window.localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(theme && theme !== "light");
  const { switcher, currentTheme, themes } = useThemeSwitcher();

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = isChecked => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  return (
    <div className="main fade-in" style={{ position: "fixed", right: 10, bottom: 10 }}>
      <span style={{ padding: 8 }}>
        {currentTheme === "light" ? <Brightness5 style={{ marginBottom }} /> : <Brightness3 style={{ marginBottom }} />}
      </span>
      <Switch checked={isDarkMode} onChange={toggleTheme} />
    </div>
  );
}
