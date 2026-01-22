import { createSignal, onMount, createEffect, on } from "solid-js";
import { Trash2, Pencil, Save, X } from "lucide-solid";
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = "https://14grftw2-30001.asse.devtunnels.ms/api";

export default function MasterForm({ config, tabKey }) {
  const [value, setValue] = createSignal("");
  const [items, setItems] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [toast, setToast] = createSignal(null);

  const [editingId, setEditingId] = createSignal(null);
  const [editValue, setEditValue] = createSignal("");

  /* ================= TOAST ================= */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}${config.endpoints.list}`);
      setItems(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error(err);
      showToast("Gagal mengambil data", "error");
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchData();
  });

  /* ================= CREATE ================= */
  const submit = async () => {
    if (!value().trim()) return;

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}${config.endpoints.create}`, {
        [config.field]: value(),
      });
      setValue("");
      showToast("Berhasil menambahkan data");
      fetchData();
    } catch {
      showToast("Gagal menambahkan data", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE ================= */
  const update = async (id) => {
    try {
      await axios.put(`${BASE_URL}${config.endpoints.update(id)}`, {
        [config.field]: editValue(),
      });
      showToast("Berhasil update data");
      setEditingId(null);
      fetchData();
    } catch {
      showToast("Gagal update data", "error");
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    try {
      await axios.delete(`${BASE_URL}${config.endpoints.delete(id)}`);
      showToast("Data berhasil dihapus");
      fetchData();
    } catch {
      showToast("Gagal menghapus data", "error");
    }
  };

  return (
    <div class="space-y-6 relative">
      {/* TOAST */}
      {toast() && (
        <div
          class={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white z-50
          ${toast().type === "error" ? "bg-red-500" : "bg-green-600"}`}
        >
          {toast().message}
        </div>
      )}

      {/* FORM */}
      <div class="flex gap-2 items-center">
        <input
          value={value()}
          onInput={(e) => setValue(e.target.value)}
          placeholder={`Input ${config.label}`}
          class="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={submit}
          disabled={loading()}
          class="px-4 py-2 bg-black text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Add
        </button>
      </div>

      {/* TABLE */}
      <table class="w-full border text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border text-left">Name</th>
            <th class="p-2 border w-32 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading() && (
            <tr>
              <td colSpan="2" class="p-4 text-center animate-pulse">
                Loading...
              </td>
            </tr>
          )}

          {!loading() && items().length === 0 && (
            <tr>
              <td colSpan="2" class="p-4 text-center text-gray-500">
                No data
              </td>
            </tr>
          )}

          {items().map((item) => (
            <tr>
              <td class="border p-2">
                {editingId() === item.id ? (
                  <input
                    value={editValue()}
                    onInput={(e) => setEditValue(e.target.value)}
                    class="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  item[config.field]
                )}
              </td>

              <td class="p-2 text-center flex items-center justify-center gap-3">
                {editingId() === item.id ? (
                  <>
                    <button
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Simpan perubahan data ini?",
                          icon: "question",
                          showCancelButton: true,
                          confirmButtonText: "Simpan",
                          cancelButtonText: "Batal",
                        });

                        if (result.isConfirmed) {
                          update(item.id);
                          Swal.fire(
                            "Tersimpan!",
                            "Data berhasil diperbarui.",
                            "success",
                          );
                        }
                      }}
                      class="text-green-600 cursor-pointer"
                    >
                      <Save size={18} />
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      class="text-red-500 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditValue(item[config.field]);
                      }}
                      class="text-blue-500 cursor-pointer"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Yakin ingin menghapus data ini?",
                          text: "Data yang dihapus tidak bisa dikembalikan!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Ya, hapus!",
                          cancelButtonText: "Batal",
                        });

                        if (result.isConfirmed) {
                          remove(item.id);
                          Swal.fire(
                            "Terhapus!",
                            "Data berhasil dihapus.",
                            "success",
                          );
                        }
                      }}
                      class="text-red-500 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
