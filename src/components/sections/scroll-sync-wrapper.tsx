'use client'

import { useEffect, useRef } from "react"

interface ScrollSyncWrapperProps {
    article: React.ReactNode
    sidebar: React.ReactNode
}

export function ScrollSyncWrapper({ article, sidebar }: ScrollSyncWrapperProps) {
    const articleRef = useRef<HTMLElement>(null)
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (articleRef.current && navRef.current) {
                // Calcula a posição do scroll em relação ao viewport
                const viewportHeight = window.innerHeight
                const articleTop = articleRef.current.getBoundingClientRect().top
                const articleHeight = articleRef.current.scrollHeight
                
                // Calcula uma porcentagem de scroll mais agressiva
                // Isso fará com que a navbar chegue ao final mais rapidamente
                const scrollProgress = Math.abs(articleTop) / (articleHeight * 1.5)
                const normalizedProgress = Math.min(Math.max(scrollProgress, 0), 1)
                
                // Aplica o scroll à navbar
                if (navRef.current.scrollHeight > navRef.current.clientHeight) {
                    const maxNavScroll = navRef.current.scrollHeight - navRef.current.clientHeight
                    navRef.current.scrollTop = maxNavScroll * normalizedProgress
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="grid lg:grid-cols-[1fr_minmax(0,330px)] gap-8 py-16 relative">
            <section ref={articleRef} className="w-full">
                {article}
            </section>

            <nav 
                ref={navRef} 
                className="w-full max-h-[calc(100vh-40px)] sticky top-5 flex flex-col gap-4 overflow-y-auto scrollbar-none py-4"
                style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                <style jsx global>{`
                    nav::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {sidebar}
            </nav>
        </div>
    )
} 