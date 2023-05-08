export interface ClassDto {
  _id: string
  name: string;
  Teacher: {
    _id: string;
    name: string;
  };
  Subject: {
    _id: string;
    name: string;
    subjectCode: string;
  };
  lession: number;
  studentNumber: number;
}
