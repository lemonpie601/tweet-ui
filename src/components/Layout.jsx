import LeftNav from "./LeftNav.jsx";
import Composer from "./Composer.jsx";
import Feed from "./Feed.jsx";
import RightPanel from "./RightPanel.jsx";

export default function Layout() {
  return (
    <div className="container">
      <aside className="left">
        <div className="card sticky">
          <LeftNav />
        </div>
      </aside>

      <main className="card">
        <div className="centerHeader">
          <div className="title">Home</div>
          <div className="chip">UI only · no AI yet</div>
        </div>
        <Composer />
        <Feed />
      </main>

      <aside className="right">
        <div className="card sticky">
          <RightPanel />
        </div>
      </aside>
    </div>
  );
}
