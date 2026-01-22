import { Router, Route, Navigate } from "@solidjs/router";
import { SettingsProvider } from "./context/SettingsContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Master from "./pages/Master";
import Settings from "./pages/Settings";

export default function App() {
  return (
    // <SettingsProvider>
    <Router>
      <Route component={Layout}>
        <Route path="/" element={<Navigate href="/dashboard" />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/master" component={Master} />
        <Route path="/settings" component={Settings} />
      </Route>
    </Router>
    // </SettingsProvider>
  );
}
