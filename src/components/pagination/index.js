import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func
};

Pagination.defaultProps = {
  onPageChange: null
}

function Pagination({ pagination, onPageChange }) {
  const { offset, limit, totalRows } = pagination;
  const totalPages = Math.ceil(totalRows / limit)
  const handlePageChange = newPage => {
    if (onPageChange)
      onPageChange(newPage)
  }
  return (
    <div>
      <Button disabled={offset <= 1} onClick={() => handlePageChange(offset - limit)}>Prev</Button>
      <Button disabled={offset >= totalPages} onClick={() => handlePageChange(offset + limit)}>Prev</Button>
    </div>
  );
}

export default Pagination;     