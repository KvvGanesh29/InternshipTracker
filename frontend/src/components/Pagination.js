import React from "react";

function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="pagination">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        Previous
      </button>

      <span>
        Page {page + 1} of {totalPages}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page + 1 === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;