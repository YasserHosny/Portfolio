export interface SnapshotItem {
  label: string;
  value: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  tags: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
}

export interface ContactLinks {
  linkedin: string;
  email: string;
  email_secondary?: string | null;
  github?: string | null;
}

export interface Profile {
  name: string;
  brand: string;
  title: string;
  location: string;
  positioning: string[];
  hero_headline: string;
  hero_subtitle: string;
  supporting_line: string;
  summary: string;
  founder_summary: string;
  snapshot: SnapshotItem[];
  process_flow: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  startup_value: string[];
  contact: ContactLinks;
}
