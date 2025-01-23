import { useTonConnectUI } from '@tonconnect/ui-react';
import { TonClient, Address, Contract, beginCell, toNano } from '@ton/ton';
import {  } from '@ton/core';
import getTonApiServiceInstance from '@/server/services/ton-api-service';
import { unauthorized, badRequest, ok } from '@/server/utils/http-utils';
import { CHAIN } from '@/types/tonTypes';

const client = new TonClient({ endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC' });
const contractAddressStr = "EQCaGYSWgEs2MHRXujOTcQ64Ahq4SpsPNag9vq2S63ifBhxy";

export async function GET(request: Request) {
  // try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const contractAddress = Address.parse(contractAddressStr)
    const client = getTonApiServiceInstance(CHAIN.TESTNET);
    client
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