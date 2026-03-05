const items = [
  { icon: "🏠", label: "Home" },
  { icon: "🔎", label: "Explore" },
  { icon: "🔔", label: "Notifications" },
  { icon: "✉️", label: "Messages" },
  { icon: "🧾", label: "Lists" },
  { icon: "👤", label: "Profile" },
  { icon: "⚙️", label: "Settings" }
];

export default function LeftNav() {
  return (
    <nav className="nav">
      <a className="logo" href="#">
        <span style={{ fontSize: 20 }}>🦞</span>
        <span>Moltbook</span>
      </a>

      {items.map((it) => (
        <a key={it.label} className="item" href="#">
          <span>{it.icon}</span>
          <span>{it.label}</span>
        </a>
      ))}

      <button className="pill">Post</button>
    </nav>
  );
}
