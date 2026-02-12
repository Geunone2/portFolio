import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import type {LoadingState} from "../../types";

export default function LoadingScreen({progress, isComplete, onEnter}: LoadingState) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (progressBarRef.current && percentRef.current) {
            gsap.to(progressBarRef.current, {
                width: `${progress}%`,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(percentRef.current, {
                textContent: Math.round(progress),
                duration: 0.3,
                snap: {textContent: 1},
                ease: "power2.out"
            });
        }
    }, [progress]);

    useEffect(() => {
        if (isComplete && buttonRef.current) {
            gsap.fromTo(
                buttonRef.current,
                {y: 20, opacity: 0},
                {y: 0, opacity: 1, duration: 0.8, ease: "power2.out"}
            );
        }
    }, [isComplete]);

    const handleEnter = () => {
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: onEnter
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black z-9999 flex flex-col items-center justify-center"
        >
            {/* 로고 또는 제목 */}
            <div className="mb-12 text-center">
                <h1 className="text-5xl text-purple-400 text-center leading-relaxed">
                    GeunWon's PortFolio
                </h1>
                <h2 className="text-4xl text-center text-white leading-relaxed">3D 인터랙티브 포트폴리오에 오신 것을 환영합니다.</h2>
            </div>

            {/* 프로그레스 바 */}
            <div className="w-80 mb-6">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        ref={progressBarRef}
                        className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{width: '0%'}}
                    />
                </div>
            </div>

            {/* 퍼센트 표시 */}
            <div className="flex items-center gap-2 mb-8">
                <span
                    ref={percentRef}
                    className="text-3xl font-bold text-purple-400"
                >
                    0
                </span>
                <span className="text-2xl text-gray-400">%</span>
            </div>

            {/* 로딩 애니메이션 점들 */}
            {!isComplete && (
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"
                         style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"
                         style={{animationDelay: '0.4s'}}></div>
                </div>
            )}

            {/* 들어가기 버튼 */}
            {isComplete && (
                <button
                    ref={buttonRef}
                    onClick={handleEnter}
                    className="px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full text-white font-semibold text-lg transition-all transform hover:scale-105 opacity-0 pointer-events-auto"
                >
                    들어가기
                </button>
            )}
        </div>
    );
}