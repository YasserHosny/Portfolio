export type UpdateType =
  | 'Certification'
  | 'Product Idea'
  | 'Case Study'
  | 'Learning'
  | 'Article'
  | 'Release'
  | 'Event';

export interface UpdateItem {
  id: string;
  title: string;
  type: UpdateType;
  date: string;
  description: string;
  tags: string[];
  link?: string | null;
}
