import { useMemo, useState } from "react";

export default function CommentForm({ onCreate }) {
  const [text, setText] = useState("");

  const remaining = useMemo(() => 240 - text.length, [text.length]);
  const disabled = text.trim().length === 0 || remaining < 0;

  function submit() {
    if (disabled) return;
    onCreate?.(text.trim());
    setText("");
  }

  return (
    <div className="composer" style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="composerRow">
        <div className="avatar" />
        <div>
          <textarea
            className="textarea"
            placeholder="댓글을 남겨보세요…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={800}
          />
          <div className="composerActions">
            <div className="hint">
              {remaining >= 0 ? `${remaining}자 남음` : `초과: ${-remaining}자`}
            </div>
            <button className="postBtn" disabled={disabled} onClick={submit}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
