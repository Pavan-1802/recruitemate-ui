export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  threshold: number;
  createdAt: Date;
}

export interface Resume {
  type: string;
  data: number[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  resume: Resume;
  score: string;
  status: string;
  createdAt: Date;
}
