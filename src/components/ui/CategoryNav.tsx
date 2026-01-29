import type {CategoryType} from "../../utils/categoryCamera.ts";

interface CategoryNavProps {
    onCategoryClick: (category: CategoryType) => void;
    currentCategory?: CategoryType;
    currentIndex?: number;
}

export default function CategoryNav({onCategoryClick, currentCategory, currentIndex = 0}: CategoryNavProps) {
    const categories: { id: CategoryType; label: string; number: string }[] = [
        {id: "default", label: "Home", number: "01"},
        {id: "intro", label: "About", number: "02"},
        {id: "project", label: "Works", number: "03"},
        {id: "contact", label: "Contact", number: "04"},
    ];

    const currentNumber = categories.find(count => count.id === currentCategory)?.number || "01";


    return (
        <>
            {/* 상단 네비게이션 - 우측 상단 */}
            <nav className="fixed top-8 right-8 z-10 flex items-center gap-1">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryClick(category.id)}
                        className="group relative px-5 py-3"
                    >
                        <span className={`text-lg font-bold tracking-widest transition-all duration-300 ${
                            currentCategory === category.id
                                ? 'text-white'
                                : 'text-white/30 group-hover:text-white/60'
                        }`}>
                            {category.label}
                        </span>

                        {currentCategory === category.id && (
                            <div className="absolute bottom-0 left-0 w-full h-px bg-white"/>
                        )}
                    </button>
                ))}

                {/* 🔑 현재 카테고리의 숫자 표시 */}
                <div className="text-white font-bold text-base ml-6">
                    {currentNumber}
                </div>
            </nav>

            {/* 하단 프로그레스 바 */}
            <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-10">
                <div
                    className="h-full bg-white transition-all duration-500 ease-out"
                    style={{width: `${((currentIndex + 1) / 6) * 100}%`}}
                />
            </div>
        </>
    )
}