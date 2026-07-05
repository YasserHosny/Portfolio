export interface ListResponse<T> {
  items: T[];
  total: number;
}

export interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
