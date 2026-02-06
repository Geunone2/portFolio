import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import type {ContentProps} from "../../types/types.ts";
import {FaArrowLeft, FaEnvelope, FaGithub, FaMedium} from "react-icons/fa";

export default function ContactContent({isVisible, onBack}: ContentProps) {
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
                stagger: 0.15,
                ease: "power2.out"
            }
        );
    }, [isVisible]);

    const contactData = [
        {
            icon: FaEnvelope,
            label: "Email",
            value: "rmsdnjsaos@gmail.com",
            link: "mailto:rmsdnjsaos@gmail.com",
            color: "text-[#EA4335]"
        },
        {
            icon: FaGithub,
            label: "GitHub",
            value: "github.com/geunone2",
            link: "https://github.com/geunone2",
        },
        {
            icon: FaMedium,
            label: "Blog",
            value: "medium.com/@rmsdnjsaos",
            link: "https://medium.com/@rmsdnjsaos",
        }
    ];

    return (
        <div
            className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-10 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                ref={containerRef}
                className="p-10 max-w-3xl w-full mx-8 relative pointer-events-auto"
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

                {/* 제목 */}
                <h2 className="animate-item text-4xl font-bold -mt-5 text-black text-start">
                    Contact Me
                </h2>

                <div className="animate-item mb-2 pt-6 border-t border-white/10">
                    <p className="text-black text-xl font-semibold text-start leading-relaxed">
                        궁금한 점이 있으시다면 언제든지 연락주세요! 🚀
                    </p>
                </div>

                {/* 연락처 정보 */}
                <div className="space-y-5">
                    {contactData.map((contact, index) => (
                        <a
                            key={index}
                            href={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="animate-item flex items-center gap-5 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all group"
                        >
                            <div
                                className={`w-14 h-14 flex items-center justify-center bg-white/10 rounded-xl ${contact.color}`}>
                                <contact.icon className="text-2xl"/>
                            </div>
                            <div className="flex-1 text-start">
                                <p className="text-gray-400 text-sm mb-1">{contact.label}</p>
                                <p className="text-black text-base font-medium group-hover:text-purple-300 transition-colors">
                                    {contact.value}
                                </p>
                            </div>
                            <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                →
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
        ;
}