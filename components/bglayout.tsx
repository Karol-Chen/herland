import herlandBanner from "../public/banner.jpg";
import Image from "next/image";

export default function BgLayout() {
  return (
    <div className="background-img">
      <Image
        src={herlandBanner}
        alt="background image"
        layout="fill"
        style={{ position: "absolute", zIndex: -1 }}
      ></Image>
    </div>
  );
}
