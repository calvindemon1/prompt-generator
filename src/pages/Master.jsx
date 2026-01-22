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

      {/* CATEGORY */}
      <div class="flex gap-4 mb-6 border-b">
        {Object.entries(masterConfig).map(([key, val]) => (
          <button
            onClick={() => {
              setActiveCategory(key);
              setActiveTabIndex(0);
            }}
            class={`pb-2 ${
              activeCategory() === key
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500"
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* SUB TABS */}
      <div class="flex gap-4 mb-6">
        {tabs().map((tab, i) => (
          <button
            onClick={() => setActiveTabIndex(i)}
            class={`px-3 py-1 rounded ${
              activeTabIndex() === i ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🔥 KEYED RENDER */}
      <Show when={activeTab()} keyed>
        {(tab) => <MasterForm config={tab} />}
      </Show>
    </div>
  );
}
