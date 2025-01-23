export const abi = {
  name: "SimpleCounter",
  types: [
    {
      name: "StateInit",
      header: null,
      fields: [
        {
          name: "code",
          type: { kind: "simple", type: "cell", optional: false },
        },
        {
          name: "data",
          type: { kind: "simple", type: "cell", optional: false },
        },
      ],
    },
    {
      name: "StdAddress",
      header: null,
      fields: [
        {
          name: "workchain",
          type: { kind: "simple", type: "int", optional: false, format: 8 },
        },
        {
          name: "address",
          type: { kind: "simple", type: "uint", optional: false, format: 256 },
        },
      ],
    },
    {
      name: "VarAddress",
      header: null,
      fields: [
        {
          name: "workchain",
          type: { kind: "simple", type: "int", optional: false, format: 32 },
        },
        {
          name: "address",
          type: { kind: "simple", type: "slice", optional: false },
        },
      ],
    },
    {
      name: "Context",
      header: null,
      fields: [
        {
          name: "bounced",
          type: { kind: "simple", type: "bool", optional: false },
        },
        {
          name: "sender",
          type: { kind: "simple", type: "address", optional: false },
        },
        {
          name: "value",
          type: { kind: "simple", type: "int", optional: false, format: 257 },
        },
        {
          name: "raw",
          type: { kind: "simple", type: "slice", optional: false },
        },
      ],
    },
    {
      name: "SendParameters",
      header: null,
      fields: [
        {
          name: "bounce",
          type: { kind: "simple", type: "bool", optional: false },
        },
        {
          name: "to",
          type: { kind: "simple", type: "address", optional: false },
        },
        {
          name: "value",
          type: { kind: "simple", type: "int", optional: false, format: 257 },
        },
        {
          name: "mode",
          type: { kind: "simple", type: "int", optional: false, format: 257 },
        },
        {
          name: "body",
          type: { kind: "simple", type: "cell", optional: true },
        },
        {
          name: "code",
          type: { kind: "simple", type: "cell", optional: true },
        },
        {
          name: "data",
          type: { kind: "simple", type: "cell", optional: true },
        },
      ],
    },
    {
      name: "Deploy",
      header: 2490013878,
      fields: [
        {
          name: "queryId",
          type: { kind: "simple", type: "uint", optional: false, format: 64 },
        },
      ],
    },
    {
      name: "DeployOk",
      header: 2952335191,
      fields: [
        {
          name: "queryId",
          type: { kind: "simple", type: "uint", optional: false, format: 64 },
        },
      ],
    },
    {
      name: "FactoryDeploy",
      header: 1829761339,
      fields: [
        {
          name: "queryId",
          type: { kind: "simple", type: "uint", optional: false, format: 64 },
        },
        {
          name: "cashback",
          type: { kind: "simple", type: "address", optional: false },
        },
      ],
    },
    {
      name: "Add",
      header: 2335447074,
      fields: [
        {
          name: "queryId",
          type: { kind: "simple", type: "uint", optional: false, format: 64 },
        },
        {
          name: "amount",
          type: { kind: "simple", type: "uint", optional: false, format: 32 },
        },
      ],
    },
    {
      name: "SimpleCounter$Data",
      header: null,
      fields: [
        {
          name: "id",
          type: { kind: "simple", type: "uint", optional: false, format: 32 },
        },
        {
          name: "counter",
          type: { kind: "simple", type: "uint", optional: false, format: 32 },
        },
      ],
    },
  ],
  receivers: [
    { receiver: "internal", message: { kind: "typed", type: "Add" } },
    { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
  ],
  getters: [
    {
      name: "counter",
      arguments: [],
      returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
    {
      name: "id",
      arguments: [],
      returnType: { kind: "simple", type: "int", optional: false, format: 257 },
    },
  ],
  errors: {
    "2": { message: "Stack underflow" },
    "3": { message: "Stack overflow" },
    "4": { message: "Integer overflow" },
    "5": { message: "Integer out of expected range" },
    "6": { message: "Invalid opcode" },
    "7": { message: "Type check error" },
    "8": { message: "Cell overflow" },
    "9": { message: "Cell underflow" },
    "10": { message: "Dictionary error" },
    "11": { message: "'Unknown' error" },
    "12": { message: "Fatal error" },
    "13": { message: "Out of gas error" },
    "14": { message: "Virtualization error" },
    "32": { message: "Action list is invalid" },
    "33": { message: "Action list is too long" },
    "34": { message: "Action is invalid or not supported" },
    "35": { message: "Invalid source address in outbound message" },
    "36": { message: "Invalid destination address in outbound message" },
    "37": { message: "Not enough TON" },
    "38": { message: "Not enough extra-currencies" },
    "39": {
      message: "Outbound message does not fit into a cell after rewriting",
    },
    "40": { message: "Cannot process a message" },
    "41": { message: "Library reference is null" },
    "42": { message: "Library change action error" },
    "43": {
      message:
        "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree",
    },
    "50": { message: "Account state size exceeded limits" },
    "128": { message: "Null reference exception" },
    "129": { message: "Invalid serialization prefix" },
    "130": { message: "Invalid incoming message" },
    "131": { message: "Constraints error" },
    "132": { message: "Access denied" },
    "133": { message: "Contract stopped" },
    "134": { message: "Invalid argument" },
    "135": { message: "Code of a contract was not found" },
    "136": { message: "Invalid address" },
    "137": { message: "Masterchain support is not enabled for this contract" },
  },
  interfaces: [
    "org.ton.introspection.v0",
    "org.ton.abi.ipfs.v0",
    "org.ton.deploy.lazy.v0",
    "org.ton.debug.v0",
    "org.ton.chain.workchain.v0",
  ],
};
