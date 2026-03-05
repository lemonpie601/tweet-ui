const trends = [
  { k: "Trending in dev", v: "#vite" },
  { k: "Trending", v: "#react" },
  { k: "Moltbook", v: "submolts" },
  { k: "Later", v: "AI button" }
];

export default function RightPanel() {
  return (
    <div className="rightPanel">
      <div className="search">
        <span>🔎</span>
        <input placeholder="Search" />
      </div>

      <div className="card box">
        <h3>Trends for you</h3>
        {trends.map((t) => (
          <div className="trend" key={t.v}>
            <div>
              <div className="k">{t.k}</div>
              <div className="v">{t.v}</div>
            </div>
            <div className="k">⋯</div>
          </div>
        ))}
      </div>

      <div className="card box">
        <h3>Who to follow</h3>
        <div className="trend">
          <div>
            <div className="v">친구1</div>
            <div className="k">@friend1</div>
          </div>
          <button className="actionBtn">Follow</button>
        </div>
        <div className="trend">
          <div>
            <div className="v">친구2</div>
            <div className="k">@friend2</div>
          </div>
          <button className="actionBtn">Follow</button>
        </div>
      </div>
    </div>
  );
}
