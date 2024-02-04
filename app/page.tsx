import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreProjects from "./more-projects";

import { getAllProjects } from "@/lib/api";
import { REPO_URL } from "@/lib/constants";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
        Mihai Peteu
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Front end software engineer, cyclist, coffee enthusiast.
      </h2>
      <div className="p-2 flex flex-row lg:flex-row items-center">
        <div className="flex flex-col md:pl-2">
          <a
            href="https://github.com/mihai-peteu?tab=overview&from=2024-01-01&to=2024-01-31"
            className="mx-3 items-center rounded-xl bg-slate-500 hover:bg-slate-400 text-white 
            font-bold tracking-tighter
            py-3 px-12 lg:px-8 duration-400 transition-colors"
          >
            Work Contributions
          </a>
        </div>
        <div className="flex flex-col md:pl-2">
          <a
            href="https://github.com/jericho1ne"
            className="mx-3 items-center rounded-xl bg-slate-500 hover:bg-slate-400 text-white 
            font-bold tracking-tighter
            py-3 px-12 lg:px-8 duration-400 transition-colors"
          >
            Personal
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroProject({
  title,
  heroImage,
  date,
  description,
  author,
  tags,
  slug,
}: {
  title: string;
  heroImage: any;
  date: string;
  description: string;
  author: any;
  tags: string[];
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={heroImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{description}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allProjects = await getAllProjects(isEnabled);
  const hero = null;                  // allProjects[0];
  const moreProjects = allProjects;   // allProjects.slice(1);

  return (
    <div className="container mx-auto px-5">
      
      <Intro />
      
      {/* {hero && (
        <HeroProject
          slug={hero.slug}
          title={hero.title}
          description={hero.description}
          heroImage={hero.heroImage}
        />
      )} */}
      
      <MoreProjects items={moreProjects} />
      
    </div>
  );
}