import { useEffect } from "react";
import DOMPurify from "dompurify";

export default function Reply({ postId, title }) {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(reply.post_content),
        }}
      />
      {reply.post_author}
    </div>
  );
}
