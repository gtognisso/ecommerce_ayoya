import { test, expect, APIRequestContext } from '@playwright/test';
import { getAdminToken, getLogisticsToken } from '../utils/api';

const BASE_URL = process.env.BASE_URL || 'https://ecom.ayoya.srv1164291.hstgr.cloud';

// ==================== PUBLIC API TESTS (001-009) ====================

test.describe('Public API', () => {
  let request: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext();
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  // API-001: Health Check
  test('API-001: GET /api/health returns ok status', async () => {
    const response = await request.get(`${BASE_URL}/api/health`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('status');
    expect(data.status).toBe('ok');
  });

  // API-002: Public Config
  test('API-002: GET /api/public/config returns prices, contact, social', async () => {
    const response = await request.get(`${BASE_URL}/api/public/config`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('prices');
    expect(data).toHaveProperty('contact');
    expect(data).toHaveProperty('social');
  });

  // API-003: Public Zones
  test('API-003: GET /api/public/zones returns 8 Cotonou zones', async () => {
    const response = await request.get(`${BASE_URL}/api/public/zones`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.zones)).toBeTruthy();
    expect(data.zones.length).toBe(8);
  });

  // API-004: Public CGU
  test('API-004: GET /api/public/cgu returns terms of use', async () => {
    const response = await request.get(`${BASE_URL}/api/public/cgu`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('content');
    expect(typeof data.content).toBe('string');
  });

  // API-005: Public CGV
  test('API-005: GET /api/public/cgv returns terms of sale', async () => {
    const response = await request.get(`${BASE_URL}/api/public/cgv`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('content');
    expect(typeof data.content).toBe('string');
  });

  // API-006: Public Visuals
  test('API-006: GET /api/public/visuals returns visual assets', async () => {
    const response = await request.get(`${BASE_URL}/api/public/visuals`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.visuals)).toBeTruthy();
  });

  // API-007: Public Videos
  test('API-007: GET /api/public/videos returns video assets', async () => {
    const response = await request.get(`${BASE_URL}/api/public/videos`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.videos)).toBeTruthy();
  });

  // API-008: Create Order Valid
  test('API-008: POST /api/orders with valid data returns order ID', async () => {
    const orderData = {
      items: [
        {
          product_id: 'test-product-1',
          quantity: 1,
          price: 15000
        }
      ],
      zone: 'Zone A',
      contact: '+229 90000000',
      address: 'Test Address'
    };
    const response = await request.post(`${BASE_URL}/api/orders`, {
      data: orderData
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(typeof data.id).toBe('string');
  });

  // API-009: Create Order Invalid
  test('API-009: POST /api/orders with invalid data returns 422', async () => {
    const invalidOrderData = {
      items: [],
      zone: null
    };
    const response = await request.post(`${BASE_URL}/api/orders`, {
      data: invalidOrderData
    });
    expect(response.status()).toBe(422);
  });
});

// ==================== AUTH API TESTS (010-014) ====================

test.describe('Auth API', () => {
  let request: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext();
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  // API-010: Valid Login
  test('API-010: POST /api/auth/login with valid credentials returns token', async () => {
    const response = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        username: 'admin@ayoya.bj',
        password: 'ayoya_admin_2024'
      }
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('access_token');
    expect(typeof data.access_token).toBe('string');
    expect(data.access_token.length).toBeGreaterThan(0);
  });

  // API-011: Invalid Login
  test('API-011: POST /api/auth/login with invalid credentials returns 401', async () => {
    const response = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        username: 'admin@ayoya.bj',
        password: 'wrong_password'
      }
    });
    expect(response.status()).toBe(401);
  });

  // API-012: Protected Route Without Token
  test('API-012: Access protected route without token returns 401', async () => {
    const response = await request.get(`${BASE_URL}/api/admin/prices`);
    expect(response.status()).toBe(401);
  });

  // API-013: Protected Route With Valid Token
  test('API-013: Access protected route with valid token succeeds', async () => {
    const token = await getAdminToken(request);
    const response = await request.get(`${BASE_URL}/api/admin/prices`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    expect(response.status()).toBe(200);
  });

  // API-014: Expired Token
  test('API-014: Access protected route with expired token returns 401', async () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const response = await request.get(`${BASE_URL}/api/admin/prices`, {
      headers: {
        Authorization: `Bearer ${expiredToken}`
      }
    });
    expect(response.status()).toBe(401);
  });
});

// ==================== ADMIN API TESTS (015-025) ====================

test.describe('Admin API', () => {
  let request: APIRequestContext;
  let adminToken: string;

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext();
    adminToken = await getAdminToken(request);
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  const headers = {
    'Authorization': `Bearer ${adminToken}`
  };

  // API-015: Get Admin Prices
  test('API-015: GET /api/admin/prices returns price configuration', async () => {
    const response = await request.get(`${BASE_URL}/api/admin/prices`, {
      headers
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('delivery_cost');
    expect(data).toHaveProperty('base_price');
  });

  // API-016: Update Admin Prices
  test('API-016: PUT /api/admin/prices updates price configuration', async () => {
    const updateData = {
      delivery_cost: 5000,
      base_price: 15000
    };
    const response = await request.put(`${BASE_URL}/api/admin/prices`, {
      headers,
      data: updateData
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('delivery_cost');
  });

  // API-017: Get Admin Contact
  test('API-017: GET /api/admin/contact returns contact information', async () => {
    const response = await request.get(`${BASE_URL}/api/admin/contact`, {
      headers
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('email');
    expect(data).toHaveProperty('phone');
  });

  // API-018: Update Admin Contact
  test('API-018: PUT /api/admin/contact updates contact information', async () => {
    const updateData = {
      email: 'contact@ayoya.bj',
      phone: '+229 90000000'
    };
    const response = await request.put(`${BASE_URL}/api/admin/contact`, {
      headers,
      data: updateData
    });
    expect(response.status()).toBe(200);
  });

  // API-019: Get Admin Social
  test('API-019: GET /api/admin/social returns social media links', async () => {
    const response = await request.get(`${BASE_URL}/api/admin/social`, {
      headers
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.platforms)).toBeTruthy();
  });

  // API-020: Update Admin Social
  test('API-020: PUT /api/admin/social updates social media links', async () => {
    const updateData = {
      platforms: [
        { name: 'facebook', url: 'https://facebook.com/ayoya' },
        { name: 'instagram', url: 'https://instagram.com/ayoya' }
      ]
    };
    const response = await request.put(`${BASE_URL}/api/admin/social`, {
      headers,
      data: updateData
    });
    expect(response.status()).toBe(200);
  });

  // API-021: Get Admin Emails
  test('API-021: GET /api/admin/emails returns email configurations', async () => {
    const response = await request.get(`${BASE_URL}/api/admin/emails`, {
      headers
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.emails)).toBeTruthy();
  });

  // API-022: Create Admin Email
  test('API-022: POST /api/admin/emails creates new email configuration', async () => {
    const emailData = {
      name: 'test_notification',
      recipient: 'test@ayoya.bj',
      template: 'order_confirmation'
    };
    const response = await request.post(`${BASE_URL}/api/admin/emails`, {
      headers,
      data: emailData
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('id');
  });

  // API-023: Delete Admin Email
  test('API-023: DELETE /api/admin/emails/:id removes email configuration', async () => {
    const createResponse = await request.post(`${BASE_URL}/api/admin/emails`, {
      headers,
      data: {
        name: 'temp_email',
        recipient: 'temp@ayoya.bj',
        template: 'order_confirmation'
      }
    });
    const { id } = await createResponse.json();

    const response = await request.delete(`${BASE_URL}/api/admin/emails/${id}`, {
      headers
    });
    expect(response.status()).toBe(204);
  });

  // API-024: Post Admin Media Visuals
  test('API-024: POST /api/admin/media/visuals uploads visual asset', async () => {
    const visualData = {
      title: 'Test Visual',
      url: 'https://example.com/visual.jpg',
      type: 'banner'
    };
    const response = await request.post(`${BASE_URL}/api/admin/media/visuals`, {
      headers,
      data: visualData
    });
    expect([200, 201]).toContain(response.status());
    const data = await response.json();
    expect(data).toHaveProperty('id');
  });

  // API-025: Delete Admin Media Visual
  test('API-025: DELETE /api/admin/media/visuals/:id removes visual asset', async () => {
    const createResponse = await request.post(`${BASE_URL}/api/admin/media/visuals`, {
      headers,
      data: {
        title: 'Temp Visual',
        url: 'https://example.com/temp.jpg',
        type: 'banner'
      }
    });
    const { id } = await createResponse.json();

    const response = await request.delete(`${BASE_URL}/api/admin/media/visuals/${id}`, {
      headers
    });
    expect(response.status()).toBe(204);
  });
});

// ==================== LOGISTICS API TESTS (026-032) ====================

test.describe('Logistics API', () => {
  let request: APIRequestContext;
  let logisticsToken: string;
  let testOrderId: string;

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext();
    logisticsToken = await getLogisticsToken(request);

    // Create a test order for logistics tests
    const orderResponse = await request.post(`${BASE_URL}/api/orders`, {
      data: {
        items: [
          { product_id: 'test-prod', quantity: 1, price: 15000 }
        ],
        zone: 'Zone A',
        contact: '+229 90000000',
        address: 'Test Address'
      }
    });
    const orderData = await orderResponse.json();
    testOrderId = orderData.id;
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  const headers = {
    'Authorization': `Bearer ${logisticsToken}`
  };

  // API-026: Get Logistics Orders
  test('API-026: GET /api/logistics/orders returns list of orders', async () => {
    const response = await request.get(`${BASE_URL}/api/logistics/orders`, {
      headers
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.orders)).toBeTruthy();
  });

  // API-027: Get Specific Order
  test('API-027: GET /api/logistics/orders/:id returns specific order details', async () => {
    const response = await request.get(`${BASE_URL}/api/logistics/orders/${testOrderId}`, {
      headers
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data.id).toBe(testOrderId);
  });

  // API-028: Update Order Status
  test('API-028: PATCH /api/logistics/orders/:id/status updates order status', async () => {
    const response = await request.patch(
      `${BASE_URL}/api/logistics/orders/${testOrderId}/status`,
      {
        headers,
        data: { status: 'in_transit' }
      }
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('status');
  });

  // API-029: Assign Order to Courier
  test('API-029: POST /api/logistics/orders/:id/assign assigns order to courier', async () => {
    const response = await request.post(
      `${BASE_URL}/api/logistics/orders/${testOrderId}/assign`,
      {
        headers,
        data: { courier_id: 'courier-001', notes: 'Standard delivery' }
      }
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('courier_id');
  });

  // API-030: Get Deliveries
  test('API-030: GET /api/logistics/deliveries returns list of deliveries', async () => {
    const response = await request.get(`${BASE_URL}/api/logistics/deliveries`, {
      headers
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.deliveries)).toBeTruthy();
  });

  // API-031: Create Delivery
  test('API-031: POST /api/logistics/deliveries creates new delivery', async () => {
    const response = await request.post(`${BASE_URL}/api/logistics/deliveries`, {
      headers,
      data: {
        order_id: testOrderId,
        courier_id: 'courier-001',
        scheduled_date: new Date().toISOString().split('T')[0]
      }
    });
    expect([200, 201]).toContain(response.status());
    const data = await response.json();
    expect(data).toHaveProperty('id');
  });

  // API-032: Delete Delivery
  test('API-032: DELETE /api/logistics/deliveries/:id removes delivery', async () => {
    const createResponse = await request.post(`${BASE_URL}/api/logistics/deliveries`, {
      headers,
      data: {
        order_id: testOrderId,
        courier_id: 'courier-002',
        scheduled_date: new Date().toISOString().split('T')[0]
      }
    });
    const { id } = await createResponse.json();

    const response = await request.delete(`${BASE_URL}/api/logistics/deliveries/${id}`, {
      headers
    });
    expect(response.status()).toBe(204);
  });
});
