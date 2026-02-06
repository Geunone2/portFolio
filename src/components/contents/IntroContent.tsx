import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { ContentProps } from "../../types/types.ts";
import { FaUser, FaBirthdayCake, FaBrain, FaPhone, FaEnvelope, FaGraduationCap, FaArrowLeft } from "react-icons/fa";

export default function IntroContent({ isVisible, onBack }: ContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        const items = containerRef.current.querySelectorAll('.intro-item');

        gsap.fromTo(
            items,
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            }
        );
    }, [isVisible]);

    const infoData = [
        { icon: FaUser, label: "이름", value: "박근원" },
        { icon: FaBirthdayCake, label: "생년월일", value: "2000.11.08" },
        { icon: FaBrain, label: "MBTI", value: "ISTJ" },
        { icon: FaPhone, label: "연락처", value: "010-3099-4426" },
        { icon: FaEnvelope, label: "이메일", value: "rmsdnjsaos@email.com" },
        { icon: FaGraduationCap, label: "학력", value: "한밭대학교 정보통신공학과" },
    ];

    return (
        <div
            className={`fixed top-0 right-0 w-1/2 h-screen flex items-center justify-center pointer-events-none z-10 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                ref={containerRef}
                className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl max-w-2xl w-full mx-8 relative pointer-events-auto"
            >
                {/* 뒤로가기 버튼 - 우측 상단 */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-purple-400/20 hover:bg-purple-400 rounded-full border border-purple-400/50 text-purple-400 transition-all group"
                    >
                        <FaArrowLeft className="text-lg group-hover:scale-110 transition-transform" />
                    </button>
                )}

                {/* 제목 */}
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    About Me
                </h2>

                {/* 정보 리스트 - 2x3 그리드 */}
                <div className="grid grid-cols-2 gap-4">
                    {infoData.map((item, index) => (
                        <div
                            key={index}
                            className="intro-item flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                        >
                            <div className="w-10 h-10 flex items-center justify-center bg-linear-to-br from-purple-400/30 to-pink-500/30 rounded-lg shrink-0">
                                <item.icon className="text-black text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-600 font-bold text-xs mb-1">{item.label}</p>
                                <p className="text-white text-sm font-medium truncate">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}