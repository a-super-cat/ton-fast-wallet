import { CheckProofRequest } from "@/server/dto/check-proof-request-dto";
import { TonApiService } from "@/server/services/ton-api-service";
import { TonProofService } from "@/server/services/ton-proof-service";
import { badRequest, ok } from "@/server/utils/http-utils";
import { createAuthToken } from "@/server/utils/jwt";
import { JWTPayload, jwtVerify } from "jose";

const JWT_SECRET_KEY = 'your_secret_key';

async function verifyToken(token: string): Promise<JWTPayload | null> {
  const encoder = new TextEncoder();
  const key = encoder.encode(JWT_SECRET_KEY);
  try {
    const {payload} = await jwtVerify(token, key);
    return payload;
  } catch (e) {
    return null;
  }
}


export async function POST(request: Request) {
  try {
    const body = CheckProofRequest.parse(await request.json());
    const tonApiService = TonApiService.create(body.network);
    const service = new TonProofService();

    const isValid = await service.checkProof(body, (address) => tonApiService.getWalletPublicKey(address));
    if (!isValid) {
      return badRequest({error: 'Invalid proof'});
    }

    const payloadToken = body.proof.payload;
    if (!await verifyToken(payloadToken)) {
      return badRequest({error: 'Invalid token'});
    }

    const token = await createAuthToken({address: body.address, network: body.network});
    console.log('token', token);

    return ok({token: token});
  } catch (e: any) {
    return badRequest({error: 'Invalid request', trace: e});
  }
}