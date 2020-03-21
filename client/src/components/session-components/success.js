
import React from 'react';

const ErrorMessage = ({ success }) => {
  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      {success}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default ErrorMessage;