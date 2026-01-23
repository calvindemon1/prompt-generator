import { createSignal, createMemo, createEffect, on } from "solid-js";
import axios from "axios";
import OptionGroup from "../components/OptionGroup";
import ResultBox from "../components/ResultBox";
import { masterConfig } from "../config/masterConfig";
import { promptConfig } from "../config/promptConfig";
import { History } from "lucide-solid";

const BASE_URL = "https://14grftw2-30001.asse.devtunnels.ms/api";

export default function Dashboard() {
  const [activeMainTab, setActiveMainTab] = createSignal("camera");
  const [activeSubTabIndex, setActiveSubTabIndex] = createSignal(0);

  const [generatorData, setGeneratorData] = createSignal([]);
  const [optionMap, setOptionMap] = createSignal({});
  const [selected, setSelected] = createSignal({});
  const [loading, setLoading] = createSignal(false);

  // 🔥 INPUT FIELD
  const [promptName, setPromptName] = createSignal("");
  const [promptNotes, setPromptNotes] = createSignal("");
  const [promptText, setPromptText] = createSignal("");
  const [toast, setToast] = createSignal(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ================= FETCH OPTIONS ================= */
  const fetchData = async () => {
    setLoading(true);
    try {
      const main = masterConfig[activeMainTab()];
      const subTab = main.tabs[activeSubTabIndex()];
      const res = await axios.get(`${BASE_URL}${subTab.endpoints.list}`);
      const data = res?.data?.data || [];

      const options = [];
      const map = {};

      data.forEach((item) => {
        const label = item[subTab.field];
        if (!label) return;
        options.push(label);
        map[label] = item.id;
      });

      setGeneratorData(options);

      setOptionMap((prev) => ({
        ...prev,
        [activeMainTab()]: {
          ...(prev[activeMainTab()] || {}),
          [subTab.label]: map,
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  createEffect(on([activeMainTab, activeSubTabIndex], fetchData));

  /* ================= SELECT ================= */
  const updateCategory = (value) => {
    setSelected((prev) => {
      const next = { ...prev };
      const key = activeMainTab();
      const sub = masterConfig[key].tabs[activeSubTabIndex()].label;

      next[key] = next[key] || {};
      const arr = next[key][sub] || [];

      next[key][sub] = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];

      if (next[key][sub].length === 0) delete next[key][sub];
      if (Object.keys(next[key]).length === 0) delete next[key];
      return next;
    });
  };

  /* ================= BUILD ID PAYLOAD ================= */
  const buildIdPayload = () => {
    const payload = {};
    const map = optionMap();
    const sel = selected();

    Object.entries(masterConfig).forEach(([mainKey, main]) => {
      main.tabs.forEach((tab) => {
        payload[tab.idKey] =
          sel?.[mainKey]?.[tab.label]
            ?.map((v) => map?.[mainKey]?.[tab.label]?.[v])
            .filter(Boolean) || [];
      });
    });

    return payload;
  };

  /* ================= GENERATED TEXT ================= */
  const generatedText = createMemo(() => {
    const stringify = (o) =>
      Object.entries(o || {})
        .map(([k, v]) => `${k}: ${v.join(", ")}`)
        .join("; ");

    return `Saya ingin membuat sebuah video ${stringify(
      selected().camera,
    )} dengan lighting ${stringify(selected().lighting)}, warna ${stringify(
      selected().color,
    )}, style ${stringify(
      selected().style,
    )}, berlatar ${stringify(selected().environment)}.`;
  });

  /* ================= POST ================= */
  const handleGenerate = async () => {
    const payload = {
      creative_prompt_name: promptName(),
      prompt_notes: promptNotes(),
      prompt: promptText() || generatedText(),
      ...buildIdPayload(),
    };

    try {
      await axios.post(`${BASE_URL}${promptConfig.endpoints.create}`, payload);
      showToast("Prompt berhasil disimpan 🎉");
      setSelected({});
      setPromptName("");
      setPromptNotes("");
      setPromptText("");
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan prompt ❌", "error");
    }
  };

  /* ================= UI ================= */
  return (
    <div class="p-6">
      {toast() && (
        <div
          class={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white z-50
        ${toast().type === "error" ? "bg-red-500" : "bg-green-600"}`}
        >
          {toast().message}
        </div>
      )}

      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Prompt Generator</h2>

        <a
          href="/history"
          class="flex items-center gap-1 px-4 py-2 rounded bg-gray-300 hover:bg-black hover:text-white transition text-sm"
        >
          <History size={20} /> View History
        </a>
      </div>

      {/* INPUT */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          class="border p-2 rounded"
          placeholder="Creative Prompt Name"
          value={promptName()}
          onInput={(e) => setPromptName(e.target.value)}
        />
        <input
          class="border p-2 rounded"
          placeholder="Prompt Notes"
          value={promptNotes()}
          onInput={(e) => setPromptNotes(e.target.value)}
        />
        {/* <textarea
          class="border p-2 rounded md:col-span-2"
          placeholder="Prompt (optional, auto-generated if empty)"
          rows={3}
          value={promptText()}
          onInput={(e) => setPromptText(e.target.value)}
        /> */}
      </div>

      {/* TABS */}
      <div class="relative -mx-6 mb-4 border-b">
        <div class="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap px-6 max-w-full">
          {Object.entries(masterConfig).map(([key, val]) => (
            <button
              onClick={() => {
                setActiveMainTab(key);
                setActiveSubTabIndex(0);
              }}
              class={`pb-2 shrink-0 ${
                activeMainTab() === key
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-400"
              }`}
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>

      <div class="relative -mx-6 mb-6">
        <div class="flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap px-6 max-w-full">
          {masterConfig[activeMainTab()].tabs.map((t, i) => (
            <button
              onClick={() => setActiveSubTabIndex(i)}
              class={`px-3 py-1 rounded shrink-0 text-sm ${
                activeSubTabIndex() === i
                  ? "bg-black text-white"
                  : "bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {loading() ? (
        <div>Loading...</div>
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

      <ResultBox
        text={promptText() || generatedText()}
        onClearAll={() => setSelected({})}
        onGenerate={handleGenerate}
        value={promptText()}
        onInput={(e) => setPromptText(e.target.value)}
      />
    </div>
  );
}
