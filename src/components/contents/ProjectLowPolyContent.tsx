import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import type {ContentProps} from "../../types/types.ts";
import {FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCalendarAlt} from "react-icons/fa";

export default function ProjectLowPolyContent({isVisible, onBack}: ContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        const elements = containerRef.current.querySelectorAll('.animate-item');

        gsap.fromTo(
            elements,
            {y: 30, opacity: 0},
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            }
        );
    }, [isVisible]);

    const projectData = {
        name: "LowPoly Island",
        period: "2025.11 - 2026.01",
        github: "https://github.com/Geunone2/three-lowpoly",
        demo: "https://three-lowpoly.vercel.app/",
        techStack: ["React", "JavaScript", "Three", "CSS3", "GSAP"],
        description: "Low Poly는 3D 웹 프로젝트로, Three.js를 활용하여 인터랙티브한 로우폴리 3D 아일랜드를 구현했습니다.",
        features: [
            "Three.js 기반 3D 씬 렌더링",
            "GLTF 모델 로딩 및 애니메이션",
            "지역별 카메라 전환 및 부드러운 애니메이션",
            "실시간 날씨 / 시간 효과 구현",
            "인터랙티브 UI 구현"
        ]
    };

    return (
        <div
            className={`fixed top-0 left-0 -mx-12 w-2/3 h-screen flex items-center justify-center pointer-events-none z-10 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                ref={containerRef}
                className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl max-w-4xl w-full relative pointer-events-auto max-h-[85vh] overflow-y-auto"
            >
                {/* 뒤로가기 버튼 */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-purple-400/20 hover:bg-purple-400/40 rounded-full border border-purple-400/50 text-purple-400 transition-all group z-10"
                    >
                        <FaArrowLeft className="text-lg group-hover:scale-110 transition-transform"/>
                    </button>
                )}

                {/* 프로젝트 이름 & 작업기간 */}
                <div className="animate-item mb-6">
                    <h2 className="text-3xl font-bold text-start text-white mb-2">
                        {projectData.name}
                    </h2>
                    <div className="flex items-center gap-2 text-black">
                        <FaCalendarAlt className="text-sm"/>
                        <span className="text-sm">{projectData.period}</span>
                    </div>
                </div>

                {/* 링크 버튼 */}
                <div className="animate-item flex gap-3 mb-6">
                    <a
                        href={projectData.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border
                    border-white/20 text-white transition-all"
                    >
                        <FaGithub className="text-lg"/>
                        <span className="text-sm font-medium">GitHub</span>
                    </a>
                    <a
                        href={projectData.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border
                border-purple-400/30 text-white transition-all"
                    >
                        <FaExternalLinkAlt className="text-sm"/>
                        <span className="text-sm font-medium">Live Demo</span>
                    </a>
                </div>

                {/* 기술 스택 */
                }
                <div className="animate-item mb-6">
                    <h3 className="text-lg text-start font-semibold text-purple-400 mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {projectData.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-black text-xs font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 프로젝트 설명 */
                }
                <div className="animate-item mb-6">
                    <h3 className="text-lg font-semibold text-start text-purple-400 mb-3">Description</h3>

                    <p className="text-black text-start text-sm leading-relaxed">
                        <span className="text-purple-400 mt-1 mr-2">•</span>
                        {projectData.description}
                    </p>
                </div>

                {/* 주요 기능 */
                }
                <div className="animate-item">
                    <h3 className="text-lg font-semibold text-start text-purple-400 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                        {projectData.features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-black text-sm"
                            >
                                <span className="text-purple-400">•</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
        ;
}