import { useMemo, useState } from "react";
import LeftNav from "./LeftNav.jsx";
import Composer from "./Composer.jsx";
import Feed from "./Feed.jsx";
import RightPanel from "./RightPanel.jsx";
import { MOCK_POSTS } from "../data/mock.js";
import { loadPosts, makePost, savePosts } from "../lib/storage.js";

export default function Layout() {
  const initial = useMemo(() => loadPosts(MOCK_POSTS), []);
  const [posts, setPosts] = useState(initial);

  function createPost(body) {
    const newPost = makePost({ body });
    const next = [newPost, ...posts];
    setPosts(next);
    savePosts(next);
  }

  function likePost(id) {
    const next = posts.map((p) =>
      p.id === id ? { ...p, stats: { ...p.stats, likes: p.stats.likes + 1 } } : p
    );
    setPosts(next);
    savePosts(next);
  }

  function removePost(id) {
    const next = posts.filter((p) => p.id !== id);
    setPosts(next);
    savePosts(next);
  }

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
          <div className="chip">LocalStorage · no AI yet</div>
        </div>
        <Composer onCreate={createPost} />
        <Feed posts={posts} onLike={likePost} onDelete={removePost} />
      </main>

      <aside className="right">
        <div className="card sticky">
          <RightPanel />
        </div>
      </aside>
    </div>
  );
}
