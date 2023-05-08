import axiosClient from '@/apiClient/axiosClient';
import { TeacherDto } from '@/models/teachersModel';

const getAllTeacher = async () => {
  const response = await axiosClient({
    method: 'GET',
    url: 'teachers/get',
  });

  return response.data;
};

const createTeacher = async (data: TeacherDto) => {
  const response = await axiosClient({
    method: 'POST',
    url: 'teachers/create',
    data: data,
  });

  return response.data;
};

const updateTeacher = async (data: TeacherDto) => {
  const response = await axiosClient({
    method: 'PUT',
    url: 'teachers/update',
    data: data,
  });

  return response.data;
};

const deleteTeacher = async (id: string) => {
  const response = await axiosClient({
    method: 'DELETE',
    url: `teachers/delete?id=${id}`,
  });

  return response.data;
};

export { getAllTeacher, createTeacher, updateTeacher, deleteTeacher };
