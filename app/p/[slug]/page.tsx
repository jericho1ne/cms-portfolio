import Link from "next/link";
import { draftMode } from "next/headers";

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
  const { isEnabled } = draftMode();
  const { post } = await getSinglePost(params.slug, isEnabled);

  return (
    <div className="container mx-auto px-5">
      <h2 className="text-xl md:text-xl font-bold tracking-tight md:tracking-tighter leading-tight mt-8 mb-8">
        <Link href="/" className="cursor-pointer bg-slate-100 p-2 underline font-bold tracking-tighter">
          Home
        </Link>
      </h2>
      <article>
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-4 md:mb-8 md:text-left">
          {post.title}
        </h1>
       
        {/* Project Description */}
        <div className="mx-auto mb-4 md:mb-8">
          <div className="prose">
            { post.bodyContent && <Markdown content={post.bodyContent} /> }
          </div>
        </div>
        {/* Technology stack */}
        <div className="mb-4 md:mb-8 sm:mx-0">
          {post.techTags.map((tag: string) => (
            <span className="bg-indigo-100 text-center justify-center text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300 mr-2">
            { tag }
          </span>
          ))}
        </div>
        {/* Hero image */}
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={post.title} url={post.heroImage.url} />
        </div>
       
       
      </article>
    </div>
  );
}
