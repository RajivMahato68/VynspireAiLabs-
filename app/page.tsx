import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to MyBlog</h1>
        <p className="text-xl text-muted-foreground">
          A modern blog built with Next.js, TypeScript, Tailwind & shadcn/ui
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border rounded-lg p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">Blog Post {i}</h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor...
            </p>
            <Button variant="link" className="mt-4">
              Read more →
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
