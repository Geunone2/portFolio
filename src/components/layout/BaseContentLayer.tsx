import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {FaArrowLeft} from "react-icons/fa";
import type {BaseContentLayoutProps} from "../../types";

export default function BaseContentLayout({
                                              isVisible,
                                              onBack,
                                              children,
                                              animationSelector = '.animate-item',
                                              width = 'half',
                                              position = 'center',
                                              stagger = 0.1
                                          }: BaseContentLayoutProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // GSAP 애니메이션
    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        const elements = containerRef.current.querySelectorAll(animationSelector);

        gsap.fromTo(
            elements,
            {y: 30, opacity: 0},
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger,
                ease: "power2.out"
            }
        );
    }, [isVisible, animationSelector, stagger]);

    // 너비 클래스 결정
    const widthClass = {
        'quarter': 'w-1/4',
        'half': 'w-1/2',
        'two-thirds': 'w-2/3',
        'three-quarters': 'w-3/4',
        'full': 'w-full'
    }[width];

    const positionClass = {
        'left': 'left-0',
        'center': 'left-1/2 -translate-x-1/2',
        'right': 'right-0'
    }[position]

    return (
        <div
            className={`fixed top-0 right-0 ${positionClass} ${widthClass} h-screen flex items-center justify-center pointer-events-none z-10 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                ref={containerRef}
                className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl max-w-2xl w-full mx-8 relative pointer-events-auto"
            >
                {/* 뒤로가기 버튼 */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-purple-400/20 hover:bg-purple-400/40 rounded-full border border-purple-400/50 text-purple-400 transition-all group z-10 pointer-events-auto"
                    >
                        <FaArrowLeft className="text-lg group-hover:scale-110 transition-transform"/>
                    </button>
                )}

                {/* 자식 컨텐츠 */}
                {children}
            </div>
        </div>
    );
}