import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CustomCategory } from "../type";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoriesSidebarProps {
  open: boolean;
  data: CustomCategory[];
  onOpenChange: (open: boolean) => void;
}
export const CategoriesSidebar = ({
  open,
  onOpenChange,
  data,
}: CategoriesSidebarProps) => {
  const router = useRouter();
  const [parentCategory, setParentCategory] = useState<CustomCategory[] | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);

  const currentCategories = parentCategory ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setParentCategory(null);
      setSelectedCategory(null);
    }
    onOpenChange(open);
  };

  function handleCategoryClick(category: CustomCategory): void {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategory(category.subcategories as CustomCategory[]);
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
