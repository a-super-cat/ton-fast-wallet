import { getHttpV4Endpoint } from '@orbs-network/ton-access';
import { TonClient4 } from '@ton/ton';
import { useAsyncInitialize } from './useAsyncInitialize';
const client: { value?: TonClient4 } = {};

export const useTonClient = () => {
  return useAsyncInitialize(async () => {
    if (client.value) {
      return client.value;
    }
    const endpoint = await getHttpV4Endpoint({ network: 'testnet' });
    client.value = new TonClient4({ endpoint });
    return client.value;
  }, []);
}