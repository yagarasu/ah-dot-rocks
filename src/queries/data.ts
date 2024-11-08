import { getEntry } from "astro:content";

export async function getAllTagsData() {
  const tagsData = await getEntry("data", "tags");
  return tagsData.data;
}

export async function getTagsData(tag: string) {
  const tagsData = await getEntry("data", "tags");
  return tagsData.data[tag];
}