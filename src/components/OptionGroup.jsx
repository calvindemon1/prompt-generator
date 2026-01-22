import { createSignal, createMemo, For, Show, createEffect } from "solid-js";

export default function OptionGroup(props) {
  const [activeSubTab, setActiveSubTab] = createSignal(0);
  const [search, setSearch] = createSignal("");
  const [showAll, setShowAll] = createSignal(false);

  const hasSubTabs = createMemo(() => {
    const opts = props.options;
    return (
      Array.isArray(opts) &&
      opts.length > 0 &&
      typeof opts[0] === "object" &&
      Array.isArray(opts[0].options)
    );
  });

  const currentOptions = createMemo(() => {
    const opts = props.options;

    if (!Array.isArray(opts)) return [];

    // 🟢 NO SUB TAB (array of string)
    if (!hasSubTabs()) {
      return opts.filter((opt) =>
        opt.toLowerCase().includes(search().toLowerCase()),
      );
    }

    // 🟢 WITH SUB TAB
    const sub = opts[activeSubTab()];
    if (!sub || !Array.isArray(sub.options)) return [];

    return sub.options.filter((opt) =>
      opt.toLowerCase().includes(search().toLowerCase()),
    );
  });

  const visibleOptions = createMemo(() =>
    showAll() ? currentOptions() : currentOptions().slice(0, 5),
  );

  const isSelected = (option) => {
    if (Array.isArray(props.value)) {
      return props.value.includes(option);
    }

    if (typeof props.value === "object") {
      const subLabel = props.options[activeSubTab()]?.label;
      return props.value[subLabel]?.includes(option);
    }

    return false;
  };

  const toggleOption = (option) => {
    // NO SUB TAB
    if (!hasSubTabs()) {
      props.onChange(option);
      return;
    }

    // WITH SUB TAB
    const subLabel = props.options[activeSubTab()].label;
    props.onChange({ subLabel, option });
  };

  createEffect(() => {
    setActiveSubTab(0);
    setSearch("");
    setShowAll(false);
  });

  return (
    <div class="mb-8">
      <h3 class="font-semibold mb-3">{props.label}</h3>

      {/* SUB TABS */}
      <Show when={hasSubTabs()}>
        <div class="flex gap-3 mb-3 border-b">
          <For each={props.options}>
            {(sub, i) => (
              <button
                onClick={() => {
                  setActiveSubTab(i());
                  setSearch("");
                  setShowAll(false);
                }}
                class={`pb-2 text-sm
                  ${
                    activeSubTab() === i()
                      ? "border-b-2 border-black font-semibold"
                      : "border-b-2 border-transparent text-gray-500"
                  }
                `}
              >
                {sub.label}
              </button>
            )}
          </For>
        </div>
      </Show>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        value={search()}
        onInput={(e) => setSearch(e.target.value)}
        class="w-full mb-3 px-3 py-2 border rounded text-sm"
      />

      {/* OPTIONS */}
      <div class="flex flex-wrap gap-2">
        <For each={visibleOptions()}>
          {(option) => (
            <span
              onClick={() => toggleOption(option)}
              class={`px-4 py-1 rounded-full border cursor-pointer text-sm
                ${
                  isSelected(option)
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-gray-100"
                }
              `}
            >
              {option}
            </span>
          )}
        </For>
      </div>
    </div>
  );
}
