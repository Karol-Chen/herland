import Image from "next/image";
import forum_default from "../public/forum_default.png";
export default function Forum({ forum }) {
  return (
    <div>
      <Image
        src={forum.img ? forum.img : forum_default}
        alt={forum.title}
        width={50}
        height={50}
      />
      {forum.title} {forum.topic_num} {forum.reply_num}
    </div>
  );
}
