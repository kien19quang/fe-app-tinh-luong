import axiosClient from '@/apiClient/axiosClient';
import { ClassDto } from '@/models/classModel';

const getAllClass = async () => {
  const response = await axiosClient({
    method: 'GET',
    url: 'classes/get',
  });

  return response.data;
};

const createClass = async (data: ClassDto) => {
  const response = await axiosClient({
    method: 'POST',
    url: 'classes/create',
    data: data
  });

  return response.data;
};

const updateClass = async (data: ClassDto) => {
  const response = await axiosClient({
    method: 'PUT',
    url: 'classes/update',
    data: data
  });

  return response.data;
};

const deleteClass = async (id: string) => {
  const response = await axiosClient({
    method: 'DELETE',
    url: `classes/delete?id=${id}`,
  });

  return response.data;
};

export { getAllClass, createClass, updateClass, deleteClass };
