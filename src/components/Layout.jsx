import { createSignal } from "solid-js";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout(props) {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div class="h-screen flex flex-col">
      <Navbar toggleSidebar={() => setIsOpen(!isOpen())} />

      <div class="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen()} />

        <main class="flex-1 bg-gray-100 p-4 overflow-y-auto">
          {props.children}
        </main>
      </div>
    </div>
  );
}
