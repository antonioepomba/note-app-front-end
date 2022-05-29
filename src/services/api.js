import axios from 'axios';
//var cors = require('cors')
const BASE_URL = process.env.REACT_APP_PORTAL_API;
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

axios.defaults.baseURL = BASE_URL


const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});


const get = async ({ endpoint }) => {
  let result = await httpClient
    .get(endpoint,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',

        }
      },
      {
        validateStatus: function (status) {
          return status < 400; // Resolve only if the status code is less than 500
        },
      },
    )
    .catch(function (error) {
      console.error(error);
      return []
    });
  if (result?.data) {
    console.log("RESULT", result?.data)
  }

  return result?.data;
}
const post = async ({ endpoint, data }) => {
  let result = await httpClient
    .post(
      endpoint,
      data,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${getToken()}`,
        }
      },
      {
        validateStatus: function (status) {
          return status < 400;
        },
      },
    )
    .catch(function (error) {
      console.error(error);
      return []
    });

  if (result?.data) {
    console.log("RESULT", result?.data)
  }

  return result?.data;
}

const handleDelete = async ({ endpoint,data }) => {
  let result = await httpClient
    .delete(
      endpoint,data,
     
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',

        }
      },
      {
        validateStatus: function (status) {
          return status < 400;
        },
      },
    )
    .catch(function (error) {
      console.error(error);
      return []
    });

  if (result?.data) {
    console.log("RESULT", result?.data)
  }
  return result?.data;
}
export default class api {
  getNotes = async () => {
    return get({ endpoint: '/notes' });
  };

  getUsers = async () => {
    return get({ endpoint: '/users' });
  };
  saveNote = (data) => {
    return post({ endpoint: '/note', data: data });
  };

  saveUser = (data) => {
    return post({ endpoint: '/user', data: data });
  };
  getNoteById = (data) => {
    return get({ endpoint: `note/${data.id}`, data: data });
  }
  getUserById = (data) => {
    return get({ endpoint: `user/${data.id}`, data: data });
  }
  deleteNote = (data) => {
    return handleDelete({ endpoint: '/note', data: data });
  };
  deleteUser = (data) => {
    return handleDelete({ endpoint: '/user', data: data });
  };
}
export const userApiService = {
  api
};