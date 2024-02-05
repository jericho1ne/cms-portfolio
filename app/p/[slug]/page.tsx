import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "../../cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllProjects, getSingleProject } from "@/lib/api";

export async function generateStaticParams() {
  const projects = await getAllProjects(true);

  return projects.map((item) => ({
    slug: item.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const { post } = await getSingleProject(params.slug, isEnabled);

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
        
        {/* Technology stack */}
        <div className="mb-4 md:mb-8 sm:mx-0">
          {post.techTags.map((tag: string, key: number) => (
            <span 
              key={key}
              className="bg-indigo-100 text-center justify-center text-grey-20 text-xs font-medium px-4 py-2 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300 mr-2"
            >
            { tag }
          </span>
          ))}
        </div>
       
        {/* Project Description */}
        <div className="mx-auto mb-4 md:mb-8">
          <div className="prose tracking-tight text-sm leading-6">
            { post.bodyContent && <Markdown content={post.bodyContent} /> }
          </div>
        </div>
        {/* Hero image */}
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={post.title} url={post.heroImage.url} />
        </div>
       
       
      </article>
    </div>
  );
}
