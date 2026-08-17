import { UnitClient } from "./UnitClient";

export default async function IdiomUnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <UnitClient slug={slug} />;
}
