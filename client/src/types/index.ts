export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: string | null;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  iconUrl: string | null;
  order: number;
}

export interface Certification {
  id: number;
  issuer: string;
  certificateName: string;
  description: string | null;
  issueDate: string;
  expiryDate: string | null;
  certificateUrl: string | null;
  order: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  description: string | null;
  logoUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatarUrl: string | null;
  message: string;
  rating: number;
  order: number;
}

export interface Community {
  id: number;
  name: string;
  role: string | null;
  description: string | null;
  logoUrl: string | null;
  bioUrl: string | null;
  order: number;
}