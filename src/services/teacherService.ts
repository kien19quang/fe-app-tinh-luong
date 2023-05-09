import axiosClient from '@/apiClient/axiosClient';
import { TeacherDto } from '@/models/teachersModel';

const getAllTeacher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'GET',
        url: 'teachers/get',
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const createTeacher = (data: TeacherDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'POST',
        url: 'teachers/create',
        data: data,
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const updateTeacher = (data: TeacherDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'PUT',
        url: 'teachers/update',
        data: data,
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const deleteTeacher = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'DELETE',
        url: `teachers/delete?id=${id}`,
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

export { getAllTeacher, createTeacher, updateTeacher, deleteTeacher };
