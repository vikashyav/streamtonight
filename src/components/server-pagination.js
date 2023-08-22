import Link from 'next/link';

const Pagination = ({ currentPage, total_pages, page_routes }) => {
    const getPageUrl = (page) => {
        return `/${page_routes}?page=${page}`; // Adjust this route based on your project structure
    };
    let totalPages = 0;

    if (total_pages > 500) {
        totalPages = 499
    } else {
        totalPages = total_pages
    }

    const visiblePages = [];
    const ellipsisStart = currentPage - 2 > 1 ? currentPage - 2 : 2;
    const ellipsisEnd = currentPage + 2 < totalPages ? currentPage + 2 : totalPages - 1;

    if (ellipsisStart > 2) {
        visiblePages.push(1);
        if (ellipsisStart > 3) {
            visiblePages.push('...');
        }
    }

    for (let i = ellipsisStart; i <= ellipsisEnd; i++) {
        visiblePages.push(i);
    }

    if (ellipsisEnd < totalPages - 1) {
        if (ellipsisEnd < totalPages - 2) {
            visiblePages.push('...');
        }
        visiblePages.push(totalPages);
    }

    return (
        <nav className="flex items-center justify-center my-8">
            <ul className="flex">
                {visiblePages.map((page, index) => (
                    <li key={index}>
                        {page === '...' ? (
                            <span className="mx-2 text-gray-500">...</span>
                        ) : (
                            <Link href={getPageUrl(page)}>
                                <div
                                    className={`mx-1 px-4 py-2 rounded ${page === currentPage ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-gray-200'
                                        }`}
                                >
                                    {page}
                                </div>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;