import API from '@/config/request';
import { getUser } from '@/utlis';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  profile: string | null;
  contact: string;
  address: string;
  created_at: string;
  updated_at: string;
  is_verified: string;
  office_status: string | null;
  status: string;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: User[];
  meta: Meta;
}

export const fetchUsersAPI = async (): Promise<UsersResponse> => {
  const token = getUser();
  if (!token) throw new Error('No token found');

  const res = await API.get<UsersResponse>('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateUserAPI = async (id: number, data: Partial<User>): Promise<boolean> => {
  const token = getUser();
  if (!token) throw new Error('No token found');

  try {
    const res = await API.put(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status >= 200 && res.status < 300; // Accept 200, 201, 204, etc.
  } catch (error) {
    throw error; // Let the caller handle the error
  }
};