import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl mb-6">
        Master Algorithms with <span className="text-primary">Algorise</span>
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground mb-8">
        Visualize, Learn, and Master Algorithms. Explore interactive animations, step-by-step explanations, and real-world code implementations.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/sorting/bubble-sort">
          <Button size="lg" className="font-semibold">
            Start Exploring
          </Button>
        </Link>
        <Link href="/compare">
          <Button size="lg" variant="outline" className="font-semibold">
            Compare Algorithms
          </Button>
        </Link>
      </div>
    </div>
  );
}
