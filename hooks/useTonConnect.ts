import { useTonConnectUI } from "@tonconnect/ui-react";
import { Sender, SenderArguments } from "@ton/core";

export const useTonConnect = () => {
  const [tonConnectUI] = useTonConnectUI();

  return {
    tonConnectUI,
    sender: {
      send: async (args: SenderArguments) => {
        console.log('some--------', args)
        if (!tonConnectUI) {
          return;
        }
        tonConnectUI.sendTransaction({
          validUntil: Date.now() + 1000 * 60 * 5,
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
        });
      },
    },
    connected: tonConnectUI?.connected,
  };
};
