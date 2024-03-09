import React from "react";

const SearchBox = (props) => {

    return (

        <div>
            <input className="form-control w-100"  value={props.value} onChange={(event) => props.setSearchValue(event.target.value)}placeholder="Type here to search"></input>
        </div>


    )



}

export default SearchBox;