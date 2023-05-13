import axiosClient from '@/apiClient/axiosClient';
import { GeneralRulesDto } from '@/models/generalRules';

const getListTeacherSalary = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'GET',
        url: 'salary/get',
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const getStandardSalary = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'GET',
        url: 'salary/getStandardSalary',
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

const createStandardSalary = (generalRules: GeneralRulesDto) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosClient({
        method: 'POST',
        url: 'salary/createStandardSalary',
        data: generalRules,
      });
      resolve(response.data);
    }catch(e) {
      reject(e);
    }
  })
};

export { getListTeacherSalary, getStandardSalary, createStandardSalary };
