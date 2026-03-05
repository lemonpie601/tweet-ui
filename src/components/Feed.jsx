import Post from "./Post.jsx";

export default function Feed({ posts, onLike, onDelete }) {
  return (
    <div>
      {posts.map((p) => (
        <Post
          key={p.id}
          post={p}
          onLike={() => onLike?.(p.id)}
          onDelete={() => onDelete?.(p.id)}
        />
      ))}
    </div>
  );
}
