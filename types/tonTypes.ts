type TonProofItem = {
  name: 'ton_proof';
  payload: string;
  state_init: string;
}

interface TonProofItemReplySuccess {
  name: 'ton_proof';
  proof: {
      timestamp: number;
      domain: {
          lengthBytes: number;
          value: string;
      };
      payload: string;
      signature: string;
  };
}

export type CheckProofRequest = {
  address: string;
  network: CHAIN;
  proof: TonProofItem | TonProofItemReplySuccess['proof'];
  public_key: string;
}

// 自定义该类型是因为nextjs服务端不支持客户端脚本，使用@tonconnect/ui-react中的CHAIN会导致接口出错
export enum CHAIN {
  MAINNET = "-239",
  TESTNET = "-3"
}