import { createSignal, createMemo, createEffect, on } from "solid-js";
import axios from "axios";
import OptionGroup from "../components/OptionGroup";
import ResultBox from "../components/ResultBox";
import { masterConfig } from "../config/masterConfig";

const BASE_URL = "https://14grftw2-30001.asse.devtunnels.ms/api";

export default function Dashboard() {
  const [activeMainTab, setActiveMainTab] = createSignal("camera");
  const [activeSubTabIndex, setActiveSubTabIndex] = createSignal(0);
  const [generatorData, setGeneratorData] = createSignal([]);
  const [selected, setSelected] = createSignal({});
  const [loading, setLoading] = createSignal(false);

  // ---------------------------
  // FETCH DATA SESUAI MAIN + SUB TAB
  // ---------------------------
  const fetchData = async () => {
    setLoading(true);
    try {
      const main = masterConfig[activeMainTab()];
      const subTab = main.tabs[activeSubTabIndex()];
      const res = await axios.get(`${BASE_URL}${subTab.endpoints.list}`);
      const data = res?.data?.data || [];

      // ambil field sesuai config
      const options = data.map((item) => item[subTab.field]).filter(Boolean);
      setGeneratorData(options);
    } catch (err) {
      console.error("Failed fetch", err);
      setGeneratorData([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // REFRESH DATA KETIKA TAB BERUBAH
  // ---------------------------
  createEffect(on([activeMainTab, activeSubTabIndex], fetchData));

  // ---------------------------
  // HANDLER SELECTED
  // ---------------------------
  const updateCategory = (value) => {
    setSelected((prev) => {
      const next = { ...prev };
      const key = activeMainTab();
      const subTab = masterConfig[key].tabs[activeSubTabIndex()].label;

      next[key] = next[key] || {};
      const arr = next[key][subTab] || [];

      next[key][subTab] = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];

      // cleanup
      if (next[key][subTab].length === 0) delete next[key][subTab];
      if (Object.keys(next[key]).length === 0) delete next[key];

      return next;
    });
  };

  const removeSelection = (mainKey, subLabel, option) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (!next[mainKey]?.[subLabel]) return next;

      const filtered = next[mainKey][subLabel].filter((v) => v !== option);
      if (filtered.length > 0) next[mainKey][subLabel] = filtered;
      else delete next[mainKey][subLabel];

      if (Object.keys(next[mainKey] || {}).length === 0) delete next[mainKey];

      return next;
    });
  };

  // ---------------------------
  // GENERATED TEXT
  // ---------------------------
  const stringifySelection = (value) => {
    if (!value) return "";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") {
      return Object.entries(value)
        .map(([sub, opts]) => `${sub}: ${opts.join(", ")}`)
        .join("; ");
    }
    return "";
  };

  const generatedText = createMemo(() => {
    const s = selected();
    return `Saya ingin membuat sebuah video ${stringifySelection(
      s.camera,
    )} dengan lighting ${stringifySelection(s.lighting)}, warna ${stringifySelection(
      s.color,
    )}, style ${stringifySelection(s.style)}, berlatar ${stringifySelection(
      s.environment,
    )}.`;
  });

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6">Prompt Generator</h2>

      {/* MAIN TABS */}
      <div class="flex gap-6 mb-4 border-b">
        {Object.entries(masterConfig).map(([key, val]) => (
          <button
            onClick={() => {
              setActiveMainTab(key);
              setActiveSubTabIndex(0);
            }}
            class={`pb-2 ${
              activeMainTab() === key
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
        {masterConfig[activeMainTab()].tabs.map((tab, i) => (
          <button
            onClick={() => setActiveSubTabIndex(i)}
            class={`px-3 py-1 rounded ${
              activeSubTabIndex() === i ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OPTION GROUP */}
      {loading() ? (
        <div class="p-4 text-gray-500">Loading...</div>
      ) : (
        <OptionGroup
          label={masterConfig[activeMainTab()].tabs[activeSubTabIndex()].label}
          options={generatorData()}
          value={
            selected()[activeMainTab()]?.[
              masterConfig[activeMainTab()].tabs[activeSubTabIndex()].label
            ] || []
          }
          onChange={updateCategory}
        />
      )}

      {/* SELECTED SUMMARY */}
      <div class="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 class="font-semibold mb-3">Selected Options</h3>

        {Object.entries(selected()).map(([mainKey, subObj]) =>
          Object.entries(subObj).map(([subLabel, opts]) => (
            <div class="mb-2">
              <div class="font-medium text-gray-700">
                {mainKey} / {subLabel}
              </div>
              <div class="flex flex-wrap gap-2 mt-1">
                {opts.map((opt) => (
                  <span class="px-3 py-1 text-xs rounded-full border bg-white flex items-center gap-1">
                    {opt}
                    <button
                      onClick={() => removeSelection(mainKey, subLabel, opt)}
                      class="w-5 h-5 rounded-full flex items-center justify-center bg-red-400 text-white hover:bg-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )),
        )}
      </div>

      {/* GENERATED TEXT */}
      <ResultBox
        text={generatedText()}
        onClearAll={() => setSelected({})}
        onGenerate={() => console.log("Generate clicked")}
      />
    </div>
  );
}
