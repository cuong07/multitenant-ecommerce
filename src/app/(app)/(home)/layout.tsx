import { getPayload } from "payload";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import configPromise from "@payload-config";
import { Category } from "@/payload-types";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const categories = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = categories.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((item) => ({
      ...(item as Category),
    })),
  }));

  console.log(formattedData);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <main className="flex-1 bg-[#f4f4f0]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
