import type {ContentProps} from "../../types";
import BaseContentLayout from "../layout/BaseContentLayer.tsx";
import {CONTACT_DATA} from "../../data/contact.ts";

export default function ContactContent({isVisible, onBack}: ContentProps) {

    return (
        <BaseContentLayout
            isVisible={isVisible}
            onBack={onBack}
            animationSelector=".contact-item"
            width="full"
            position="center"
        >
            {/* 제목 */}
            <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center contact-item">
                Contact
            </h2>

            {/* 연락처 목록 */}
            <div className="space-y-4">
                {CONTACT_DATA.map((contact, index) => (
                    <a
                        key={index}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-item flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-black/10 hover:bg-white/10 hover:border-purple-400/30 transition-all group"
                    >
                        <div
                            className="w-12 h-12 flex items-center justify-center bg-purple-400/20 rounded-full text-purple-400 shrink-0 group-hover:scale-110 transition-transform">
                            <contact.icon className="text-xl"/>
                        </div>
                        <div className="flex-1 text-start">
                            <p className="text-sm text-gray-400 mb-1">{contact.label}</p>
                            <p className="text-black font-medium">{contact.value}</p>
                        </div>
                    </a>
                ))}
            </div>

            {/* 메시지 */
            }
            <p className="contact-item text-center text-gray-400 mt-6">
                언제든지 연락주세요! 🚀
            </p>
        </BaseContentLayout>
    )
        ;
}