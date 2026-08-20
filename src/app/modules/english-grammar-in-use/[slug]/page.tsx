import { UnitClient } from "./UnitClient";

export default async function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <UnitClient slug={slug} />;
}
