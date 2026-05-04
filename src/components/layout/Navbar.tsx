"use client";

import * as React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/uiStore";

export function Navbar() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-primary tracking-tight">Algorise</span>
            <span className="hidden md:inline-block text-xs text-muted-foreground ml-2">Visualize, Learn, Master Algorithms</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Share">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
