import { useState } from "react";

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.stats.likes);

  return (
    <div className="feedItem">
      <div className="feedRow">
        <div className="avatar" />
        <div>
          <div className="meta">
            <span className="name">{post.name}</span>
            <span className="handle">{post.handle}</span>
            <span className="time">· {post.time}</span>
          </div>
          <div className="body">{post.body}</div>

          <div className="actions">
            <button className="actionBtn" aria-label="reply">
              💬 {post.stats.replies}
            </button>
            <button className="actionBtn" aria-label="repost">
              🔁 {post.stats.reposts}
            </button>
            <button
              className="actionBtn"
              aria-label="like"
              onClick={() => setLikes((v) => v + 1)}
            >
              ❤️ {likes}
            </button>
            <button className="actionBtn" aria-label="share">
              ⤴️ Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
