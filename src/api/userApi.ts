import { API_BASE_URL } from '../utils/apiBase'; 

type GuestUser = {
  id: number;
  name: string;
  email: string;
};

type GuestLoginResponse = {
  user: GuestUser;
  token: string;
};

export async function loginAsGuest(): Promise<GuestLoginResponse> {
  const res = await fetch(`${API_BASE_URL}/api/users/guest`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  // JSONでなければエラーにする安全チェック
  const contentType = res.headers.get('Content-Type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Invalid response: not JSON');
  }

  const data: GuestLoginResponse = await res.json();
  return data;
}
