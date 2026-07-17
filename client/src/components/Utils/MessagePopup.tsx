import { useEffect, useState } from 'react';

type MessageType = 'success' | 'error' | 'warning' | 'info';

interface MessagePopupProps {
    subject: string;
    body: string;
    messageType: MessageType;
    popupSeconds?: number;
    onClose?: () => void;
}

export const MessagePopup = ({ 
    subject, 
    body, 
    messageType, 
    popupSeconds = 5,
    onClose 
}: MessagePopupProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (popupSeconds && popupSeconds > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, popupSeconds * 1000);
            return () => clearTimeout(timer);
        }
    }, [popupSeconds, onClose]);

    if (!isVisible) return null;

    const typeConfig = {
        success: {
            icon: '✓',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            textColor: 'text-green-900',
            labelColor: 'text-green-600',
            badgeBg: 'bg-green-500',
            progressColor: 'bg-green-500',
        },
        error: {
            icon: '✕',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            textColor: 'text-red-900',
            labelColor: 'text-red-600',
            badgeBg: 'bg-red-500',
            progressColor: 'bg-red-500',
        },
        warning: {
            icon: '!',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            textColor: 'text-yellow-900',
            labelColor: 'text-yellow-600',
            badgeBg: 'bg-yellow-500',
            progressColor: 'bg-yellow-500',
        },
        info: {
            icon: 'ⓘ',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-900',
            labelColor: 'text-blue-600',
            badgeBg: 'bg-blue-500',
            progressColor: 'bg-blue-500',
        },
    };

    const config = typeConfig[messageType];

    return (
        <div className="fixed top-6 right-6 z-40 animate-slideDown max-w-sm">
            <div className={`${config.bgColor} border ${config.borderColor} rounded-xl shadow-lg overflow-hidden`}>
                {/* Header with Icon and Close Button */}
                <div className="flex items-start gap-4 p-4">
                    {/* Icon Badge */}
                    <div className={`${config.badgeBg} text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg`}>
                        {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className={`${config.labelColor} font-bold text-sm uppercase tracking-wide mb-1`}>
                            {subject}
                        </h3>
                        <p className={`${config.textColor} text-sm leading-relaxed`}>
                            {body}
                        </p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            onClose?.();
                        }}
                        className={`${config.labelColor} hover:opacity-70 transition-opacity flex-shrink-0 p-1`}
                        aria-label="Close message"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Progress Bar */}
                {popupSeconds && popupSeconds > 0 && (
                    <div className={`h-1 ${config.progressColor} animate-shrinkWidth`}></div>
                )}
            </div>

            {/* Animations */}
            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes shrinkWidth {
                    from {
                        width: 100%;
                    }
                    to {
                        width: 0%;
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                .animate-shrinkWidth {
                    animation: shrinkWidth linear;
                    animation-duration: ${popupSeconds}s;
                }
            `}</style>
        </div>
    );
};