export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  threshold: number;
  created_at: string;
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
  created_at: string;
}

export interface onHoldResume extends Candidate {
  job_title: string;
}
