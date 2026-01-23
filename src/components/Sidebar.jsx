import { A, useLocation } from "@solidjs/router";
import {
  LayoutDashboard,
  Database,
  Settings as SettingsIcon,
  History,
} from "lucide-solid";

export default function Sidebar(props) {
  const location = useLocation();

  const menu = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "History",
      path: "/history",
      icon: History,
    },
    {
      label: "Master Data",
      path: "/master",
      icon: Database,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: SettingsIcon,
    },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside
      class={`bg-white dark:bg-gray-900 border-r transition-all duration-200
        ${props.isOpen ? "w-64" : "w-16"}
      `}
    >
      <div class="p-3 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <A
              href={item.path}
              class={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                ${
                  isActive(item.path)
                    ? "bg-gray-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              {/* ICON */}
              <Icon size={20} class="shrink-0" />

              {/* LABEL (HIDE WHEN COLLAPSE) */}
              {props.isOpen && (
                <span class="whitespace-nowrap">{item.label}</span>
              )}
            </A>
          );
        })}
      </div>
    </aside>
  );
}
