import { Copy, Check, X, Loader } from "lucide-solid";
import { createSignal, createEffect } from "solid-js";

export default function ResultBox(props) {
  const [text, setText] = createSignal(props.text);
  const [copied, setCopied] = createSignal(false);
  const [clearMenu, setClearMenu] = createSignal(false);
  const [showToast, setShowToast] = createSignal(false);
  const [showClearToast, setShowClearToast] = createSignal(false);

  createEffect(() => {
    setText(props.text);
  });

  const copyText = async () => {
    await navigator.clipboard.writeText(text());

    setCopied(true);
    setShowToast(true);

    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 1000);
  };

  const clearAllMenus = async () => {
    props.onClearAll();

    setClearMenu(true);
    setShowClearToast(true);

    setTimeout(() => {
      setClearMenu(false);
      setShowClearToast(false);
    }, 1000);
  };

  return (
    <div class="mt-8 relative">
      <h3 class="font-semibold mb-2">Generated Prompt</h3>

      <textarea
        class="w-full h-40 p-4 border rounded resize-none focus:outline-none focus:ring"
        value={text()}
        onInput={(e) => setText(e.target.value)}
      />

      <div class="mt-2 flex justify-end gap-2">
        {/* COPY BUTTON */}
        <button
          onClick={copyText}
          disabled={copied()}
          class={`flex gap-2 items-center px-4 py-2 rounded transition
            ${
              copied()
                ? "bg-gray-400 text-gray-700 cursor-default"
                : "bg-black text-white hover:opacity-80"
            }`}
        >
          {copied() ? <Check size={20} /> : <Copy size={20} />}
          {copied() ? "Copied" : "Copy"}
        </button>

        {/* CLEAR ALL BUTTON */}
        <button
          onClick={clearAllMenus}
          disabled={clearMenu()}
          class={`flex gap-2 items-center px-4 py-2 rounded transition
            ${
              clearMenu()
                ? "bg-red-300 text-gray-700 cursor-default"
                : "bg-red-500 text-white hover:opacity-80"
            }`}
        >
          {clearMenu() ? <Check size={20} /> : <X size={20} />}
          {clearMenu() ? "Cleared" : "Clear All"}
        </button>

        {/* GENERATE BUTTON */}
        <button
          onClick={props.onGenerate} // pakai prop dari Dashboard
          class="flex gap-2 items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <Loader size={20} /> Generate
        </button>
      </div>

      {/* TOAST */}
      {showToast() && (
        <div class="absolute top-0 right-0 mt-2 mr-2 bg-black text-white px-4 py-2 rounded shadow">
          ✅ Copied to clipboard
        </div>
      )}
      {showClearToast() && (
        <div class="absolute top-0 right-0 mt-2 mr-2 bg-gray-100 text-red-500 px-4 py-2 rounded shadow">
          ❌ Cleared All Menus
        </div>
      )}
    </div>
  );
}
