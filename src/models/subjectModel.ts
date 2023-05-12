export enum RulesLevelOfDifficultSubject {
  easy = 'Dễ',
  normal = 'Bình thường',
  difficult = 'Khó',
  advanced = 'Nâng cao',
}

export interface SubjectDto {
  _id: string;
  subjectCode: string;
  name: string;
  lession: number;
  subjectCoefficients: number;
}