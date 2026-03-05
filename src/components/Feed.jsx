import { useState } from "react";
import { MOCK_POSTS } from "../data/mock.js";
import Post from "./Post.jsx";

export default function Feed() {
  const [posts] = useState(MOCK_POSTS);

  return (
    <div>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}
