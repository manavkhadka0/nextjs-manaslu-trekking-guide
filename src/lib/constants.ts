import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Globe,
  type LucideIcon,
} from "lucide-react";

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  username?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/16kG1CFwtU/",
    icon: Facebook,
    username: "@manaslutrekkingguide",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/manasluguide4545?igsh=MWc2OWZlc2k3NnZhYQ==",
    icon: Instagram,
    username: "@manaslu_trekking",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@Adventure1-s",
    icon: Youtube,
    username: "Manaslu Trekking Guide",
  },
];

export const CONTACT_INFO = {
  email: "adhikarisamrat4545@gmail.com",
  phone: "+977 9848740081",
  address: "Thamel, Kathmandu, Nepal",
};

export const CONTACT_LINKS = [
  {
    name: "Email",
    value: CONTACT_INFO.email,
    url: `mailto:${CONTACT_INFO.email}`,
    icon: Mail,
  },
  {
    name: "Phone",
    value: CONTACT_INFO.phone,
    url: `tel:${CONTACT_INFO.phone}`,
    icon: Phone,
  },
  {
    name: "Address",
    value: CONTACT_INFO.address,
    url: "https://maps.google.com/?q=Thamel,Kathmandu,Nepal",
    icon: MapPin,
  },
];
