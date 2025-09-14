import { test, expect, request } from '@playwright/test';

test.describe('Learning Instance API Flow', () => {
  let authToken: string;
  let learningInstanceId: string;

  test.beforeAll(async () => {
    // Perform login to get the auth token
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://your-api-url.com/login', {
      data: {
        username: 'your-username',
        password: 'your-password'
      }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    authToken = responseBody.token;  // Adjust based on actual response structure
  });

  test('Create and Validate Learning Instance', async () => {
    // Create a Learning Instance
    const apiContext = await request.newContext();
    const startTime = Date.now();
    const createResponse = await apiContext.post('https://your-api-url.com/ai/learning-instance', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      data: {
        name: 'New Learning Instance',
        // Add other necessary fields
      }
    });
    const endTime = Date.now();

    // Validate HTTP status code
    expect(createResponse.status()).toBe(201);

    // Validate response time (optional)
    expect(endTime - startTime).toBeLessThan(1000);  // Example: Less than 1 second

    // Validate response body schema and field-level checks
    const createResponseBody = await createResponse.json();
    expect(createResponseBody).toHaveProperty('id');
    expect(createResponseBody).toHaveProperty('name', 'New Learning Instance');
    expect(createResponseBody).toHaveProperty('status', 'active');  // Adjust based on expected status
    learningInstanceId = createResponseBody.id;

    // Additional functional accuracy checks can be performed here
  });

  test.afterAll(async () => {
    // Optionally, clean up created resources
    if (learningInstanceId) {
      const apiContext = await request.newContext();
      await apiContext.delete(`https://your-api-url.com/ai/learning-instance/${learningInstanceId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  });
});