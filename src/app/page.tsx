import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      <Button variant="elevated" size="lg">
        Click Me
      </Button>
      <div>
        <Input placeholder="Type something..." />
      </div>
      <div>
        <Progress value={50} className="w-64" />
      </div>
      <div>
        <Textarea placeholder="Write your thoughts here..." className="w-64" />
      </div>
      <div>
        <Checkbox id="checkbox" className="mr-2" />
        <label htmlFor="checkbox">Check me</label>
      </div>
    </main>
  );
}
