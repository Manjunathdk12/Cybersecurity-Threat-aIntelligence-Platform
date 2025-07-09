// Threats/Pagination.jsx
import React from 'react';

const Pagination = ({ page, limit, totalCount, hasMore, isFetchingMore, updateSearchParams }) => {
  const handlePageJump = (e) => {
    e.preventDefault();
    const pageInput = e.target.page.value;
    if (pageInput > 0) updateSearchParams({ page: pageInput });
  };

  return (
    <div className="mt-6 text-center text-gray-400 text-sm">
      Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalCount)} of {totalCount} threats<br />
      Page {page} of {Math.ceil(totalCount / limit)}
      <form onSubmit={handlePageJump} className="mt-2 flex justify-center space-x-2">
        <input
          name="page"
          type="number"
          min="1"
          className="w-16 text-center px-2 py-1 rounded-md bg-gray-700 border border-gray-600 text-white"
          placeholder="Page"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
        >
          Go
        </button>
      </form>
      {hasMore && (
        <div className="mt-4">
          <button
            onClick={() => updateSearchParams({ page: (page + 1).toString() })}
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md"
            disabled={isFetchingMore}
          >
            {isFetchingMore ? 'Loading more...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
