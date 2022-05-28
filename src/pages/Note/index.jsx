import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../account-overview.css';
import api from '../../services/api'
import DATATABLE from '../../components/DataTable';
import Actions from '../../components/Actions';
//mport validator from '../../services/validator.service';
//import createErrorMessage from '../../services/createErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const userApiService = new api();
const columns = [
  {
    label: '#',
    field: 'num',
    sort: 'asc',
    width: 10
  },
  {
    label: 'Title',
    field: 'title',
    sort: 'asc',
    width: 300
  },
  {
    label: 'Author',
    field: 'author',
    sort: 'asc',
    width: 300
  },
  {
    label: 'Date',
    field: 'date',
    sort: 'asc',
    width: 300
  },
  {
    label: 'Actions',
    field: 'action',
    sort: 'asc',
    width: 300
  }

];

//const validation = new validator();

export default function NoteList(props) {
  const [openForm, setOpenForm] = useState(0);
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [list, setList] = useState([]);
  const { hideAlertShow, showMsg } = props;



  useEffect(async () => {
    //validation.setShowMsg(showMsg);
    loadTable();
  }, []);
  const notify = () => toast("Note Saved!");
  const handleNoteForm = () => {
    setOpenForm(1)
  }
  const setData = (note = null) => {
    setId(note?.id);
    setTitle(note?.title);
    setAuthor(note?.author);
    setText(note?.text);
    setOpenForm(3);
  }

  const handleEdit = (note) => {
    setData(note)
    setOpenForm(3);

  }
  const handleView = (note) => {
    setData(note)
    setOpenForm(2);
  }
  const handleNotListForm = () => {
    setOpenForm(0)
  }
  const handleDelete = (note) => {
    setData(note?.id)
    deleteData(note?.id)
    setOpenForm(0)
  }

  const goToNoteForm = () => {
    return (
      noteForm()
    )
  }

  const saveForm = async () => {

    const rowData = {
      id: id,
      title: title,
      author: author,
      text: text
    }

    let timer = setTimeout(() => {
      // hideAlertShow();
      clearTimeout(timer);
    }, 5 * 1000);

    let result = await userApiService.saveNote(rowData);
    if (result) {
      setData()
      notify();
      loadTable();
      setOpenForm(0);

    } else {
      //showMsg.error(createErrorMessage(result))
    }
    setTimeout(() => {
    }, 1000);
  }
  const deleteData = async (answer) => {

    if (answer) {
      let result = await userApiService.deleteNote(id);
      if (result) {
        loadTable();
        setOpenForm(0);
        console.log('success')
      } else {
        console.log('error')
      }
    }
  }
  const updateForm = async () => {
    //setOpenSpinner(true);
    const rowData = {
      id: id,
      title: title,
      author: author,
      text: text
    }

    let timer = setTimeout(() => {
      //hideAlertShow();
      clearTimeout(timer);
    }, 5 * 1000);

    let result = await userApiService.getNoteById(rowData);

    if (result) {
      setData()
      loadTable();
      setOpenForm(0);

    } else {
      //showMsg.error(result?.exception?.msg)
    }
    setTimeout(() => {
      // setOpenSpinner(false);
    }, 1000);
  }


  const loadTable = async () => {
    let list = await userApiService.getNotes();
    let rows = [];

    if (list) {
      Object.values(list).map(l => {
        rows.push({
          num: l?.id,
          title: l?.title,
          author: l?.author,
          date: l?.date,
          action: (<Actions value={l} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />)
        });
      });
      setList({ columns: columns, rows: rows })
    }
  }
  const noteForm = () => {
    return (
      <div className='p-0'>
        <ToastContainer />
        <h3>Write note</h3>
        <div className="container  p-5">
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Title:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setTitle(e.target.value)}
              required />
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Author:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Text:</span>
            <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3"
              onChange={(e) => setText(e.target.value)}
              required />
          </div>
          <div className='row'>
            <div className='col-sm'><button onClick={saveForm} type="submit" class="btn btn-primary">Save</button>
              <button onClick={handleNotListForm} class="btn btn-warning">Back</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const editNoteForm = () => {
    return (
      <div className='p-5'>
        <ToastContainer />
        <h3>Write note</h3>
        <div className="container  p-5">
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Title:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setTitle(e.target.value)}
              value={title} required />
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Author:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setAuthor(e.target.value)}
              value={author} />
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Text:</span>
            <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3"
              onChange={(e) => setText(e.target.value)}
              value={text} required />
          </div>
          <div className='row'>
            <div className='col-sm'><button onClick={saveForm} class="btn btn-primary">Edit</button>
              <button onClick={handleNotListForm} class="btn btn-warning">Back</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const viewNoteForm = () => {
    return (
      <div className='p-5'>
        <h3>Write note</h3>
        <div className="container  p-5">
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Title:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled={true}
              value={title} />
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Author:</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled={true}
              value={author} />
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Text:</span>
            <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3" disabled={true}
              value={text} />
          </div>
          <button onClick={handleNotListForm} class="btn btn-warning">Back</button>
        </div>
      </div>
    )
  }

  const NoteListForm = () => {
    return (
      <div className='container-fluid h-100 w-100 p-3 m-0'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
          <div class="row justify-content-md-left"><button onClick={handleNoteForm} class="btn btn-success btn-sm float-left">Add Note</button></div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              
            </div>
          </div>
        </nav>
        {deleteData}
        <h4>Notes</h4>
        <div className='p-4' style={{ width: '100%' }}>
          
            <DATATABLE
              data={list} />
          </div>
        </div>
    
    )
  }
  const start = () => {
    switch (openForm) {
      case 0:
        return NoteListForm();
      case 1:
        return goToNoteForm();
      case 2:
        return viewNoteForm();
      case 3:
        return editNoteForm()
      default:
        break;
    }
  }
  return start();
}
