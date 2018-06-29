import React from 'react';
import PropTypes from 'prop-types';

const PaginationButton = ({updatePage,pageNumber}) => {
    return (
            <a onClick={updatePage}>{pageNumber}</a>
    );
};

export default PaginationButton;