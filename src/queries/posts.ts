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

export async function getRelatedPosts(locale: string, entry: { id: string, data: { tags?: string | string[] | null | undefined, category: string | null | undefined, date: Date } }, limit: number = 5) {
  const posts = await getCollection('blog', (post) => post.data.language === locale);
  const stats = {
    similarTags: {
      min: 0,
      max: 0
    },
    dateDiff: {
      min: 0,
      max: 0
    },
  }
  const updateStats = (type: keyof typeof stats, value: number) => {
    const { min, max } = stats[type];
    if (value < min) stats[type].min = value;
    if (value > max) stats[type].max = value;
  }
  const index = posts.map((post) => {
    let percentSimilarTags = 0;
    if (entry.data.tags !== undefined && entry.data.tags !== null && post.data.tags !== null&& post.data.tags !== undefined) {
      let similarTags = 0;
      const postTags = Array.isArray(post.data.tags) ? post.data.tags : [post.data.tags];
      const entryTags = Array.isArray(entry.data.tags) ? entry.data.tags : [entry.data.tags];
      similarTags = postTags.reduce((acc, tag) => entryTags.includes(tag) ? acc + 1 : acc, 0);
      percentSimilarTags = similarTags / postTags.length;
      updateStats("similarTags", percentSimilarTags);
    }
    const dateDiff = Math.abs(entry.data.date.getTime() - post.data.date.getTime());
    updateStats("dateDiff", dateDiff);
    return {
      post,
      percentSimilarTags,
      dateDiff,
      score: 0,
    }
  });
  for (const post of index) {
    if (post.post.id === entry.id) continue;
    const scoreSimilarTags = post.percentSimilarTags / stats.similarTags.max;
    const scoreDateDiff = 1 - ((post.dateDiff - stats.dateDiff.min) / stats.dateDiff.max);
    post.score = scoreSimilarTags + scoreDateDiff;
  }
  index.sort((a, b) => b.score - a.score);
  return index.slice(0, limit).map(({ post }) => post);
}
