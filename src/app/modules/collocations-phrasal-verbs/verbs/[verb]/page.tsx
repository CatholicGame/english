import { VerbDetailClient } from "./VerbDetailClient";

export default async function VerbDetailPage({ params }: { params: Promise<{ verb: string }> }) {
  const { verb } = await params;
  return <VerbDetailClient slug={verb} />;
}
