import express from 'express';
import { version } from '../../webtask.json';
import { identified } from '../middleware';
import { Context, RequestWithUserInfo } from '../types';
import { getClaim } from '../claims';
import type { ManagementClient as Auth0, Client } from 'auth0';

const fetchClients = async (
  client: Auth0,
  orgId?: string,
): Promise<Client[]> => {
  //TODO: Pagination
  const clients = await client.clients.getAll().then((c) => {
    console.log('Response from auth0 api', JSON.stringify(c));
    // Always filter!
    //  - If no orgId, only get clients without an OrganizationId in metadata (global clients)
    //  - Otherwise, make sure the provided OrganizationId matches
    return c.data.filter((c) =>
      !orgId
        ? c.client_metadata['OrganizationId'] === undefined
        : c.client_metadata['OrganizationId'] === orgId,
    );
  });

  return clients;
};

export default (ctx: Context) => {
  console.log('api route', ctx.meta);

  const auth0 = require('auth0@3.0.1');
  const client = new auth0.ManagementClient({
    clientId: ctx.secrets.MANAGEMENT_CLIENT_ID || '',
    clientSecret: ctx.secrets.MANAGEMENT_CLIENT_SECRET || '',
    domain: ctx.secrets.AUTH0_DOMAIN || '',
    audience: ctx.secrets.MANAGEMENT_AUDIENCE || '',
  }) as Auth0;

  const router = express.Router();

  router.all('/', (req, res) => {
    res
      .status(200)
      .json({ version, nodeVersion: process.version, meta: ctx.meta });
  });

  router.get('/me', identified(ctx), (req, res) => {
    const { userInfo } = req as RequestWithUserInfo;
    if (!userInfo) {
      throw new Error('Missing User Info');
    }
    res.status(200).json(userInfo);
  });

  router.get('/apps', identified(ctx), async (req, res) => {
    const org = getClaim(req, 'https://p6m.dev/v1/org');
    const orgs = getClaim(req, 'https://p6m.dev/v1/orgs');

    const orgId = (Object.entries(orgs).find(([, name]) => name === org) ||
      [])[0];

    const clients = await fetchClients(client, orgId);
    res.status(200).json(clients);
  });

  return router;
};
