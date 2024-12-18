import express from 'express';
import { version } from '../../webtask.json';
import { identified } from '../auth/middleware';
import { Context, RequestWithUserInfo } from '../types';
import { ManagementClient, Client } from 'auth0';
import { getClaim } from '../claims';

const fetchClients = async (
  auth0: ManagementClient,
  orgId?: string,
): Promise<Client[]> => {
  //TODO: Pagination
  const clients = await auth0.clients.getAll().then((c) => {
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

  const auth0 = new ManagementClient({
    clientId: ctx.secrets.MANAGEMENT_CLIENT_ID || '',
    clientSecret: ctx.secrets.MANAGEMENT_CLIENT_SECRET || '',
    domain: ctx.secrets.AUTH0_DOMAIN || '',
    audience: ctx.secrets.MANAGEMENT_AUDIENCE || '',
  });

  const router = express.Router();

  router.all('/', (req, res) => {
    res.status(200).json({ version, meta: ctx.meta });
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

    const clients = await fetchClients(auth0, orgId);
    res.status(200).json(clients);
  });

  return router;
};
