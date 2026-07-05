export interface ProductLabItem {
  slug: string;
  title: string;
  description: string;
  problem: string;
  target_users: string;
  mvp_scope: string[];
  status: string;
  tags: string[];
  detail_url?: string | null;
}
