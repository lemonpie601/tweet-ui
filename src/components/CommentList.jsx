export default function CommentList({ comments, onDelete }) {
  if (!comments.length) {
    return <div style={{ padding: 14, color: "var(--muted)" }}>첫 댓글을 남겨보세요.</div>;
  }

  return (
    <div>
      {comments.map((c) => (
        <div key={c.id} className="feedItem">
          <div className="feedRow">
            <div className="avatar" />
            <div>
              <div className="meta">
                <span className="name">{c.author_name ?? "anon"}</span>
                <span className="handle">@{c.author_name ?? "anon"}</span>
                <span className="time">· {new Date(c.created_at).toLocaleString()}</span>
              </div>
              <div className="body">{c.body}</div>

              <div className="actions">
                <button className="actionBtn" onClick={() => onDelete?.(c.id)} title="내 댓글 삭제">
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
