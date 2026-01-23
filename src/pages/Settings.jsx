import { createSignal } from "solid-js";

export default function Settings() {
  const [darkMode, setDarkMode] = createSignal(false);
  const [language, setLanguage] = createSignal("id");

  return (
    <div class="max-w-3xl relative">
      <h1 class="text-2xl font-bold mb-6">Settings</h1>

      {/* 🔥 BLURRED CONTENT */}
      <div class="space-y-6 blur-sm pointer-events-none select-none">
        {/* GENERAL */}
        <section class="p-4 bg-white rounded-lg border">
          <h2 class="font-semibold mb-4">General</h2>

          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-gray-700">Dark Mode</span>
            <button
              class={`px-4 py-1 rounded-full text-sm transition
                ${
                  darkMode()
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700"
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
              class="border rounded px-3 py-2 text-sm w-48"
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>
        </section>

        {/* ACCOUNT */}
        <section class="p-4 bg-white rounded-lg border">
          <h2 class="font-semibold mb-4">Account</h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span>Email</span>
              <span class="text-gray-600">user@email.com</span>
            </div>

            <button class="text-red-600 hover:underline">
              Change Password
            </button>
          </div>
        </section>

        {/* DANGER */}
        <section class="p-4 bg-white rounded-lg border border-red-200">
          <h2 class="font-semibold mb-3 text-red-600">Danger Zone</h2>

          <button class="px-4 py-2 text-sm rounded bg-red-500 text-white">
            Logout
          </button>
        </section>
      </div>

      {/* 🔥 OVERLAY MESSAGE */}
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="bg-white/80 backdrop-blur-sm border rounded-lg px-6 py-4 text-center max-w-md shadow">
          <p class="text-sm text-gray-700 leading-relaxed">
            <strong>This feature is not available yet.</strong>
            <br />
            Please contact developer for further development.
            <br />
            Thank you.
          </p>
        </div>
      </div>
    </div>
  );
}
