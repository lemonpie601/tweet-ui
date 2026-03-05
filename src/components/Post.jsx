import { goPost } from "../lib/router.js";

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

          <div
            className="body"
            role="link"
            tabIndex={0}
            onClick={() => goPost(post.id)}
            onKeyDown={(e) => e.key === "Enter" && goPost(post.id)}
            style={{ cursor: "pointer" }}
            title="상세보기"
          >
            {post.body}
          </div>

          <div className="actions">
            <button className="actionBtn" aria-label="reply" onClick={() => goPost(post.id)}>
              💬 댓글
            </button>
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
