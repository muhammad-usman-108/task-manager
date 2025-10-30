import React, { type ChangeEvent } from "react";

function Search (
    {  searchText, 
       handleSearch
    } : 
    {  searchText: string, 
        handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
    }) {
    return (
        <input type="text" value={searchText} onChange={handleSearch} />
    );
}

export default React.memo(Search);