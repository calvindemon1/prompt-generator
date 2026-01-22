import {
  createContext,
  useContext,
  createSignal,
  createEffect,
} from "solid-js";

const SettingsContext = createContext();

export function SettingsProvider(props) {
  const [darkMode, setDarkMode] = createSignal(
    localStorage.getItem("darkMode") === "true",
  );
  const [language, setLanguage] = createSignal(
    localStorage.getItem("language") || "id",
  );

  // persist
  createEffect(() => {
    localStorage.setItem("darkMode", darkMode());
    document.documentElement.classList.toggle("dark", darkMode());
  });

  createEffect(() => {
    localStorage.setItem("language", language());
  });

  return (
    <SettingsContext.Provider
      value={{ darkMode, setDarkMode, language, setLanguage }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
