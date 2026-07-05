export interface Project {
  slug: string;
  name: string;
  description?: string | null;
  language: string;
  tags: string[];
  repo_url: string;
  homepage_url?: string | null;
  last_push: string;
  highlight: boolean;
  linked_product_lab_slug?: string | null;
}
