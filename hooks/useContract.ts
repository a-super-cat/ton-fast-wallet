import { useEffect, useState } from 'react';
import { SimpleCounter } from '@/contracts/SimpleCounter';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';
import { useTonConnect } from './useTonConnect';

export const useContract = () => {
  const client = useTonClient();
  const { sender } = useTonConnect();
  const [contractData, setContractData] = useState< {
    conter_value: bigint;
    recent_sender: string;
    owner_address: string;
  } | null>(null);

  const contract = useAsyncInitialize(async () => {
    if (!client) {
      return null;
    }
    const address = Address.parse('kQAdLSwzxzvDG10kGGoNPj2TaDwrpPt1XEtLeW8LlNm6uPn9');
    const contractInstance = SimpleCounter.fromAddress(address);
    const opened = await client.open(contractInstance);
    return opened;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!contract) {
        return;
      }
      setContractData(null);
      const val = await contract.getCounter();
      setContractData({
        conter_value: val,
        recent_sender: '',
        owner_address: '',
      });
    }
    getValue();
  }, [contract]);
  return {
    contract,
    contract_address: contract?.address.toString(),
    ...contractData,
    sendIncress: async () => {
      return contract?.send(sender, {
        value: toNano('0.05'),
      }, {
        $$type: 'Add',
        queryId: 0n,
        amount: 6n,
      });
    }
  }
}