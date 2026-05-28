export type LinkItemKind = "internal" | "external" | "mail";

export interface LinkItem {
  id: string;
  kind: LinkItemKind;
  label: string;
  sublabel?: string;
  eyebrow?: string;
  href: string;
  icon: LinkIconName;
  highlight?: boolean;
}

export type LinkIconName =
  | "globe"
  | "spark"
  | "user"
  | "folder"
  | "message"
  | "play"
  | "card"
  | "leaf"
  | "chat";

export type SocialPlatform =
  | "instagram"
  | "threads"
  | "x"
  | "youtube"
  | "github"
  | "linkedin"
  | "mail";

export interface SocialItem {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export type MediaItemKind = "image" | "caption" | "video";

interface MediaBase {
  id: string;
  kind: MediaItemKind;
}

export interface MediaImageItem extends MediaBase {
  kind: "image";
  src: string;
  alt: string;
  caption?: string;
  href?: string;
}

export interface MediaCaptionItem extends MediaBase {
  kind: "caption";
  title?: string;
  body: string;
  href?: string;
}

export interface MediaVideoItem extends MediaBase {
  kind: "video";
  youtubeId: string;
  title: string;
}

export type MediaItem = MediaImageItem | MediaCaptionItem | MediaVideoItem;

export type LinksBlock =
  | { kind: "link"; item: LinkItem }
  | { kind: "media"; item: MediaItem };
