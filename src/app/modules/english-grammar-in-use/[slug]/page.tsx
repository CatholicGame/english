import { UnitClient } from "./UnitClient";

export default async function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <UnitClient moduleSlug="english-grammar-in-use" slug={slug} />;
}
