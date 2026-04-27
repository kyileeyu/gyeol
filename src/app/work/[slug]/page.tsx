import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getAllCases,
  readCase,
  getAdjacentCases,
} from "@/features/work/lib/mdx";
import { compiledCases } from "@/features/work/lib/cases.compiled";
import { mdxComponents } from "@/features/work/components/mdx";
import CaseHeader from "@/features/work/components/CaseHeader";
import CaseMeta from "@/features/work/components/CaseMeta";
import CaseNav from "@/features/work/components/CaseNav";
import LiveSiteCTA from "@/features/work/components/LiveSiteCTA";
import Footer from "@/components/sections/Footer";

const SITE_URL = "https://gyeol.page";

export const dynamicParams = true;

export async function generateStaticParams() {
  const cases = await getAllCases();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await readCase(params.slug);
  if (!data) return {};
  const { meta } = data;
  const coverUrl = meta.coverSrc.src.startsWith("http")
    ? meta.coverSrc.src
    : `${SITE_URL}${meta.coverSrc.src}`;
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/work/${meta.slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.summary,
      url: `${SITE_URL}/work/${meta.slug}`,
      publishedTime: meta.publishedAt,
      images: [
        {
          url: coverUrl,
          width: meta.coverSrc.width,
          height: meta.coverSrc.height,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.summary,
      images: [coverUrl],
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await readCase(params.slug);
  if (!data) notFound();
  const { meta } = data;
  const { prev, next } = await getAdjacentCases(meta.slug);

  const MDXContent = compiledCases[meta.slug];
  if (!MDXContent) notFound();

  const coverUrl = meta.coverSrc.src.startsWith("http")
    ? meta.coverSrc.src
    : `${SITE_URL}${meta.coverSrc.src}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary,
    image: coverUrl,
    datePublished: meta.publishedAt,
    author: { "@type": "Organization", name: "결 Gyeol" },
    publisher: { "@type": "Organization", name: "결 Gyeol" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/work/${meta.slug}`,
    },
  };

  return (
    <main className="bg-bg">
      <article className="mx-auto max-w-[680px] px-6 pt-28 pb-24 sm:pt-36">
        <CaseHeader meta={meta} />
        <CaseMeta meta={meta} />
        <div className="prose-gyeol">
          <MDXContent components={mdxComponents} />
        </div>
        {meta.liveUrl && <LiveSiteCTA href={meta.liveUrl} />}
        <CaseNav prev={prev} next={next} />
      </article>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
