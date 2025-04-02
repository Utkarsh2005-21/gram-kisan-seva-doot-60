
import React from "react";
import { Button } from "@/components/ui/button";

interface IssueCategoryProps {
  categories: { id: string; label: string }[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const IssueCategories: React.FC<IssueCategoryProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-6">
      <label className="form-label">Issue Category</label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            type="button"
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`h-auto py-2 px-3 justify-start text-sm ${
              selectedCategory === category.id ? "bg-app-green text-white" : ""
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default IssueCategories;
