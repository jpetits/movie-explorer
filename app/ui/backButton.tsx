"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button aria-label="Go back" onClick={() => router.back()}>
      ← Back
    </button>
  );
}
