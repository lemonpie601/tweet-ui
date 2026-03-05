import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import { goHome } from "../lib/router.js";
import CommentForm from "../components/CommentForm.jsx";
import CommentList from "../components/CommentList.jsx";

export default function PostDetail({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const postRes = await supabase.from("posts").select("*").eq("id", postId).single();
    if (postRes.error) {
      alert(postRes.error.message);
      setLoading(false);
      return;
    }
    setPost(postRes.data);

    const cRes = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (cRes.error) alert(cRes.error.message);
    setComments(cRes.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [postId]);

  async function addComment(body) {
    const { data: sess } = await supabase.auth.getSession();
    const user = sess.session?.user;

    const author_name = user?.email?.split("@")[0] ?? "anon";

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      body,
      author_id: user?.id ?? null,
      author_name
    });

    if (error) return alert(error.message);
    await load();
  }

  async function deleteComment(commentId) {
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (error) return alert(error.message);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  return (
    <div>
      <div className="centerHeader">
        <button className="actionBtn" onClick={goHome}>← Back</button>
        <div className="title">Post</div>
        <div className="chip">detail</div>
      </div>

      {loading ? (
        <div style={{ padding: 14, color: "var(--muted)" }}>Loading…</div>
      ) : (
        <>
          <div className="feedItem" style={{ borderBottom: "1px solid var(--line)" }}>
            <div className="meta">
              <span className="name">{post.author_name ?? "anon"}</span>
              <span className="handle">@{post.author_name ?? "anon"}</span>
              <span className="time">· {new Date(post.created_at).toLocaleString()}</span>
            </div>
            <div className="body" style={{ marginTop: 8 }}>{post.body}</div>
            <div className="actions" style={{ marginTop: 10 }}>
              <span>❤️ {post.likes}</span>
              <span style={{ color: "var(--muted)" }}>·</span>
              <span>💬 {comments.length}</span>
            </div>
          </div>

          <CommentForm onCreate={addComment} />
          <CommentList comments={comments} onDelete={deleteComment} />
        </>
      )}
    </div>
  );
}
