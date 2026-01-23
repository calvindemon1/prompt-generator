import { Copy, Check, X, Loader } from "lucide-solid";
import { createSignal, createEffect } from "solid-js";
import { copyWithFallback } from "../utils/copyWithFallback";

export default function ResultBox(props) {
  const [text, setText] = createSignal(props.text);
  const [copied, setCopied] = createSignal(false);
  const [cleared, setCleared] = createSignal(false);

  createEffect(() => {
    setText(props.text);
  });

  const copyText = async () => {
    await copyWithFallback(text(), () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  const clearAllMenus = () => {
    props.onClearAll();
    setCleared(true);
    setTimeout(() => setCleared(false), 1200);
  };

  return (
    <div class="mt-8">
      <h3 class="font-semibold mb-2">Generated Prompt</h3>

      {/* TEXTAREA + COPY */}
      <div class="relative">
        {/* LABEL */}
        <p class="absolute top-2 left-3 text-xs text-gray-400 z-10">Prompt</p>

        {/* COPY BUTTON */}
        <button
          type="button"
          onClick={() => {
            copyText();
            document.activeElement?.blur(); // 🔥 FIX MOBILE
          }}
          class="
            absolute top-2 right-2
            z-20
            p-2 rounded
            bg-white border shadow
            active:scale-95
            transition"
        >
          {copied() ? (
            <Check size={18} class="text-green-600" />
          ) : (
            <Copy size={18} class="text-gray-700" />
          )}
        </button>

        {/* TOAST */}
        {copied() && (
          <div class="absolute top-2 right-12 z-20 text-xs bg-black text-white px-2 py-1 rounded shadow">
            Copied
          </div>
        )}

        {/* TEXTAREA */}
        <textarea
          class="
            w-full h-40
            p-4 pt-8 pr-12
            border rounded resize-none
            focus:outline-none focus:ring"
          value={text()}
          onInput={(e) => setText(e.target.value)}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div class="mt-3 flex flex-row justify-end gap-2">
        {/* CLEAR */}
        <button
          onClick={clearAllMenus}
          disabled={cleared()}
          class={`w-1/2 sm:w-auto flex gap-2 justify-center items-center px-4 py-2 rounded transition
          ${
            cleared()
              ? "bg-gray-300 text-gray-600"
              : "bg-red-500 text-white hover:opacity-80"
          }`}
        >
          {cleared() ? <Check size={18} /> : <X size={18} />}
          {cleared() ? "Cleared" : "Clear"}
        </button>

        {/* GENERATE */}
        <button
          onClick={props.onGenerate}
          class="
            w-1/2 sm:w-auto
            flex gap-2 items-center justify-center
            px-4 py-2
            bg-green-500 text-white
            rounded hover:bg-green-600"
        >
          <Loader size={18} /> Generate
        </button>
      </div>
    </div>
  );
}
