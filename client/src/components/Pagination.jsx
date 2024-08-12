
import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const windowSize = 5; // Number of pages to show at a time

    // Calculate the start and end page numbers
    const startPage = Math.max(1, Math.min(currentPage - Math.floor(windowSize / 2), totalPages - windowSize + 1));
    const endPage = Math.min(totalPages, startPage + windowSize - 1);

    // Function to generate page numbers
    const generatePages = () => {
        let pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = generatePages();

    return (
        <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-700'}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="px-4 py-2 border rounded bg-white text-black hover:bg-gray-100"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="px-4 py-2 border rounded bg-white text-black">...</span>}
                    </>
                )}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 border rounded ${currentPage === page ? 'bg-black text-white font-semibold' : 'bg-white text-black hover:bg-gray-100'}`}
                    >
                        {page}
                    </button>
                ))}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-4 py-2 border rounded bg-white text-black">...</span>}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="px-4 py-2 border rounded bg-white text-black hover:bg-gray-100"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-700'}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </nav>
        </div>
    );
};

export default Pagination;

