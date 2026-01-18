import { APIRequestContext } from '@playwright/test';
import { ADMIN_CREDENTIALS, LOGISTICS_CREDENTIALS } from './auth';

const BASE_URL = process.env.BASE_URL || 'https://ecom.ayoya.srv1164291.hstgr.cloud';

export async function getAdminToken(request: APIRequestContext): Promise<string> {
  const response = await request.post(`${BASE_URL}/api/auth/login`, {
    data: { username: ADMIN_CREDENTIALS.email, password: ADMIN_CREDENTIALS.password }
  });
  const data = await response.json();
  return data.access_token;
}

export async function getLogisticsToken(request: APIRequestContext): Promise<string> {
  const response = await request.post(`${BASE_URL}/api/auth/login`, {
    data: { username: LOGISTICS_CREDENTIALS.email, password: LOGISTICS_CREDENTIALS.password }
  });
  const data = await response.json();
  return data.access_token;
}
