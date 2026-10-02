import Image from "next/image";
import { BlogGallery } from "@/components/public/blog/BlogGallery";
import { prepareBlogHtml } from "@/lib/blog/html";
import type { PublicBlogBlock } from "@/lib/blog/blocks";
import { toSafeMediaUrl, toYouTubeEmbedUrl } from "@/lib/blog/youtube";

type BlogBlocksProps = {
  blocks: PublicBlogBlock[];
  title: string;
};

export function BlogBlocks({ blocks, title }: BlogBlocksProps) {
  return (
    <div className="blog-blocks">
      {blocks.map((block) => (
        <BlogBlockView key={block.id} block={block} title={title} />
      ))}
    </div>
  );
}

function BlogBlockView({ block, title }: { block: PublicBlogBlock; title: string }) {
  if (block.type === "heading") {
    return <h2 className="blog-block-heading">{block.text}</h2>;
  }

  if (block.type === "description") {
    return <div className="blog-rich-text" dangerouslySetInnerHTML={{ __html: prepareBlogHtml(block.html) }} />;
  }

  if (block.type === "photo") {
    const photoUrl = toSafeMediaUrl(block.url);
    if (!photoUrl) {
      return null;
    }

    return (
      <figure className="blog-photo">
        <Image src={photoUrl} alt={block.caption || title} width={1400} height={900} className="blog-photo-image" />
        {block.caption ? <figcaption className="blog-photo-caption">{block.caption}</figcaption> : null}
      </figure>
    );
  }

  if (block.type === "youtube") {
    const embedUrl = toYouTubeEmbedUrl(block.url);
    if (!embedUrl) {
      return null;
    }

    return (
      <div className="blog-video">
        <iframe src={embedUrl} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    );
  }

  if (block.type === "gallery") {
    return <BlogGallery items={block.items} title={title} />;
  }

  const href = toSafeMediaUrl(block.url);
  if (!href) {
    return null;
  }

  return (
    <p className="blog-link-wrap">
      <a className="blog-link" href={href} target="_blank" rel="noopener noreferrer">
        {block.label}
      </a>
    </p>
  );
}
