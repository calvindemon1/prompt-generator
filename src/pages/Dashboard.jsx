import { createSignal, createMemo } from "solid-js";
import Layout from "../components/Layout";
import OptionGroup from "../components/OptionGroup";
import ResultBox from "../components/ResultBox";
import { generatorData } from "../data/generatorData";

export default function Dashboard() {
  const [activeMainTab, setActiveMainTab] = createSignal(0);
  const [selected, setSelected] = createSignal({});

  const updateCategory = (key, payload) => {
    setSelected((prev) => {
      const next = { ...prev };

      // 🔹 NO SUB TAB
      if (typeof payload === "string") {
        const arr = next[key] || [];
        next[key] = arr.includes(payload)
          ? arr.filter((v) => v !== payload)
          : [...arr, payload];
        return next;
      }

      // 🔹 WITH SUB TAB
      const { subLabel, option } = payload;

      next[key] = next[key] || {};
      const subArr = next[key][subLabel] || [];

      next[key][subLabel] = subArr.includes(option)
        ? subArr.filter((v) => v !== option)
        : [...subArr, option];

      // cleanup empty
      if (next[key][subLabel].length === 0) {
        delete next[key][subLabel];
      }

      return next;
    });
  };

  const activeGroup = createMemo(() => generatorData[activeMainTab()]);

  const stringifySelection = (value) => {
    if (!value) return "";

    // NO SUB TAB
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    // WITH SUB TAB
    if (typeof value === "object") {
      return Object.entries(value)
        .map(([sub, opts]) => `${sub}: ${opts.join(", ")}`)
        .join("; ");
    }

    return "";
  };

  const removeSelection = (key, payload) => {
    setSelected((prev) => {
      const next = { ...prev };

      // 🔹 NO SUB TAB
      if (typeof payload === "string") {
        const arr = next[key] || [];
        const filtered = arr.filter((v) => v !== payload);

        if (filtered.length > 0) {
          next[key] = filtered;
        } else {
          delete next[key];
        }

        return next;
      }

      // 🔹 WITH SUB TAB
      const { subLabel, option } = payload;

      if (!next[key]?.[subLabel]) return next;

      const filtered = next[key][subLabel].filter((v) => v !== option);

      if (filtered.length > 0) {
        next[key][subLabel] = filtered;
      } else {
        delete next[key][subLabel];
      }

      // cleanup empty category
      if (Object.keys(next[key]).length === 0) {
        delete next[key];
      }

      return next;
    });
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

  return (
    <>
      <h2 class="text-2xl font-bold mb-6">Prompt Generator</h2>

      {/* MAIN TABS */}
      <div class="flex gap-6 overflow-x-auto mb-6 border-b">
        {generatorData.map((group, i) => (
          <button
            onClick={() => setActiveMainTab(i)}
            class={`pb-3 text-sm font-medium whitespace-nowrap transition
        ${
          activeMainTab() === i
            ? "border-b-2 border-black text-black"
            : "border-b-2 border-transparent text-gray-500 hover:text-black"
        }
      `}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* ACTIVE OPTION GROUP ONLY */}
      <OptionGroup
        label={activeGroup().label}
        options={activeGroup().options}
        value={selected()[activeGroup().key] || []}
        onChange={(val) => updateCategory(activeGroup().key, val)}
      />

      {/* SELECTED SUMMARY */}
      <div class="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 class="font-semibold mb-3">Selected Options</h3>

        {generatorData.map((group) => {
          const value = selected()[group.key];
          if (!value) return null;

          return (
            <div class="mb-4">
              <div class="font-medium mb-1">{group.label}</div>

              {/* NO SUB TAB */}
              {Array.isArray(value) && (
                <div class="flex flex-wrap gap-2">
                  {value.map((v) => (
                    <span class="px-3 py-1 text-xs rounded-full border bg-white flex items-center gap-1">
                      {v}
                      <button
                        onClick={() => removeSelection(group.key, v)}
                        class="w-5 h-5 rounded-full flex items-center justify-center bg-red-400 text-white hover:bg-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* WITH SUB TAB */}
              {value && !Array.isArray(value) && typeof value === "object" && (
                <div class="ml-3 space-y-2">
                  {Object.entries(value).map(([sub, opts]) => (
                    <div>
                      <div class="text-xs font-medium text-gray-600">{sub}</div>

                      <div class="flex flex-wrap gap-2 mt-1">
                        {Array.isArray(opts) &&
                          opts.map((v) => (
                            <span class="px-3 py-1 text-xs rounded-full border bg-white flex items-center gap-1">
                              {v}
                              <button
                                onClick={() =>
                                  removeSelection(group.key, {
                                    subLabel: sub,
                                    option: v,
                                  })
                                }
                                class="w-5 h-5 rounded-full flex items-center justify-center bg-red-400 text-white hover:bg-red-600"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ResultBox
        text={generatedText()}
        onClearAll={() => setSelected({})} // kirim fungsi clear all
        onGenerate={() => {
          console.log("Generate clicked");
          // nanti bisa isi logika generate
        }}
      />
    </>
  );
}
