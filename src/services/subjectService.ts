import axiosClient from '@/apiClient/axiosClient';
import { SubjectDto } from '@/models/subjectModel';

const getAllSubject = async () => {
  const response = await axiosClient({
    method: 'GET',
    url: 'subject/get',
  });

  return response.data;
};

const createSubject = async (data: SubjectDto) => {
  const response = await axiosClient({
    method: 'POST',
    url: 'subject/create',
    data: data,
  });

  return response.data;
};

const updateSubject = async (data: SubjectDto) => {
  const response = await axiosClient({
    method: 'PUT',
    url: 'subject/update',
    data: data,
  });

  return response.data;
};

const deleteSubject = async (id: string) => {
  const response = await axiosClient({
    method: 'DELETE',
    url: `subject/delete?id=${id}`,
  });

  return response.data;
};

export { getAllSubject, createSubject, updateSubject, deleteSubject };
