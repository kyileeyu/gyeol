import Image, { type StaticImageData } from "next/image";

type Item = { src: StaticImageData; alt: string };

type Props = {
  items: Item[];
  cols?: 2 | 3;
};

export default function ImageGrid({ items, cols = 2 }: Props) {
  const colsClass = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`my-10 grid grid-cols-1 gap-3 ${colsClass}`}>
      {items.map((item, i) => (
        <Image
          key={i}
          src={item.src}
          alt={item.alt}
          sizes="(max-width: 768px) 100vw, 340px"
          className="w-full rounded-[4px]"
        />
      ))}
    </div>
  );
}
