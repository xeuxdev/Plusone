import Layout from "@/components/layout";
import { DollarSignIcon, EyeIcon, FileTextIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <Layout>
      <section className="w-full p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center col-span-1 p-4 rounded-lg bg-muted">
            <FileTextIcon className="w-8 h-8 text-muted-foreground" />
            <h3 className="mt-2 text-2xl font-bold">1,234</h3>
            <p className="text-muted-foreground">Total Posts</p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 p-4 rounded-lg bg-muted">
            <EyeIcon className="w-8 h-8 text-muted-foreground" />
            <h3 className="mt-2 text-2xl font-bold">45,678</h3>
            <p className="text-muted-foreground">Total Views</p>
          </div>

          <div className="flex flex-col items-center justify-center col-span-1 p-4 rounded-lg bg-muted">
            <DollarSignIcon className="w-8 h-8 text-muted-foreground" />
            <h3 className="mt-2 text-2xl font-bold">457</h3>
            <p className="text-muted-foreground">Total Comments</p>
          </div>
        </div>
      </section>

      <section></section>
    </Layout>
  );
}
