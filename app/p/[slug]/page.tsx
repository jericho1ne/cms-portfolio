import Link from "next/link";
import { draftMode } from "next/headers";

// import MoreProjects from "../../more-projects";
import CoverImage from "../../cover-image";
// import Date from "../../date";

import { Markdown } from "@/lib/markdown";
import { getAllProjects, getPostAndMorePosts } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllProjects(false);

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
  const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);

  return (
    <div className="container mx-auto px-5">
      <h2 className="text-xl md:text-xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Mihai Peteu
        </Link>
      </h2>
      <article>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
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
      <hr className="border-accent-2 mt-28 mb-24" />
      {/* <MoreProjects items={morePosts} /> */}
    </div>
  );
}
