import { createSignal } from "solid-js";

export default function Settings() {
  const [darkMode, setDarkMode] = createSignal(false);
  const [language, setLanguage] = createSignal("id");

  return (
    <div class="max-w-3xl">
      <h1 class="text-2xl font-bold mb-6">Settings</h1>

      {/* GENERAL */}
      <section class="mb-6 p-4 bg-white rounded-lg border">
        <h2 class="font-semibold mb-4">General</h2>

        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-gray-700">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode())}
            class={`px-4 py-1 rounded-full text-sm transition
              ${
                darkMode() ? "bg-black text-white" : "bg-gray-200 text-gray-700"
              }
            `}
          >
            {darkMode() ? "On" : "Off"}
          </button>
        </div>

        <div>
          <label class="text-sm text-gray-700 block mb-1">Language</label>
          <select
            value={language()}
            onChange={(e) => setLanguage(e.target.value)}
            class="border rounded px-3 py-2 text-sm w-48"
          >
            <option value="id">Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
      </section>

      {/* ACCOUNT */}
      <section class="mb-6 p-4 bg-white rounded-lg border">
        <h2 class="font-semibold mb-4">Account</h2>

        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span>Email</span>
            <span class="text-gray-600">user@email.com</span>
          </div>

          <button class="text-red-600 hover:underline">Change Password</button>
        </div>
      </section>

      {/* DANGER */}
      <section class="p-4 bg-white rounded-lg border border-red-200">
        <h2 class="font-semibold mb-3 text-red-600">Danger Zone</h2>

        <button class="px-4 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600">
          Logout
        </button>
      </section>
    </div>
  );
}
