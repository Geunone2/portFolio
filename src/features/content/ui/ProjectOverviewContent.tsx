import type { ContentProps } from '../../../shared/types';
import BaseContentLayout from '../../../shared/ui/BaseContentLayer';
import { useDeviceType } from '../../../shared/hooks/useDeviceType';

export default function ProjectOverviewContent({ isVisible, onBack }: ContentProps) {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') {
        return (
            <div
                className={`fixed top-16 left-0 right-0 flex justify-center pointer-events-none z-10 transition-opacity duration-500 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="bg-white/10 backdrop-blur-xl rounded-b-3xl border border-white/20 shadow-2xl w-full mx-4 p-4 relative pointer-events-auto">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-purple-400/20 hover:bg-purple-400/40 rounded-full border border-purple-400/50 text-purple-400 transition-all group z-10"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                    )}

                    <div className="animate-item">
                        <h2 className="text-2xl font-bold text-purple-400 mb-2 text-center">Projects</h2>
                        <p className="text-sm text-gray-300 text-center mb-2">참여한 프로젝트들을 소개합니다.</p>
                    </div>

                    <div className="animate-item p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white text-center text-xs leading-relaxed">
                            액자를 클릭하거나,<br />
                            스크롤로 이동하여<br />
                            프로젝트들을 확인할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <BaseContentLayout
            isVisible={isVisible}
            animationSelector=".animate-item"
            width="quarter"
            position="right"
        >
            <div className="animate-item">
                <h2 className="font-bold text-purple-400 text-center text-3xl mb-2 -mt-2">
                    Projects
                </h2>
                <p className="text-gray-300 text-center tablet:text-base tablet:mb-3 desktop:text-xl desktop:mb-2">
                    참여한 프로젝트들을 소개합니다.
                </p>
            </div>

            <div className="animate-item bg-white/5 rounded-xl border border-white/10 tablet:p-3 desktop:p-4">
                <p className="text-white text-center leading-relaxed tablet:text-xs desktop:text-sm">
                    액자를 클릭하거나,<br />
                    스크롤로 이동하여<br />
                    프로젝트들을 확인할 수 있습니다.
                </p>
            </div>
        </BaseContentLayout>
    );
}
