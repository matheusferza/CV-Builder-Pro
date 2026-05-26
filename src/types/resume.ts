export interface PersonalInfo {
  fullName: string;
  targetRole: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  instagram: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface Education {
  course: string;
  institution: string;
  period: string;
}

export interface Skills {
  frontend: string;
  mobile: string;
  backend: string;
  tools: string;
  others: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experiences: Experience[];
  projects: Project[];
  education: Education;
  skills: Skills;
}

export type SectionId = 'summary' | 'experiences' | 'projects' | 'education' | 'skills';

export interface ResumeDocument {
  id: string;
  name: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  data: ResumeData;
}
