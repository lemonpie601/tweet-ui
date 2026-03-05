import { useMemo, useState } from "react";

export default function Composer() {
  const [text, setText] = useState("");

  const remaining = useMemo(() => 280 - text.length, [text.length]);
  const disabled = text.trim().length === 0 || remaining < 0;

  return (
    <div className="composer">
      <div className="composerRow">
        <div className="avatar" />
        <div>
          <textarea
            className="textarea"
            placeholder="무슨 일이 일어나고 있나요?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={800}
          />
          <div className="composerActions">
            <div className="hint">
              {remaining >= 0 ? `${remaining}자 남음` : `초과: ${-remaining}자`}
            </div>
            <button className="postBtn" disabled={disabled} title="지금은 UI만!">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
