// 型定義（必要なら src/types/User.ts に移してもOK）
type GuestUser = {
  id: number;
  name: string;
  email: string;
};

type GuestLoginResponse = {
  user: GuestUser;
  token: string;
};

// 実装
export async function loginAsGuest(): Promise<GuestLoginResponse> {
  const res = await fetch('/api/users/guest');

  if (!res.ok) {
    throw new Error('Failed to login as guest');
  }

  const data: GuestLoginResponse = await res.json();
  return data;
}
