import Link from "next/link";
// import { draftMode } from "next/headers";

import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreProjects from "./more-projects";

import { getAllProjects } from "@/lib/api";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
    
      <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
        Mihai Peteu
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Front end software engineer, cyclist, coffee enthusiast.
      </h2>
      <div className="p-2 flex flex-row lg:flex-row gap-x-2 items-center">
        <div className="flex flex-col md:pl-2">
          <a
            href={LINKEDIN_URL}
            className="items-center rounded-md bg-slate-800 hover:bg-blue-700 text-white 
            font-bold tracking-tighter
            py-2 px-4 lg:px-3 duration-500 transition-colors ease-in-out"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex flex-col md:pl-2">
          <a
            href={GITHUB_URL}
            className="items-center rounded-md bg-slate-800 hover:bg-blue-700 text-white 
            font-bold tracking-tighter
            py-2 px-4 lg:px-3 duration-500 transition-colors ease-in-out"
          >
            Github
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
  // const { isEnabled } = draftMode();
  const allProjects = await getAllProjects();
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
