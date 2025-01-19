import { useTonConnectUI } from '@tonconnect/ui-react';
import { TonClient, Address, Contract, beginCell, toNano } from '@ton/ton';
import { TonApiService } from '@/server/services/ton-api-service';
import { unauthorized, badRequest, ok } from '@/server/utils/http-utils';
import { verifyToken, decodeAuthToken } from '@/server/utils/jwt';

const client = new TonClient({ endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC' });

export async function GET(request: Request) {
  // try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    console.log('some-------->',request);
    return ok({message: 'Hello World'});

  //   if (!token || !await verifyToken(token)) {
  //     return unauthorized({error: 'Unauthorized'});
  //   }

  //   const payload = decodeAuthToken(token);
  //   if (!payload?.address || !payload?.network) {
  //     return unauthorized({error: 'Invalid token'});
  //   }
  //   const client = TonApiService.create(payload.network);

  //   return ok(await client.getAccountInfo(payload.address));
  // } catch (e) {
  //   return badRequest({error: 'Invalid request', trace: e});
  // }
}