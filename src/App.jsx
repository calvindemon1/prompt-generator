import { Router, Route, Navigate } from "@solidjs/router";
import { SettingsProvider } from "./context/SettingsContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Master from "./pages/Master";
import Settings from "./pages/Settings";
import History from "./pages/History";

export default function App() {
  return (
    <Router>
      <Route component={Layout}>
        <Route path="/" component={() => <Navigate href="/dashboard" />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/history" component={History} />
        <Route path="/master" component={Master} />
        <Route path="/settings" component={Settings} />
      </Route>
    </Router>
  );
}
