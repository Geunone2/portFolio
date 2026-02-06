import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import type {ContentProps} from "../../types/types.ts";
import {FaArrowLeft} from "react-icons/fa";

export default function ProjectOverviewContent({isVisible, onBack}: ContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        const title = containerRef.current.querySelector('.overview-title');
        const description = containerRef.current.querySelector('.overview-description');

        gsap.fromTo(
            [title, description],
            {y: 30, opacity: 0},
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            }
        );
    }, [isVisible]);

    return (
        <div
            className={`fixed top-0 right-0 w-1/3 h-screen flex items-center justify-center pointer-events-none z-10 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                ref={containerRef}
                className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-10 shadow-2xl max-w-3xl w-full mx-8 relative pointer-events-auto"
            >
                {/* 뒤로가기 버튼 - 우측 상단 */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-purple-400/20 hover:bg-purple-400/40 rounded-full border border-purple-400/50 text-purple-400 transition-all group z-10"
                    >
                        <FaArrowLeft className="text-lg group-hover:scale-110 transition-transform"/>
                    </button>
                )}

                {/* 제목 */}
                <h2 className="overview-title text-4xl font-bold text-purple-400 mb-6 text-center">
                    Projects
                </h2>

                {/* 설명 */}
                <div className="overview-description space-y-4 text-center">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        다음은 제가 지금까지 작업한 프로젝트들입니다.
                    </p>
                    <p className="text-black text-base leading-relaxed">
                        앞으로 프로젝트가 생길수록 해당 벽면 액자에 추가될 예정입니다.
                    </p>
                    <div className="pt-4">
                        <div
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 rounded-full border border-purple-400/30">
                            <span className="text-purple-300 text-sm font-medium">
                                프로젝트 클릭하면 프로젝트로 이동합니다
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}