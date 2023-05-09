import axiosClient from '@/apiClient/axiosClient';
import { ClassDto } from '@/models/classModel';

const getAllClass = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'GET',
        url: 'classes/get',
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const createClass = (data: ClassDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'POST',
        url: 'classes/create',
        data: data
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const updateClass = async (data: ClassDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'PUT',
        url: 'classes/update',
        data: data
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const deleteClass = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'DELETE',
        url: `classes/delete?id=${id}`,
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

export { getAllClass, createClass, updateClass, deleteClass };
