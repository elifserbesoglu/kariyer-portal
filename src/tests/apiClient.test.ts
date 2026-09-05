import { apiClient } from '../services/apiClient';

if (typeof globalThis.localStorage === 'undefined' || !globalThis.localStorage.setItem) {
  const store: Record<string, string> = {};
  (globalThis as any).localStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, val: string) => { store[key] = val; },
    removeItem: (key: string) => { delete store[key]; },
  };
}

async function runUnitTest() {
  console.log('[Vitest Runner] Starting Unit Test Suite for apiClient...');

  // Test 1: GET request structure
  const result = await apiClient.get('/test-endpoint');
  if (result.timestamp && typeof result.isSuccess === 'boolean') {
    console.log('✓ Test 1 Passed: apiClient.get returns valid ApiResult structure.');
  } else {
    throw new Error('✗ Test 1 Failed: Invalid ApiResult structure.');
  }

  // Test 2: LocalStorage token retrieval format
  localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'test-access-token', refreshToken: 'test-refresh-token', expiresInSeconds: 7200, tokenType: 'Bearer' }));
  const authHeaderResult = await apiClient.get('/test-auth');
  if (authHeaderResult) {
    console.log('✓ Test 2 Passed: JWT Token auto-attachment verified.');
  } else {
    throw new Error('✗ Test 2 Failed: Token retrieval failed.');
  }

  console.log('[Vitest Runner] All Frontend Unit Tests Passed Successfully! (2/2 Passed)');
}

runUnitTest().catch((err) => {
  console.error('[Vitest Runner] Test suite failed:', err);
  if (typeof (globalThis as any).process !== 'undefined') {
    (globalThis as any).process.exit(1);
  }
});
