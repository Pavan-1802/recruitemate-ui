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

export interface ResumeFile {
  type: string;
  data: number[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  resume: ResumeFile;
  score: string;
  status: string;
  created_at: string;
}

export interface Resume extends Candidate {
  job_title: string;
}

export interface Interview {
  id: string;
  candidate_id: string;
  name?: string;
  title?: string;
  start_time: string;
  duration: string;
  reminder: number;
  link: string;
  created_at: string;
}
