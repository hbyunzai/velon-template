import type { MockMethod } from 'vite-plugin-mock';

const apis: MockMethod[] = [
  {
    url: '/api/demo',
    method: 'post',
    timeout: 5000,
    response: () => {
      return {
        code: 0,
        data: { type: 'success' }
      };
    }
  },
  {
    url: '/api/demo',
    method: 'get',
    timeout: 5000,
    response: () => {
      return {
        code: 0,
        data: { type: 'success' }
      };
    }
  }
];
export default apis;
