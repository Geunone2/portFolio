import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import type {ContentProps} from "../../types/types.ts";
import {FaArrowLeft} from "react-icons/fa";

export default function SkillsContent({isVisible, onBack}: ContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        const sections = containerRef.current.querySelectorAll('.skill-section');

        gsap.fromTo(
            sections,
            {x: 50, opacity: 0},
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out"
            }
        );
    }, [isVisible]);

    const skillsData = {
        "Front-end": [
            [
                {name: "HTML5", icon: "html5"},
                {name: "JavaScript", icon: "javascript"},
                {name: "TypeScript", icon: "typescript"},
            ],
            [
                {name: "React.js", icon: "react"},
                {name: "Next.js", icon: "next"},
                {name: "Three.js", icon: "three"},
            ],
            [

                {name: "CSS3", icon: "css3"},
                {name: "TailwindCSS", icon: "tailwindcss"},
            ],
            [
                {name: "React Query", icon: "reactquery"},
                {name: "Recoil", icon: "recoil"},
            ],
        ],
        "Collaboration & Tools": [
            [
                {name: "webstorm", icon: "webstorm"},
            ],
            [
                {name: "Figma", icon: "figma"},
            ],
            [
                {name: "Git", icon: "git"},
                {name: "Github", icon: "github"},
            ],
            [
                {name: "Notion", icon: "notion"},
                {name: "Discord", icon: "discord"},
            ],
        ]
    };

    return (
        <div
            className={`fixed top-0 right-0 w-1/2 h-screen flex items-center justify-center pointer-events-none z-10 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                ref={containerRef}
                className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl max-w-2xl w-full mx-8 relative pointer-events-none"
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
                <h2 className="text-3xl font-bold text-purple-400 mb-6 text-start">
                    Tech Stacks
                </h2>

                {/* 스킬 섹션들 */}
                <div className="space-y-6">
                    {Object.entries(skillsData).map(([category, groups]) => (
                        <div key={category} className="skill-section">
                            {/* 카테고리 제목 */}
                            <h3 className="text-lg text-start font-semibold text-purple-400 mb-3">
                                {category}
                            </h3>

                            {/* 그룹별로 나누어 표시 */}
                            <div className="space-y-2">
                                {groups.map((group, groupIndex) => (
                                    <div key={groupIndex} className="flex flex-wrap gap-2">
                                        {group.map((skill) => (
                                            <div
                                                key={skill.name}
                                                className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all group"
                                            >
                                                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                                    <img
                                                        src={`/assets/skills/${skill.icon}.svg`}
                                                        alt={skill.name}
                                                        className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <p className="text-black text-sm font-medium whitespace-nowrap">
                                                    {skill.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}