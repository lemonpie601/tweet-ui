import { useEffect, useMemo, useState } from "react";
import { getRoute } from "../lib/router.js";
import PostDetail from "../pages/PostDetail.jsx";
import LeftNav from "./LeftNav.jsx";
import Composer from "./Composer.jsx";
import Feed from "./Feed.jsx";
import RightPanel from "./RightPanel.jsx";
import AuthGate from "./AuthGate.jsx";
import { supabase } from "../lib/supabaseClient.js";

export default function Layout() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setPosts(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createPost(body) {
    const { data: sess } = await supabase.auth.getSession();
    const user = sess.session?.user;

    const { error } = await supabase.from("posts").insert({
      body,
      author_id: user?.id ?? null,
      author_name: user?.email?.split("@")[0] ?? "anon"
    });

    if (error) return alert(error.message);
    await load();
  }

  async function likePost(id, currentLikes) {
    const { error } = await supabase
      .from("posts")
      .update({ likes: currentLikes + 1 })
      .eq("id", id);

    if (error) return alert(error.message);
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  }

  async function deletePost(id) {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) return alert(error.message);
    setPosts((prev) => prev.filter((p) => p.id !== id));
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
          <div className="chip">Supabase · shared</div>
        </div>

        <AuthGate>
          {route.name === "home" ? (
            <>
              <Composer onCreate={createPost} />
              {loading ? (
                <div style={{ padding: 14, color: "var(--muted)" }}>Loading feed…</div>
              ) : (
                <Feed posts={posts} onLike={likePost} onDelete={deletePost} />
              )}
            </>
          ) : (
            <PostDetail postId={route.id} />
          )}
        </AuthGate>
      </main>

      <aside className="right">
        <div className="card sticky">
          <RightPanel />
        </div>
      </aside>
    </div>
  );
}
