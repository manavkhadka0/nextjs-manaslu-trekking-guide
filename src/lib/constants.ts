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
    url: "https://facebook.com/manaslutrekkingguide",
    icon: Facebook,
    username: "@manaslutrekkingguide",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/manaslu_trekking",
    icon: Instagram,
    username: "@manaslu_trekking",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/manaslu_trek",
    icon: Twitter,
    username: "@manaslu_trek",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/c/manaslutrekking",
    icon: Youtube,
    username: "Manaslu Trekking Guide",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/manaslu-trekking-guide",
    icon: Linkedin,
    username: "Manaslu Trekking Guide",
  },
];

export const CONTACT_INFO = {
  email: "info@manaslu-trekking.com",
  phone: "+977 9841234567",
  address: "Thamel, Kathmandu, Nepal",
  website: "https://manaslu-trekking.com",
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
  {
    name: "Website",
    value: CONTACT_INFO.website,
    url: CONTACT_INFO.website,
    icon: Globe,
  },
];
