import Image, { type StaticImageData } from "next/image";

type Props = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export default function FullBleedImage({ src, alt, caption }: Props) {
  return (
    <figure className="not-prose my-12 -mx-6 sm:mx-0 sm:max-w-[920px] sm:left-1/2 sm:-translate-x-1/2 sm:relative">
      <Image
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 920px"
        className="w-full rounded-[4px]"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
