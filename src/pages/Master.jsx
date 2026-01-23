import { createSignal, Show } from "solid-js";
import MasterForm from "../components/MasterForm";
import { masterConfig } from "../config/masterConfig";

export default function Master() {
  const [activeCategory, setActiveCategory] = createSignal("camera");
  const [activeTabIndex, setActiveTabIndex] = createSignal(0);

  const category = () => masterConfig[activeCategory()];
  const tabs = () => category().tabs;
  const activeTab = () => tabs()[activeTabIndex()];

  return (
    <div>
      <h2 class="text-2xl font-bold mb-6">Master Data</h2>

      {/* TABS */}
      <div class="relative -mx-6 mb-4 border-b">
        <div class="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap px-6 max-w-full">
          {Object.entries(masterConfig).map(([key, val]) => (
            <button
              onClick={() => {
                setActiveCategory(key);
                setActiveTabIndex(0);
              }}
              class={`pb-2 shrink-0 ${
                activeCategory() === key
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-400"
              }`}
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB TABS */}
      <div class="relative -mx-6 mb-6">
        <div class="flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap px-6 max-w-full">
          {masterConfig[activeCategory()].tabs.map((t, i) => (
            <button
              onClick={() => setActiveTabIndex(i)}
              class={`px-3 py-1 rounded shrink-0 text-sm ${
                activeTabIndex() === i ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 KEYED RENDER */}
      <Show when={activeTab()} keyed>
        {(tab) => <MasterForm config={tab} />}
      </Show>
    </div>
  );
}
