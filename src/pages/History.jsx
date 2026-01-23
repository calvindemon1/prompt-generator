import { createSignal, createMemo, onMount, Show } from "solid-js";
import axios from "axios";
import { Eye } from "lucide-solid";
import { promptConfig } from "../config/promptConfig";

const BASE_URL = "https://14grftw2-30001.asse.devtunnels.ms/api";

export default function History() {
  const [data, setData] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const [search, setSearch] = createSignal("");
  const [sortKey, setSortKey] = createSignal("created_at");
  const [sortDir, setSortDir] = createSignal("desc");

  const [selectedId, setSelectedId] = createSignal(null);
  const [detail, setDetail] = createSignal(null);

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

  const toggleSort = (key) => {
    if (sortKey() === key) {
      setSortDir(sortDir() === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
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
      <div class="border rounded overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th
                class="p-3 cursor-pointer"
                onClick={() => toggleSort("creative_prompt_name")}
              >
                Name
              </th>
              <th class="p-3">Prompt</th>
              <th
                class="p-3 cursor-pointer"
                onClick={() => toggleSort("created_at")}
              >
                Created
              </th>
              <th class="p-3 text-center w-20">Detail</th>
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

            {filtered().map((row) => (
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
              <div class="text-xs text-gray-500 mb-1">Prompt</div>
              <pre class="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
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
