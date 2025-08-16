import { Category } from "@/payload-types";
import Link from "next/link";

interface SubcategoryMenuProps {
  category: Category;
  open: boolean;
  position: { top: number; left: number };
}

export const SubcategoryMenu = ({
  category,
  open,
  position,
}: SubcategoryMenuProps) => {
  if (!open || !category.subcategories || category.subcategories.length === 0) {
    return null;
  }
  const bgColor = category.color || "#f5f5f5";
  return (
    <div
      className="fixed z-50 "
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="h-3 w-60" />
      <div
        style={{
          backgroundColor: bgColor,
        }}
        className="w-60 to-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px] "
      >
        <div>
          {category.subcategories.map((subcategory: Category) => (
            <Link
              href={`/search?subcategory=${subcategory.slug}`}
              key={subcategory.id}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
