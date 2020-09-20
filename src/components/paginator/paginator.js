/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import styled from 'styled-components';

const Nav = styled.ul`
display: flex;
justify-content: center;
list-style-type: none;
`
const NavItem = styled.li`
border: 1px solid black;
padding: 5px;
border-right: none;
&:last-child {
    border: 1px solid black;
}
`
const SelectedNavItem = styled.li`
border: 2px solid black;
padding: 5px;
background-color: rgb(105, 210, 255);
`

const Paginator = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];
    const pagesCount = Math.ceil(totalUsers / usersPerPage)


    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i)
    }

    const portionCount = Math.ceil(pagesCount / usersPerPage);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * usersPerPage + 1;
    const rightPortionPageNumber = portionNumber * usersPerPage;
    return (
        <nav>
            <Nav>
                {portionNumber > 1 &&
                    <NavItem><a onClick={() => setPortionNumber(portionNumber - 1)} href='#'>Previous</a></NavItem>}

                {pageNumbers
                    .filter(num => num >= leftPortionPageNumber && num <= rightPortionPageNumber)
                    .map(num => (
                        <div key={num}>
                            {num === currentPage
                                ? <SelectedNavItem ><a onClick={() => paginate(num)} href='#'>{num}</a></SelectedNavItem>
                                : <NavItem><a onClick={() => paginate(num)} href='#'>{num}</a></NavItem>}
                        </div>
                    ))}
                {portionCount > portionNumber &&
                    <NavItem><a onClick={() => setPortionNumber(portionNumber + 1)} href='#'>Next</a></NavItem>}

            </Nav>
        </nav>
    )



}

export default Paginator;