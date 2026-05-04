"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";

const categories = [
  {
    name: "Sorting",
    basePath: "/sorting",
    items: [
      { name: "Bubble Sort", slug: "bubble-sort" },
      { name: "Selection Sort", slug: "selection-sort" },
      { name: "Insertion Sort", slug: "insertion-sort" },
      { name: "Merge Sort", slug: "merge-sort" },
      { name: "Quick Sort", slug: "quick-sort" },
      { name: "Heap Sort", slug: "heap-sort" },
      { name: "Counting Sort", slug: "counting-sort" },
      { name: "Radix Sort", slug: "radix-sort" },
      { name: "Bucket Sort", slug: "bucket-sort" },
      { name: "Shell Sort", slug: "shell-sort" },
      { name: "Tim Sort", slug: "tim-sort" },
      { name: "Comb Sort", slug: "comb-sort" },
      { name: "Cycle Sort", slug: "cycle-sort" },
      { name: "Bitonic Sort", slug: "bitonic-sort" },
      { name: "Tree Sort", slug: "tree-sort" },
    ],
  },
  {
    name: "Searching",
    basePath: "/searching",
    items: [
      { name: "Binary Search", slug: "binary-search" },
      { name: "Linear Search", slug: "linear-search" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-64 border-r bg-background/95 backdrop-blur transition-transform duration-300 md:translate-x-0 md:static",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full overflow-y-auto py-4">
        {categories.map((category) => (
          <div key={category.name} className="px-4 py-2">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold tracking-tight">
              {category.name}
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {category.items.map((item) => {
                const href = `${category.basePath}/${item.slug}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={item.slug}
                    href={href}
                    className={cn(
                      "flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                      isActive
                        ? "bg-muted font-medium text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="px-4 py-4">
          <Link
            href="/compare"
            className={cn(
              "flex w-full items-center rounded-md border px-2 py-2 font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === "/compare" ? "bg-accent text-accent-foreground" : ""
            )}
          >
            Compare Algorithms
          </Link>
        </div>
      </div>
    </aside>
  );
}
