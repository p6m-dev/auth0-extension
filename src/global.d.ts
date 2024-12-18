import { RequestInfo, RequestInit, Response } from 'node-fetch';

declare global {
  var fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
  var Request: typeof import('node-fetch').Request;
  var Response: typeof import('node-fetch').Response;
  var Headers: typeof import('node-fetch').Headers;
}
