import { defineRequest } from "../request";
import { CheckProofRequest } from '@/types/tonTypes';

export const getAccountInfo = defineRequest('/get-account-info', 'GET');

export const checkProof = defineRequest<CheckProofRequest, {token: string}>('/check-proof', {
  method: 'POST',
  cb: (_, res) => {
    if(res?.token) {
      window.localStorage.setItem('token', res.token);
    }
  }
});

export const generatePayload = defineRequest('/generate-payload', 'POST');