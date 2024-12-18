import { Request } from 'express';

type Secrets = Partial<{
  EXTENSION_SECRET: string;
  MANAGEMENT_CLIENT_ID: string;
  MANAGEMENT_CLIENT_SECRET: string;
  MANAGEMENT_AUDIENCE: string;
  AUTH0_SCOPES: string;
  AUTH0_DOMAIN: string;
  AUTH0_RTA: string;
  AUTH0_MANAGE_URL: string;
  WT_URL: string;
  PUBLIC_WT_URL: string;
  ISOLATED_DOMAIN: boolean;
}>;

type Meta = Partial<{
  'auth0-extension-version'?: string;
  'auth0-extension'?: string;
  'auth0-extension-name'?: string;
}>;

export type Context = Partial<{
  body_raw: '';
  storage: { get?: () => void; set?: () => void };
  data: Secrets;
  headers: Record<string, string>;
  meta: Meta;
  params: unknown;
  query: unknown;
  secrets: Secrets;
  id: string;
  create_token: () => void;
  create_token_url: () => void;
}>;

export const ORG_CLAIM = 'https://p6m.dev/v1/org';
export const ORGS_CLAIM = 'https://p6m.dev/v1/orgs';

export type UserInfo = Partial<{
  exp: number;
  'https://p6m.dev/v1/org': string;
  'https://p6m.dev/v1/orgs': Record<string, string>;
}>;

export type RequestWithUserInfo = Request & {
  userInfo?: UserInfo;
};
