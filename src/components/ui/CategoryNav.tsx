import type {CategoryType} from "../../utils/categoryCamera.ts";

interface CategoryNavProps {
    onCategoryClick: (category: CategoryType) => void;
    currentCategory?: CategoryType;
}

export default function CategoryNav({onCategoryClick, currentCategory}: CategoryNavProps) {
    const categories: { id: CategoryType; label: string }[] = [
        {id: "default", label: "처음으로"},
        {id: "intro", label: "자기소개"},
        {id: "project", label: "프로젝트"},
        {id: "contact", label: "컨택트"},
    ];

    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="flex gap-4 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryClick(category.id)}
                        className={`px-4 py-2 rounded-full transition-all ${
                            currentCategory === category.id
                                ? 'bg-white text-black'
                                : 'text-white hover:bg-white/20'
                        }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>
        </nav>
    )
}