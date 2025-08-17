import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoriesGetManyOutput } from "@/module/categories/types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CategoriesSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const CategoriesSidebar = ({
  open,
  onOpenChange,
}: CategoriesSidebarProps) => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());

  const router = useRouter();
  const [parentCategory, setParentCategory] =
    useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoriesGetManyOutput[1] | null
  >(null);

  const currentCategories = parentCategory ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setParentCategory(null);
      setSelectedCategory(null);
    }
    onOpenChange(open);
  };

  function handleCategoryClick(category: CategoriesGetManyOutput[1]): void {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategory(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(category);
    } else {
      if (parentCategory && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  }

  const handleBackClick = () => {
    if (parentCategory) {
      setParentCategory(null);
      setSelectedCategory(null);
    } else {
      handleOpenChange(false);
    }
  };

  const backgroundColor = selectedCategory?.color || "white";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategory && (
            <button
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={handleBackClick}
            >
              <ChevronLeftIcon className="side-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              onClick={() => handleCategoryClick(category)}
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="ml-auto" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
