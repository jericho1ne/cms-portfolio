import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";

function ProjectPreview({
  title,
  heroImage,
  date,
  description,
  author,
  slug,
}: {
  title: string;
  heroImage: any;
  date: string;
  description: string;
  author: any;
  slug: string;
}) {
  return (
    <div className="bg-slate-50 drop-shadow-lg rounded-md overflow-clip divide-y">
      <div className="">
        <CoverImage title={title} slug={slug} url={heroImage.url} />
      </div>
      <div className="px-6 py-8">
        <h3 className="text-2xl font-bold tracking-tighter mb-2 leading-snug">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-md">{description}</p>
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
    </div>
  );
}

export default function MoreProjects({ items }: { items: any[] }) {
  return (
    <section>
      {/* <h3 className="mb-8 text-5xl md:text-4xl font-bold tracking-tighter leading-tight">
        Recent Projects
      </h3> */}
      <div className="grid grid-cols-1 md:grid-cols-2 mb-16
        gap-x-6 gap-y-8
        md:gap-x-12 md:gap-y-12
        lg:gap-x-16 lg:gap-y-16 
      ">
        {items.map((item) => (
          <ProjectPreview
            key={item.slug}
            title={item.title}
            heroImage={item.heroImage}
            date={item.date}
            author={item.author}
            slug={item.slug}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
