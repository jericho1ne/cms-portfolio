import ContentfulImage from "../lib/contentful-image";
import Link from "next/link";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CoverImage({
  title,
  url,
  slug,
}: {
  title: string;
  url: string;
  slug?: string;
}) {
  const image = (
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority
      width={800}
      height={100}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={url}
    />
  );

  return (
    <div className="flex items-center border">
      {slug ? (
        <Link href={`/p/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
