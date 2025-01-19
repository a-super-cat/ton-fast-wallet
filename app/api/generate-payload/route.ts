import { TonProofService } from "@/server/services/ton-proof-service";
import { badRequest, ok } from "@/server/utils/http-utils";
import { createPayloadToken } from "@/server/utils/jwt";

export async function POST() {
  try {
    const service = new TonProofService();

    const payload = service.generatePayload();
    const payloadToken = await createPayloadToken({payload: payload});

    return ok({payload: payloadToken});
  } catch (e) {
    return badRequest({error: 'Invalid request', trace: e});
  }
}