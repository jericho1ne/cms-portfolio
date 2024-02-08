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

function Video({url, title} : {url: string, title: string}) {
  return (
    <div className="border border-2 border-slate-700">
      {/* <h4>{title}</h4> */}
      <video autoPlay loop muted width="100%" height="auto" controls >
        <source src={url} type="video/mp4" />
        <track
          src={url}
          kind="subtitles"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    </div>
    
  )
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const project = await getSingleProject(params.slug, isEnabled);
  
  return (
    <div className="container mx-auto px-5">
      <h2 className="text-xl md:text-xl font-bold tracking-tight md:tracking-tighter leading-tight mt-8 mb-8">
        <Link href="/" className="cursor-pointer bg-slate-100 p-2 underline font-bold tracking-tighter">
          Home
        </Link>
      </h2>
      <article>
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-4 md:mb-8 md:text-left">
          {project.title}
        </h1>
        
        {/* Technology stack badges */}
        <div className="mb-4 md:mb-8 sm:mx-0">
          {project.techTags.map((tag: string, key: number) => (
            <span 
              key={key}
              className="text-center justify-center text-xs font-medium px-4 py-2 py-0.5 rounded-full mr-2
              text-yellow-800 ring-1 ring-inset ring-yellow-600/20 bg-yellow-50"
            >
            { tag }
          </span>
          ))}
        </div>
          
        {/* Project Description */}
        <div className="mx-auto mb-2 md:mb-4">
          <div className="prose tracking-tight text-sm leading-6">
            { project.bodyContent && <Markdown content={project.bodyContent} /> }
          </div>
        </div>
        
        {project.demoVideo && (
          <div className="mb-4 md:mb-8">
            <Video 
              title={project.demoVideo.title} 
              url={project.demoVideo.url} 
            />
          </div>
        )}
        
        {/* External Project Link, if present */}
        {project.externalUrl && ( 
          <Link
            href={project.externalUrl}
            className="items-center rounded-md text-white
            bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
            font-bold tracking-tighter shadow-black hover:drop-shadow-sm
            transform hover:-translate-y-0.5 
            py-2 px-4 lg:px-3 duration-400 transition ease-out"
          >
            Project Demo
          </Link>
        )}
        
        {/* Hero image */}
        <div className="mt-8 mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={project.title} url={project.heroImage.url} />
        </div>
       
      </article>
    </div>
  );
}
