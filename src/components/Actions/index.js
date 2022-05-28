import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

export default function Actions(props) {
  const {
    handleEdit,
    handleDelete,
    handleView,
    value
  } = props;

 

  const handleActions = () => {
    return (
      <>
        {
          handleView ? <button onClick={ function () {handleView(value)}} class="btn btn-primary btn-sm">view</button>
            : null
        }
          {
          handleEdit ? <button   onClick={ function () {handleEdit(value)}}type="button" class="btn btn-warning btn-sm">edit</button>
            : null
        }
          {
          handleDelete ? <button onClick={ function () {handleDelete(value)}} class="btn btn-danger btn-sm">delete</button>
            : null
        }
      </>
    )
  }

  return (
    handleActions()
  );
}