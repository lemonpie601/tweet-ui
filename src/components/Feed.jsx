import { useEffect, useMemo, useState } from "react";
import { MOCK_POSTS } from "../data/mock.js";
import Post from "./Post.jsx";
import { formatTime, loadPosts, makePost, savePosts } from "../lib/storage.js";

export default function Feed({ composerText }) {
  const initial = useMemo(() => {
    // 처음 방문자에게는 샘플이 보이도록: LocalStorage가 비어있으면 MOCK로 시작
    return loadPosts(MOCK_POSTS);
  }, []);

  const [posts, setPosts] = useState(initial);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  function createPost(body) {
    const newPost = makePost({ body });
    setPosts((prev) => [newPost, ...prev]);
  }

  function likePost(id) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stats: { ...p.stats, likes: p.stats.likes + 1 } } : p
      )
    );
  }

  function removePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  // createdAt 있으면 상대시간 갱신
  const hydrated = posts.map((p) => ({
    ...p,
    time: p.createdAt ? formatTime(p.createdAt) : p.time
  }));

  return (
    <div>
      {/* Feed 상단에 createPost를 제공하기 위해 밖에서 Composer를 올릴 거라,
          여기선 Post 리스트만 렌더합니다. */}
      {hydrated.map((p) => (
        <Post key={p.id} post={p} onLike={() => likePost(p.id)} onDelete={() => removePost(p.id)} />
      ))}
      {/* createPost는 Layout에서 Composer로 연결할게요 */}
      <FeedActionsBridge onCreate={createPost} />
    </div>
  );
}

// 작은 트릭: Layout 변경을 최소화하려고 Feed 안에 브릿지 컴포넌트를 둠.
// (원하면 Layout에서 props로 더 예쁘게 정리해줄게)
function FeedActionsBridge({ onCreate }) {
  // window에 임시로 걸어둬서 Composer가 호출할 수 있게 함
  // 깔끔한 구조는 Layout에서 상태를 끌어올리는 거지만, 수정량 최소화 버전!
  useEffect(() => {
    window.__tweetui_createPost = onCreate;
    return () => {
      window.__tweetui_createPost = undefined;
    };
  }, [onCreate]);

  return null;
}
