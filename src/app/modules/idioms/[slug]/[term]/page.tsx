import { IdiomDetailClient } from "./IdiomDetailClient";

export default async function IdiomDetailPage({ params }: { params: Promise<{ slug: string; term: string }> }) {
  const { slug, term } = await params;
  return <IdiomDetailClient slug={slug} termSlug={term} />;
}
