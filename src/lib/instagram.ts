import "server-only";

export type InstagramPost = {
  id: string;
  permalink: string;
  image: string;
  caption: string;
};

/**
 * Deux sources possibles, au choix via l'environnement :
 * - INSTAGRAM_FEED_URL : flux JSON Behold.so (gère seul le jeton Meta)
 * - INSTAGRAM_ACCESS_TOKEN : API Instagram officielle (compte pro, jeton longue durée à rafraîchir)
 * Sans configuration, la section affiche simplement un lien vers le compte.
 */
export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  try {
    const feedUrl = process.env.INSTAGRAM_FEED_URL;
    if (feedUrl) {
      const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
      if (!res.ok) return [];
      const data = (await res.json()) as {
        posts?: {
          id: string;
          permalink: string;
          mediaUrl?: string;
          thumbnailUrl?: string;
          sizes?: { medium?: { mediaUrl?: string } };
          caption?: string;
        }[];
      };
      return (data.posts ?? []).slice(0, limit).map((p) => ({
        id: p.id,
        permalink: p.permalink,
        image: p.sizes?.medium?.mediaUrl ?? p.thumbnailUrl ?? p.mediaUrl ?? "",
        caption: p.caption ?? "",
      }));
    }

    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (token) {
      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=${limit}&access_token=${token}`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) return [];
      const data = (await res.json()) as {
        data?: {
          id: string;
          permalink: string;
          media_type: string;
          media_url: string;
          thumbnail_url?: string;
          caption?: string;
        }[];
      };
      return (data.data ?? []).map((p) => ({
        id: p.id,
        permalink: p.permalink,
        image: p.media_type === "VIDEO" ? (p.thumbnail_url ?? "") : p.media_url,
        caption: p.caption ?? "",
      }));
    }
  } catch {
    // Un flux indisponible ne doit jamais casser la page
  }
  return [];
}
