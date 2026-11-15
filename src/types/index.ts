export type DestinationId = 
  | 'origin'
  | 'sanctuary'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'gate';

export interface DestinationInfo {
  id: DestinationId;
  index: string;
  name: string;
  title: string;
  subtitle: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: '3D Web & WebGL' | 'Avant-Garde Graphic Design' | 'Full-Stack Architecture' | 'Mobile & Computer Vision';
  year: string;
  role: string;
  description: string;
  longDescription: string;
  philosophicalContext: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  palette: string[];
  features: string[];
  previewGradient?: string;
}

export interface SkillPillar {
  id: string;
  title: string;
  subtitle: string;
  coreTech: string[];
  philosophy: string;
  metrics: string;
}

export interface MilestoneItem {
  year: string;
  role: string;
  domain: string;
  title: string;
  description: string;
  highlights: string[];
}
