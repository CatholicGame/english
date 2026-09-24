import { UnitClient } from "../../english-grammar-in-use/[slug]/UnitClient";

export default async function AdvancedUnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <UnitClient moduleSlug="advanced-grammar-in-use" slug={slug} />;
}
