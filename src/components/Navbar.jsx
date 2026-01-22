export default function Navbar(props) {
  return (
    <nav class="h-14 bg-white border-b flex items-center px-4">
      <button
        onClick={props.toggleSidebar}
        class="mr-4 p-2 rounded hover:bg-gray-100"
      >
        ☰
      </button>
      <h1 class="font-semibold text-lg">Dashboard</h1>
    </nav>
  );
}
