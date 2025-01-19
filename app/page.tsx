'use client';

import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useTranslations } from 'next-intl';
import { Button } from '@telegram-apps/telegram-ui';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAccountInfo, checkProof, generatePayload } from '@/server/api';
import { Account } from '@tonconnect/sdk';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckProofRequest } from '@/types/tonTypes';

export default function Home() {
  const firstProofLoading = useRef<boolean>(true);
  const t = useTranslations('i18n');
  const wallet = useTonWallet();
  const queryClient = useQueryClient();
  const [tonConnectUI] = useTonConnectUI();
  const [authorized, setAuthorized] = useState(false);
  const [tonkenParam, setTokenParam] = useState<CheckProofRequest>();

  const recreateProofPayload = useCallback(async () => {
		if (firstProofLoading.current) {
			tonConnectUI.setConnectRequestParameters({ state: 'loading' });
			firstProofLoading.current = false;
		}

		const {payload} = await generatePayload();

		if (payload) {
			tonConnectUI.setConnectRequestParameters({ state: 'ready', value: {tonProof: payload} });
		} else {
			tonConnectUI.setConnectRequestParameters(null);
		}
	}, [tonConnectUI, firstProofLoading])

  if (firstProofLoading.current) {
		recreateProofPayload();
	}

  const fetchData = async () => {
    const data = await queryClient.fetchQuery({
      queryKey: ['myData'],
      queryFn: getAccountInfo,
    });
    console.log('Fetched data:', data);
  };
  const account = wallet?.account ?? {} as Account;

  useQuery({
    queryKey: ['token'],
    enabled: !!tonkenParam,
    queryFn: () => checkProof(tonkenParam!),
  })

  // const getToken = async () => {
  //   const data = await queryClient.fetchQuery({
  //     queryKey: ['myData'],
  //     queryFn: () => checkProof(),
  //   });
  //   console.log('Fetched data:', data);
  // };

  useEffect(() => tonConnectUI.onStatusChange(w => {
    if (!w) {
      setAuthorized(false);
      return;
    }
    if (w.connectItems?.tonProof && 'proof' in w.connectItems.tonProof) {
      setTokenParam({
        address: w.account.address,
        network: w.account.chain,
        public_key: w.account.publicKey?? '',
        proof: {
          ...w.connectItems.tonProof.proof,
          state_init: w.account.walletStateInit,
        }
      });;
    }

    // if (!TonProofDemoApi.accessToken) {
    //   tonConnectUI.disconnect();
    //   setAuthorized(false);
    //   return;
    // }

    setAuthorized(true);
  }), [tonConnectUI]);

  return (
    <>
      <header>
        <LocaleSwitcher/>
      </header>
      <main>
        {t("header")}
        <TonConnectButton/>
        <Button onClick={fetchData} mode='filled'>
          获取账户信息
        </Button>

        {/* <Button onClick={() =>checkProof()} mode='filled'>
          获取token
        </Button> */}

        <Button onClick={() =>checkProof()} mode='filled'>
          获取token
        </Button>
      </main>
    </>
  );
}
