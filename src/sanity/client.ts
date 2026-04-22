import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "aiqpnnbw",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const getWriteClient = () =>
  createClient({
    projectId: "aiqpnnbw",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
