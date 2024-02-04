import Link from "next/link";
// import { draftMode } from "next/headers";

import CoverImage from "../../cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllProjects, getSinglePost } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllProjects(true);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // const { isEnabled } = draftMode();
  const { post } = await getSinglePost(params.slug, false);

  return (
    <div className="container mx-auto px-5">
      <h2 className="text-xl md:text-xl font-bold tracking-tight md:tracking-tighter leading-tight mt-8 mb-8">
        <Link href="/" className="bg-slate-100 p-2 underline font-bold tracking-tighter">
          Home
        </Link>
      </h2>
      <article>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          {post.title}
        </h1>
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={post.title} url={post.heroImage.url} />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="prose">
            { post.bodyContent && <Markdown content={post.bodyContent} /> }
          </div>
        </div>
      </article>
    </div>
  );
}
