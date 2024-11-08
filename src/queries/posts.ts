import { getCollection } from "astro:content";

export async function getPosts(locale: string = 'es') {
  const posts = await getCollection('blog', (post) => post.data.language === locale);
  return posts;
}

export async function getPostsByTag(tag: string, locale: string = 'es') {
  const posts = await getCollection('blog', (post) => post.data.tags?.includes(tag) && post.data.language === locale);
  return posts;
}

export async function getTags(locale: string = 'es') {
  const posts = await getCollection('blog', (post) => post.data.language === locale);
  const tagsMap = new Map<string, number>();
  for (let post of posts) {
    const { tags } = post.data;
    const safeTags = (typeof tags === "string" ? [tags] : tags) ?? [];
    safeTags.forEach(tag => {
      const current = tagsMap.get(tag) ?? 0;
      tagsMap.set(tag, current + 1);
    });
  }
  return tagsMap;
}