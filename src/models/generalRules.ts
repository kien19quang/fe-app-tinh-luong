export interface GeneralRulesDto {
  standardSalary: number,
  teacherCoefficient: {
    graduate: number;
    master: number;
    docter: number;
    associateProfessor: number;
    professor: number;
  };
}