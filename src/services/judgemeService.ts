import { JUDGEME_CONFIG } from '../config/judgeme';

export type JudgeMeReviewer = {
  id?: number;
  name?: string | null;
  email?: string | null;
};

export type JudgeMeReview = {
  id: number;
  rating: number; // 1..5
  title: string | null;
  body: string | null;
  created_at: string;
  reviewer?: JudgeMeReviewer;
};

function extractNumericProductIdFromGid(productGid: string): string | null {
  // Shopify GID format: gid://shopify/Product/<NUMERIC_ID>
  if (!productGid) return null;
  const parts = productGid.split('/');
  const last = parts[parts.length - 1];
  return /\d+/.test(last) ? last : null;
}

type FetchProductReviewsArgs = {
  productGid: string;
  perPage?: number;
  page?: number;
};

export async function fetchProductReviews(
  args: FetchProductReviewsArgs,
): Promise<JudgeMeReview[]> {
  const { productGid, perPage = 10, page = 1 } = args;
  const productId = extractNumericProductIdFromGid(productGid);
  if (!productId) return [];

  const { shopDomain, publicToken } = JUDGEME_CONFIG;
  if (!shopDomain || !publicToken || shopDomain.includes('YOUR_SHOP_DOMAIN') || publicToken.includes('YOUR_PUBLIC_TOKEN')) {
    // Misconfigured; avoid network call
    return [];
  }

  const url = `https://judge.me/api/v1/reviews?shop_domain=${encodeURIComponent(
    shopDomain,
  )}&api_token=${encodeURIComponent(publicToken)}&product_id=${encodeURIComponent(
    productId,
  )}&per_page=${perPage}&page=${page}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    // API returns { reviews: [...], ... }
    const reviews = Array.isArray(data?.reviews) ? data.reviews : [];
    return reviews.map((r: any) => ({
      id: r.id,
      rating: Number(r.rating) || 0,
      title: r.title ?? null,
      body: r.body ?? null,
      created_at: r.created_at,
      reviewer: r.reviewer ? { id: r.reviewer.id, name: r.reviewer.name, email: r.reviewer.email } : undefined,
    }));
  } catch (e) {
    console.warn('Judge.me fetchProductReviews error:', e);
    return [];
  }
}

export function computeRatingSummary(reviews: JudgeMeReview[]): { average: number; count: number } {
  if (!reviews || reviews.length === 0) return { average: 0, count: 0 };
  const count = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
  const average = Math.round((sum / count) * 10) / 10; // 1 decimal place
  return { average, count };
}
