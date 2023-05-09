import axiosClient from '@/apiClient/axiosClient';
import { SubjectDto } from '@/models/subjectModel';

const getAllSubject = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'GET',
        url: 'subject/get',
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const createSubject = (data: SubjectDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'POST',
        url: 'subject/create',
        data: data,
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const updateSubject = (data: SubjectDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'PUT',
        url: 'subject/update',
        data: data,
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const deleteSubject = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'DELETE',
        url: `subject/delete?id=${id}`,
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

export { getAllSubject, createSubject, updateSubject, deleteSubject };
