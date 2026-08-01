import { Suspense } from "react";
import { RunClient } from "./RunClient";

export default function RunPage() {
  return (
    <Suspense fallback={null}>
      <RunClient />
    </Suspense>
  );
}
