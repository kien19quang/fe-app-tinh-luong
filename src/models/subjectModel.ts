export enum RulesLevelOfDifficultSubject {
  easy = 'Dễ',
  normal = 'Bình thường',
  difficult = 'Khó',
  advanced = 'Nâng cao',
}

export interface SubjectDto {
  _id: string;
  name: string,
  address: string,
  phoneNumber: string,
  dob: Date,
  cmnd: string,
  degree: string
}