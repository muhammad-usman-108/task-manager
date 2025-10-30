import React from "react";

function Pagination (
    {  page, 
       totalPages,
       paginationHandler
    } : 
    {  page: number, 
       totalPages: number,
       paginationHandler: (value: number) => void
    }) {
    return (
        <>
            <button onClick={() => paginationHandler(-1)} disabled={page === 1}>Previous</button>
            {page} of {totalPages}
            <button onClick={() => paginationHandler(1)} disabled={page === totalPages}>Next</button>
        </>
    );
}

export default React.memo(Pagination);