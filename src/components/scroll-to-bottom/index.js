'use client'
import { useEffect, useRef, useState } from 'react';

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

function PaginatedContent({ children, loading, setPage, loadMore } ) {
    const containerRef = useRef(null);
    const [reachedBottom, setReachedBottom] = useState(false);

    useEffect(() => {
        const debouncedScrollHandler = debounce(handleScroll, 250); // Adjust the delay as needed
        // container.addEventListener('scroll', handleScroll);
        // return () => container.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => window.removeEventListener('scroll', debouncedScrollHandler);
    }, [containerRef]);

    function handleScroll() {
        const container = containerRef.current;
        if (container) {
            const footerheight = container.clientHeight - document?.getElementById('movie-thumbnail')?.clientHeight;
            const scrolledToBottom =
                footerheight <= Math.round(window.scrollY);
            setReachedBottom(scrolledToBottom);
            if (scrolledToBottom && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }

    return (
        <div
            ref={containerRef}
            className="overflow-y-scroll  p-4"
            // max-h-[96vh]
        >
            {children}
            {/* Your container's 
            <div className='h-4'>Scroll down to see the indicator change.</div>
            <div className="mb-4">
                {reachedBottom ? (
                    <p className="text-green-600 font-semibold">Scrolled to bottom!</p>
                ) : (
                    <p className="text-gray-600">Scroll down...</p>
                )}
            </div>
            content goes here */}
        </div>
    );
}

export default PaginatedContent;
