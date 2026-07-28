import Image from "next/image";

export function PaperTexture() {
  return (
    <div className="paper-texture" aria-hidden="true">
      <Image
        src="/images/editorial/paper-grain.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="paper-texture__image"
      />
    </div>
  );
}
