import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { draftMode } from "next/headers";
import { getMediaAsset } from "@/lib/api";

interface Asset {
  sys: {
    id: string;
  };
  url: string;
  description: string;
}

interface AssetLink {
  block: Asset[];
}

interface Content {
  json: any;
  links: {
    assets: AssetLink;
  };
}

async function RichTextAsset({
  id,
  assets,
}: {
  id: string;
  assets: Asset[] | undefined;
}) {
  // TODO: `includes=2` in query doesn't nested assets
  // const asset = assets?.find((asset) => asset.sys.id === id);

  const { isEnabled } = draftMode();
  const mediaAsset = await getMediaAsset(id, isEnabled);
  
  
  if (mediaAsset?.file?.url) {
    return <img src={mediaAsset.file.url} alt={mediaAsset.description} className="w-full h-fit" />;
  }

  return null;
}

export function Markdown({ content }: { content: Content }) {
  return documentToReactComponents(content.json, {
    renderNode: {
      // Custom render method for Image or Video
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content?.links?.assets?.block}
        />
      ),
    },
  });
}
