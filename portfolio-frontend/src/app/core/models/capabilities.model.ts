export interface CapabilityGroup {
  group: string;
  description: string;
  items: string[];
}

export interface CertificationItem {
  name: string;
  theme: string;
}

export interface Capabilities {
  groups: CapabilityGroup[];
  learning_themes: string[];
  certifications: CertificationItem[];
}
