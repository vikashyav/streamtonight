import React from "react";
// import Layout from "@/components/Layout";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="w-full h-full flex items-center flex-col">
      <h1 className="text-[64]">404</h1>
        <h2>The content you are looking for is not available at the moment</h2>
        <Link href="/" legacyBehavior>
        <h3 className="cursor-pointer underline">
            Continue Watching..
          </h3>
        </Link>
      </div>
  );
}
