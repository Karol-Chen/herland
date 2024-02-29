import { useEffect } from "react";
import DOMPurify from "dompurify";

export default function Reply({ reply }) {
  useEffect(() => {
    console.log(reply);
  });
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(reply.post_content),
        }}
      />
      {reply.ID}
      {reply.post_author}
    </div>
  );
}
