import { TextField } from "@mui/material";
import React, { type ChangeEvent } from "react";

function Search (
    {  searchText, 
       handleSearch
    } : 
    {  searchText: string, 
        handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
    }) {
    return (

        <TextField id="outlined-basic" size="small" label="Search" variant="outlined" value={searchText} onChange={handleSearch} />
    );
}

export default React.memo(Search);