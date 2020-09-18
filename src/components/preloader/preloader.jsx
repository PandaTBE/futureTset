import React from 'react';
import preloader from '../assets/img/2.svg';
import styled from 'styled-components';

const SpinnerWrapper = styled.img`
display: block;
margin: 0 auto;
`

const Preloader = () => {
    return (
        <SpinnerWrapper src={preloader} alt="loading..." />


    );
}

export default Preloader;