export default function Post({ post, onLike, onDelete }) {
  return (
    <div className="feedItem">
      <div className="feedRow">
        <div className="avatar" />
        <div>
          <div className="meta">
            <span className="name">{post.author_name ?? "anon"}</span>
            <span className="handle">@{post.author_name ?? "anon"}</span>
            <span className="time">· {new Date(post.created_at).toLocaleString()}</span>
          </div>

          <div className="body">{post.body}</div>

          <div className="actions">
            <button className="actionBtn" aria-label="reply">💬</button>
            <button className="actionBtn" aria-label="repost">🔁</button>
            <button className="actionBtn" aria-label="like" onClick={onLike}>
              ❤️ {post.likes}
            </button>
            <button className="actionBtn" aria-label="delete" onClick={onDelete} title="삭제">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
