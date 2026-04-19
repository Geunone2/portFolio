import { useState } from "react";
import type { CategoryNavProps, CategoryType } from '../../../shared/types';
import { useDeviceType } from '../../../shared/hooks/useDeviceType';

export default function CategoryNav({ onCategoryClick, currentCategory, currentIndex = 0 }: CategoryNavProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const deviceType = useDeviceType();

    const categories: { id: CategoryType; label: string; number: string }[] = [
        { id: "default", label: "Home", number: "01" },
        { id: "intro", label: "About", number: "02" },
        { id: "skills", label: "Skills", number: "03" },
        { id: "project", label: "Works", number: "04" },
        { id: "contact", label: "Contact", number: "05" },
    ];

    const currentNumber = categories.find(c => c.id === currentCategory)?.number || "01";

    const handleCategoryClick = (categoryId: CategoryType) => {
        onCategoryClick(categoryId);
        setIsMenuOpen(false);
    };

    return (
        <>
            {deviceType !== 'mobile' && (
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
                                <div className="absolute bottom-0 left-0 w-full h-px bg-white" />
                            )}
                        </button>
                    ))}
                    <div className="text-white font-bold text-base ml-6">{currentNumber}</div>
                </nav>
            )}

            {deviceType === 'mobile' && (
                <>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="fixed top-4 right-4 z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
                    >
                        <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>

                    <div className="fixed top-6 left-6 z-50 text-white font-bold text-sm">{currentNumber}</div>

                    {isMenuOpen && (
                        <>
                            <div
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                                onClick={() => setIsMenuOpen(false)}
                            />
                            <nav className="fixed top-0 right-0 w-64 h-screen bg-black/90 backdrop-blur-xl border-l border-white/10 z-40 flex flex-col items-start justify-center gap-6 px-8">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className="group relative w-full text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-purple-400 text-sm font-bold">{category.number}</span>
                                            <span className={`text-xl font-bold tracking-wider transition-all duration-300 ${
                                                currentCategory === category.id
                                                    ? 'text-white'
                                                    : 'text-white/50 group-hover:text-white/80'
                                            }`}>
                                                {category.label}
                                            </span>
                                        </div>
                                        {currentCategory === category.id && (
                                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-400 rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </>
                    )}
                </>
            )}

            <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-10">
                <div
                    className="h-full bg-purple-400 transition-all duration-500 ease-out"
                    style={{ width: `${((currentIndex + 1) / 7) * 100}%` }}
                />
            </div>
        </>
    );
}
