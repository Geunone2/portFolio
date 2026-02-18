import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import { FaDesktop } from "react-icons/fa";
import type {ContentProps} from "../../types";

export default function DefaultContent({isVisible}: ContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollDotRef = useRef<SVGCircleElement>(null);
    const clickCircleRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        // 제목과 가이드 순차 등장 애니메이션
        const elements = containerRef.current.querySelectorAll('.fade-in-element');
        gsap.fromTo(
            elements,
            {y: 30, opacity: 0},
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            }
        );

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
            ref={containerRef}
            className={`fixed inset-0 flex flex-col justify-between pointer-events-none z-10 transition-opacity duration-500 bg-black/40 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* 상단 - 포트폴리오 소개 */}
            <div className="fade-in-element flex flex-col items-center justify-center flex-1 px-6">
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">
                    안녕하세요.<br/>
                    <span className="text-purple-400 font-semibold">프론트엔드 개발자 박근원</span>입니다.
                </h1>
                <div
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30">
                    <FaDesktop className="text-purple-400 text-lg"/>
                    <p className="text-sm text-purple-200">
                        최적의 경험을 위해 <span className="font-bold">PC 환경</span>을 권장합니다
                    </p>
                </div>
            </div>

            {/* 하단 - 통합 가이드 */}
            <div className="fade-in-element pb-20 flex justify-center px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                    {/* 스크롤 가이드 */}
                    <div
                        className="flex flex-col items-center gap-3 px-6 py-5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
                        <div className="w-12 h-12 flex items-center justify-center text-purple-400">
                            <svg width="40" height="60" viewBox="0 0 40 60">
                                <rect x="10" y="10" width="20" height="40" rx="10"
                                      fill="none" stroke="currentColor" strokeWidth="2"/>
                                <circle ref={scrollDotRef} cx="20" cy="20" r="3" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold">스크롤</h3>
                        <p className="text-sm text-gray-300 text-center">
                            마우스 휠을 사용하여<br/>섹션 간 순차적으로 이동
                        </p>
                    </div>

                    {/* 클릭 가이드 */}
                    <div
                        className="flex flex-col items-center gap-3 px-6 py-5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
                        <div className="w-12 h-12 flex items-center justify-center text-purple-400">
                            <svg width="40" height="60" viewBox="0 0 40 60">
                                <circle
                                    ref={clickCircleRef}
                                    cx="20" cy="30" r="8"
                                    fill="none" stroke="currentColor" strokeWidth="2"
                                />
                                <circle cx="20" cy="30" r="3" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold">클릭</h3>
                        <p className="text-sm text-gray-300 text-center">
                            3D 오브젝트를 클릭하여<br/>원하는 섹션으로 바로 이동
                        </p>
                    </div>

                    {/* 네비게이션 가이드 */}
                    <div
                        className="flex flex-col items-center gap-3 px-6 py-5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
                        <div className="w-12 h-12 flex items-center justify-center text-purple-400">
                            <svg width="40" height="60" viewBox="0 0 40 60">
                                <rect x="8" y="20" width="24" height="20" rx="2" fill="none" stroke="currentColor"
                                      strokeWidth="2"/>
                                <line x1="8" y1="26" x2="32" y2="26" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="14" cy="23" r="1.5" fill="currentColor"/>
                                <circle cx="20" cy="23" r="1.5" fill="currentColor"/>
                                <circle cx="26" cy="23" r="1.5" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold">네비게이션</h3>
                        <p className="text-sm text-gray-300 text-center">
                            상단 메뉴를 통해<br/>카테고리별로 빠르게 접근
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}