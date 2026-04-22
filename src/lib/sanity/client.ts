import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
// Set up the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// Helper function to get YouTube video ID from URL
export const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper function to get Vimeo video ID from URL
export const getVimeoId = (url: string): string | null => {
  const regExp =
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
  const match = url.match(regExp);
  return match ? match[2] : null;
};

// Helper function to generate YouTube embed URL
export const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = getYouTubeId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

// Helper function to generate Vimeo embed URL
export const getVimeoEmbedUrl = (url: string): string => {
  const videoId = getVimeoId(url);
  return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
};

// Helper function to get video embed URL based on the video platform
export const getVideoEmbedUrl = (url: string): string => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return getYouTubeEmbedUrl(url);
  } else if (url.includes("vimeo.com")) {
    return getVimeoEmbedUrl(url);
  }
  return "";
};
