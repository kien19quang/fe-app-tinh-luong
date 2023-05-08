export enum RulesQualifications {
  graduate = 'Tốt nghiệp đại học',
  master = 'Thạc sĩ',
  docter = 'Tiến sĩ',
  associateProfessor = 'Phó giáo sư',
  professor = 'Giáo sư',
}

export interface TeacherDto {
  _id: string;
  name: string,
  address: string,
  phoneNumber: string,
  dob: Date,
  cmnd: string,
  degree: string
}