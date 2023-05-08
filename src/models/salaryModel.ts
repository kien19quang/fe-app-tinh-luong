import { RulesQualifications } from "./teachersModel";

export interface ClassAndLession {
  class: string;
  lession: number;
}

export interface SalaryDto {
  teacherCode: string;
  nameTeacher: string;
  phoneNumber: string;
  email: string;
  address: string;
  dob: string;
  degree: keyof typeof RulesQualifications;
  listSubject: string[]
  classAndLession: ClassAndLession[],
  standardSalary: number;
  salary: number; 
}