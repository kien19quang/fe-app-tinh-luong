import axiosClient from '@/apiClient/axiosClient';

const getListTeacherSalary = async () => {
  const response = await axiosClient({
    method: 'GET',
    url: 'salary/get',
  });

  return response.data;
};

const getStandardSalary = async () => {
  const response = await axiosClient({
    method: 'GET',
    url: 'salary/getStandardSalary',
  });

  return response.data;
};

const createStandardSalary = async (salary: number) => {
  const response = await axiosClient({
    method: 'POST',
    url: 'salary/createStandardSalary',
    data: { standardSalary: salary },
  });

  return response.data;
};

export { getListTeacherSalary, getStandardSalary, createStandardSalary };
