import { AuthResponse } from '../.generated/graphql/schema';

const LOCAL_STORAGE_TOKEN_KEY = 'inventoryApiToken';
export function storeToken(authResponse: Nullable<Pick<AuthResponse, 'token' | 'expires'>>) {
  if (!authResponse) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    return;
  }
  const { token, expires } = authResponse;
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify({ token, expires }));
}

export function retrieveToken(): Nullable<Pick<AuthResponse, 'token' | 'expires'>> {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || 'null');
}
