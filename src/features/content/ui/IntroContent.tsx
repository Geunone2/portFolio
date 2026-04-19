import type { ContentProps } from '../../../shared/types';
import BaseContentLayout from '../../../shared/ui/BaseContentLayer';
import { INFO_DATA } from '../../../entities/profile';

export default function IntroContent({ isVisible, onBack }: ContentProps) {
    return (
        <BaseContentLayout
            isVisible={isVisible}
            onBack={onBack}
            animationSelector=".intro-item"
            width="half"
            position="right"
        >
            <h2 className="text-3xl font-bold text-purple-400 mb-6 -mt-2 text-center animate-item">
                About Me
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {INFO_DATA.map((info, index) => (
                    <div
                        key={index}
                        className="intro-item flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all h-full break-all"
                    >
                        <div className="w-12 h-12 flex items-center justify-center bg-purple-400/20 rounded-full text-purple-400 shrink-0">
                            <info.icon className="text-xl" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-black font-semibold mb-1">{info.label}</p>
                            <p className="text-white font-medium">{info.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </BaseContentLayout>
    );
}
