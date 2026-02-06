import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import type {ContentProps} from "../../types/types.ts";

export default function DefaultContent({isVisible}: ContentProps) {
    const scrollDotRef = useRef<SVGCircleElement>(null);
    const clickCircleRef = useRef<SVGCircleElement>(null);
    const clickDotRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        if (!isVisible) return;

        // 스크롤 애니메이션
        if (scrollDotRef.current) {
            gsap.to(scrollDotRef.current, {
                attr: {cy: 35},
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }

        // 클릭 애니메이션 (펄스 효과)
        if (clickCircleRef.current) {
            gsap.to(clickCircleRef.current, {
                attr: {r: 11},
                opacity: 0.5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }

    }, [isVisible]);

    return (
        <div
            className={`fixed bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-10 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 md:px-10 py-5 md:py-6 bg-black/60 backdrop-blur-md rounded-3xl md:rounded-full border border-white/10">
                {/* 스크롤 가이드 */}
                <div className="flex md:flex-col items-center gap-3 text-white">
                    <div className="w-12 h-12 flex items-center justify-center text-purple-400 shrink-0">
                        <svg width="40" height="60" viewBox="0 0 40 60">
                            <rect x="10" y="10" width="20" height="40" rx="10"
                                  fill="none" stroke="currentColor" strokeWidth="2"/>
                            <circle ref={scrollDotRef} cx="20" cy="20" r="3" fill="currentColor"/>
                        </svg>
                    </div>
                    <p className="text-sm text-gray-300 whitespace-nowrap md:text-center">스크롤하여 섹션 이동</p>
                </div>

                {/* 클릭 가이드 */}
                <div className="flex md:flex-col items-center gap-3 text-white">
                    <div className="w-12 h-12 flex items-center justify-center text-purple-400 shrink-0">
                        <svg width="40" height="60" viewBox="0 0 40 60">
                            <circle
                                ref={clickCircleRef}
                                cx="20" cy="30" r="8"
                                fill="none" stroke="currentColor" strokeWidth="2"
                            />
                            <circle ref={clickDotRef} cx="20" cy="30" r="3" fill="currentColor"/>
                        </svg>
                    </div>
                    <p className="text-sm text-gray-300 whitespace-nowrap md:text-center">오브젝트 클릭하여 섹션 이동</p>
                </div>

                {/* 네비게이션 가이드 */}
                <div className="flex md:flex-col items-center gap-3 text-white">
                    <div className="w-14 h-14 flex items-center justify-center text-purple-400">
                        <svg width="40" height="60" viewBox="0 0 40 60">
                            <rect x="8" y="20" width="24" height="20" rx="2" fill="none" stroke="currentColor"
                                  strokeWidth="2"/>
                            <line x1="8" y1="26" x2="32" y2="26" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="14" cy="23" r="1.5" fill="currentColor"/>
                            <circle cx="20" cy="23" r="1.5" fill="currentColor"/>
                            <circle cx="26" cy="23" r="1.5" fill="currentColor"/>
                        </svg>
                    </div>
                    <p className="text-sm text-gray-300 whitespace-nowrap md:text-center">카테고리로 바로 이동</p>
                </div>
            </div>
        </div>
    );
}