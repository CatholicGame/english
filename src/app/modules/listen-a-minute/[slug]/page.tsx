import { LessonClient } from "./LessonClient";

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LessonClient slug={slug} />;
}
