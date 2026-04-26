import Image, { type StaticImageData } from "next/image";

type Props = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export default function CaseImage({ src, alt, caption }: Props) {
  return (
    <figure className="my-10">
      <Image
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 680px"
        className="rounded-[4px]"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
