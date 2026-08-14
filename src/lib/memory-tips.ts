import { MEMORY_TIPS } from "@/data/memory-tips";

export function getMemoryTip(key: string): string | undefined {
  return MEMORY_TIPS[key];
}
