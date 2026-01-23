import { createSignal, createMemo, onMount, Show } from "solid-js";
import axios from "axios";
import { Check, Copy, Eye } from "lucide-solid";
import { promptConfig } from "../config/promptConfig";
import { copyWithFallback } from "../utils/copyWithFallback";

const BASE_URL = "https://14grftw2-30001.asse.devtunnels.ms/api";

export default function History() {
  const [data, setData] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const [search, setSearch] = createSignal("");
  const [sortKey, setSortKey] = createSignal("created_at");
  const [sortDir, setSortDir] = createSignal("desc");

  const [selectedId, setSelectedId] = createSignal(null);
  const [detail, setDetail] = createSignal(null);
  const [copied, setCopied] = createSignal(false);
  const PAGE_SIZE = 5;
  const [page, setPage] = createSignal(1);

  /* ================= FETCH ALL ================= */
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}${promptConfig.endpoints.list}`);
      setData(Array.isArray(res.data?.data) ? res.data.data : []);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH DETAIL ================= */
  const fetchDetail = async (id) => {
    const res = await axios.get(
      `${BASE_URL}${promptConfig.endpoints.detail(id)}`,
    );
    setDetail(res.data?.data);
  };

  onMount(fetchAll);

  /* ================= FILTER + SORT ================= */
  const filtered = createMemo(() => {
    let rows = [...data()];

    if (search()) {
      const q = search().toLowerCase();
      rows = rows.filter(
        (r) =>
          r.creative_prompt_name?.toLowerCase().includes(q) ||
          r.prompt?.toLowerCase().includes(q),
      );
    }

    rows.sort((a, b) => {
      const A = a[sortKey()];
      const B = b[sortKey()];
      if (!A || !B) return 0;
      return sortDir() === "asc" ? (A > B ? 1 : -1) : A < B ? 1 : -1;
    });

    return rows;
  });

  const totalPages = createMemo(() => Math.ceil(filtered().length / PAGE_SIZE));

  const pagedData = createMemo(() => {
    const start = (page() - 1) * PAGE_SIZE;
    return filtered().slice(start, start + PAGE_SIZE);
  });

  const toggleSort = (key) => {
    if (sortKey() === key) {
      setSortDir(sortDir() === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleCopy = async (text) => {
    await copyWithFallback(text, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div class="space-y-6">
      <h2 class="text-2xl font-bold">Prompt History</h2>

      {/* SEARCH */}
      <input
        placeholder="Search prompt name / content..."
        class="border px-3 py-2 rounded w-full"
        onInput={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div class="border rounded overflow-x-auto">
        <table class="min-w-[900px] w-full text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th
                class="p-3 cursor-pointer whitespace-nowrap"
                onClick={() => toggleSort("creative_prompt_name")}
              >
                Name{" "}
                {sortKey() === "creative_prompt_name" &&
                  (sortDir() === "asc" ? "▲" : "▼")}
              </th>

              <th class="p-3 whitespace-nowrap">Prompt</th>

              <th
                class="p-3 cursor-pointer whitespace-nowrap"
                onClick={() => toggleSort("created_at")}
              >
                Created{" "}
                {sortKey() === "created_at" &&
                  (sortDir() === "asc" ? "▲" : "▼")}
              </th>

              <th class="p-3 text-center w-20 whitespace-nowrap">Detail</th>
            </tr>
          </thead>

          <tbody>
            {loading() && (
              <tr>
                <td colSpan="4" class="p-6 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading() && filtered().length === 0 && (
              <tr>
                <td colSpan="4" class="p-6 text-center text-gray-500">
                  No history found
                </td>
              </tr>
            )}

            {pagedData().map((row) => (
              <tr class="border-t hover:bg-gray-50">
                <td class="p-3 font-medium">{row.creative_prompt_name}</td>

                <td class="p-3 text-gray-600">
                  {row.prompt?.length > 80
                    ? row.prompt.slice(0, 80) + "..."
                    : row.prompt}
                </td>

                <td class="p-3 text-xs text-gray-500">
                  {new Date(row.created_at).toLocaleString()}
                </td>

                <td class="p-3 text-center">
                  <button
                    class="text-blue-600"
                    onClick={async () => {
                      setSelectedId(row.id);
                      await fetchDetail(row.id);
                    }}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <Show when={totalPages() > 1}>
        <div class="flex justify-end items-center gap-2 text-sm">
          <button
            disabled={page() === 1}
            onClick={() => setPage(page() - 1)}
            class="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span>
            Page {page()} of {totalPages()}
          </span>

          <button
            disabled={page() === totalPages()}
            onClick={() => setPage(page() + 1)}
            class="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </Show>

      {/* DETAIL MODAL */}
      <Show when={detail()}>
        <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg w-[700px] max-h-[80vh] overflow-auto p-6 space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="font-semibold text-lg">
                {detail().creative_prompt_name}
              </h3>
              <button
                onClick={() => {
                  setDetail(null);
                  setSelectedId(null);
                }}
                class="text-gray-500"
              >
                ✕
              </button>
            </div>

            <div>
              {/* HEADER */}
              <div class="flex items-center justify-between mb-2">
                <div class="text-xs text-gray-500">Prompt</div>

                <button
                  type="button"
                  onClick={() => handleCopy(detail().prompt)}
                  class="
                    flex items-center gap-1
                    text-xs px-3 py-1
                    rounded border
                    bg-white
                    active:bg-black active:text-white
                    touch-manipulation"
                >
                  {copied() ? <Check size={16} /> : <Copy size={16} />}
                  {copied() ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* PROMPT CONTENT */}
              <pre
                class="
                  bg-gray-100
                  p-3
                  rounded
                  text-sm
                  whitespace-pre-wrap
                  max-h-60
                  overflow-auto
                  select-text"
              >
                {detail().prompt}
              </pre>
            </div>

            {detail().prompt_notes && (
              <div>
                <div class="text-xs text-gray-500 mb-1">Notes</div>
                <div class="text-sm">{detail().prompt_notes}</div>
              </div>
            )}
          </div>
        </div>
      </Show>
    </div>
  );
}
