import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from 'react-router-dom';
import { GiAbstract010 } from "react-icons/gi";
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function GuestLayout({ children }) {
    const [isInteracting, setIsInteracting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleClick = (event) => {
            const formContainer = event.target.closest('.form-container');
            const isFormElement = event.target.matches('input, textarea, button, select') ||
                                event.target.closest('input, textarea, button, select');

            if (isFormElement || formContainer) {
                setIsInteracting(true);
            } else {
                setIsInteracting(false);
            }
        };

        const handleMouseMove = (event) => {
            setMousePosition({
                x: (event.clientX / window.innerWidth - 0.5) * 20,
                y: (event.clientY / window.innerHeight - 0.5) * 20
            });
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 pt-8 px-4 sm:justify-center sm:pt-0 overflow-hidden relative">
            {/* Background overlay for image */}
            <div className="absolute inset-0 bg-[url('/storage/images/amms-2.png')] bg-cover bg-center bg-no-repeat opacity-30"></div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-80 sm:h-80 bg-blue-400/25 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-60 h-60 sm:w-96 sm:h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div
                className={`flex w-full flex-col items-center transition-all duration-1000 ease-out transform-gpu relative z-10 max-w-xs sm:max-w-sm md:max-w-md ${
                    isInteracting ? 'scale-105' : 'scale-100'
                }`}
                style={{
                    transform: `translateY(${mousePosition.y * 0.1}px) translateX(${mousePosition.x * 0.1}px) ${isInteracting ? 'scale(1.05)' : 'scale(1)'}`
                }}
            >
                <div
                    className={`transition-all duration-700 delay-200 transform-gpu ${
                        isInteracting ? 'rotate-0 scale-110' : 'rotate-12 scale-100'
                    }`}
                    style={{
                        transform: `rotate(${isInteracting ? 0 : 12}deg) scale(${isInteracting ? 1.1 : 1}) translateY(${mousePosition.y * 0.05}px)`
                    }}
                >
                    <Link href="/">
                        <GiAbstract010 className={`h-16 w-16 sm:h-20 sm:w-20 fill-current transition-all duration-500 delay-300 drop-shadow-2xl ${
                            isInteracting ? 'text-cyan-300 animate-bounce' : 'text-blue-100'
                        }`} />
                    </Link>
                </div>

                <div
                    className={`form-container mt-4 sm:mt-6 w-full overflow-hidden transition-all duration-1000 delay-100 transform-gpu backdrop-blur-2xl bg-white/10 border-2 border-white/40 shadow-2xl ${
                        isInteracting
                            ? 'scale-105 shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-white/20 border-white/60'
                            : 'scale-100 shadow-[0_10px_40px_rgba(0,0,0,0.3)] bg-white/10 border-white/30'
                    } rounded-3xl`}
                    style={{
                        transform: `translateY(${mousePosition.y * 0.02}px) translateX(${mousePosition.x * 0.02}px) ${isInteracting ? 'scale(1.05)' : 'scale(1)'}`
                    }}
                >
                    <div className="px-6 py-4 sm:px-8 sm:py-6 relative">
                        {/* Subtle inner glow effect */}
                        <div className={`absolute inset-0 rounded-3xl transition-opacity duration-1000 ${
                            isInteracting ? 'opacity-100' : 'opacity-50'
                        } bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-indigo-900/10`}></div>

                        <div className="relative z-10">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-right"/>
        </div>
    );
}
