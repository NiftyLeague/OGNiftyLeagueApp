/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFTLToken, NFTLTokenInterface } from "../NFTLToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "emissionStartTimestamp",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EMISSION_PER_DAY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenIndex",
        type: "uint256",
      },
    ],
    name: "accumulated",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIndices",
        type: "uint256[]",
      },
    ],
    name: "accumulatedMultiCheck",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIndices",
        type: "uint256[]",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emissionEnd",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emissionStart",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenIndex",
        type: "uint256",
      },
    ],
    name: "getLastClaim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
    ],
    name: "setNFTAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b50604051620029c8380380620029c883398101604081905262000034916200033c565b604080518082018252600c81526b4e69667479204c656167756560a01b6020808301918252835180850190945260048452631391951360e21b90840152815191929183918391620000889160059162000296565b5080516200009e90600690602084019062000296565b50506007805460ff1916905550620000b860003362000131565b620000e47f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63362000131565b620001107f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a3362000131565b5050608081905262000127816305a39a8062000355565b60a05250620003b7565b6200014882826200017460201b6200140c1760201c565b60008281526001602090815260409091206200016f9183906200141662000184821b17901c565b505050565b620001808282620001a4565b5050565b60006200019b836001600160a01b03841662000244565b90505b92915050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1662000180576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620002003390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008181526001830160205260408120546200028d575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556200019e565b5060006200019e565b828054620002a4906200037a565b90600052602060002090601f016020900481019282620002c8576000855562000313565b82601f10620002e357805160ff191683800117855562000313565b8280016001018555821562000313579182015b8281111562000313578251825591602001919060010190620002f6565b506200032192915062000325565b5090565b5b8082111562000321576000815560010162000326565b6000602082840312156200034e578081fd5b5051919050565b600082198211156200037557634e487b7160e01b81526011600452602481fd5b500190565b600181811c908216806200038f57607f821691505b60208210811415620003b157634e487b7160e01b600052602260045260246000fd5b50919050565b60805160a0516125b362000415600039600081816103ed0152818161122d0152818161125f0152611286015260008181610336015281816108bf01528181610a89015281816110c7015281816111e101526112e001526125b36000f3fe608060405234801561001057600080fd5b506004361061021c5760003560e01c80636ba4c13811610125578063a217fddf116100ad578063ca15c8731161007c578063ca15c873146104b1578063d5391393146104c4578063d547741f146104eb578063dd62ed3e146104fe578063e63ab1e91461053757600080fd5b8063a217fddf14610470578063a457c2d714610478578063a9059cbb1461048b578063c607cde71461049e57600080fd5b80638456cb59116100f45780638456cb591461040f5780639010d07c1461041757806391716d051461044257806391d148541461045557806395d89b411461046857600080fd5b80636ba4c1381461039957806370a08231146103ac57806379cc6790146103d55780638368909c146103e857600080fd5b806339509351116101a8578063513da94811610177578063513da9481461033157806358b07663146103585780635c975abb1461036b5780636397f7a21461037657806369d037381461038657600080fd5b806339509351146102f05780633f4ba83a1461030357806340c10f191461030b57806342966c681461031e57600080fd5b806323b872dd116101ef57806323b872dd14610283578063248a9ca3146102965780632f2ff15d146102b9578063313ce567146102ce57806336568abe146102dd57600080fd5b806301ffc9a71461022157806306fdde0314610249578063095ea7b31461025e57806318160ddd14610271575b600080fd5b61023461022f3660046122df565b61055e565b60405190151581526020015b60405180910390f35b610251610589565b6040516102409190612394565b61023461026c366004612197565b61061b565b6004545b604051908152602001610240565b610234610291366004612157565b610631565b6102756102a4366004612282565b60009081526020819052604090206001015490565b6102cc6102c736600461229a565b6106e0565b005b60405160128152602001610240565b6102cc6102eb36600461229a565b610707565b6102346102fe366004612197565b610729565b6102cc610765565b6102cc610319366004612197565b61080b565b6102cc61032c366004612282565b6108ae565b6102757f000000000000000000000000000000000000000000000000000000000000000081565b6102756103663660046121c2565b6108bb565b60075460ff16610234565b6102756803b6888d08618be00081565b6102cc6103943660046120e7565b610a0f565b6102756103a73660046121c2565b610a85565b6102756103ba3660046120e7565b6001600160a01b031660009081526002602052604090205490565b6102cc6103e3366004612197565b610dfe565b6102757f000000000000000000000000000000000000000000000000000000000000000081565b6102cc610e7f565b61042a6104253660046122be565b610f23565b6040516001600160a01b039091168152602001610240565b610275610450366004612282565b610f42565b61023461046336600461229a565b6110ff565b610251611128565b610275600081565b610234610486366004612197565b611137565b610234610499366004612197565b6111d0565b6102756104ac366004612282565b6111dd565b6102756104bf366004612282565b6113eb565b6102757f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102cc6104f936600461229a565b611402565b61027561050c36600461211f565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b6102757f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b60006001600160e01b03198216635a05180f60e01b148061058357506105838261142b565b92915050565b606060058054610598906124e6565b80601f01602080910402602001604051908101604052809291908181526020018280546105c4906124e6565b80156106115780601f106105e657610100808354040283529160200191610611565b820191906000526020600020905b8154815290600101906020018083116105f457829003601f168201915b5050505050905090565b6000610628338484611460565b50600192915050565b600061063e848484611584565b6001600160a01b0384166000908152600360209081526040808320338452909152902054828110156106c85760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6106d58533858403611460565b506001949350505050565b6106ea828261175f565b60008281526001602052604090206107029082611416565b505050565b6107118282611785565b600082815260016020526040902061070290826117ff565b3360008181526003602090815260408083206001600160a01b03871684529091528120549091610628918590610760908690612435565b611460565b61078f7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a336110ff565b6108015760405162461bcd60e51b815260206004820152603960248201527f45524332305072657365744d696e7465725061757365723a206d75737420686160448201527f76652070617573657220726f6c6520746f20756e70617573650000000000000060648201526084016106bf565b610809611814565b565b6108357f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6336110ff565b6108a05760405162461bcd60e51b815260206004820152603660248201527f45524332305072657365744d696e7465725061757365723a206d7573742068616044820152751d99481b5a5b9d195c881c9bdb19481d1bc81b5a5b9d60521b60648201526084016106bf565b6108aa82826118a7565b5050565b6108b83382611992565b50565b60007f000000000000000000000000000000000000000000000000000000000000000042116108fc5760405162461bcd60e51b81526004016106bf906123fe565b6000805b8351811015610a0857600084828151811061092b57634e487b7160e01b600052603260045260246000fd5b60200260200101519050600960009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561098357600080fd5b505afa158015610997573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109bb9190612307565b8111156109da5760405162461bcd60e51b81526004016106bf906123c7565b60006109e5826111dd565b90506109f18185612435565b935050508080610a0090612521565b915050610900565b5092915050565b6000610a1b8133611aec565b6009546001600160a01b031615610a625760405162461bcd60e51b815260206004820152600b60248201526a105b1c9958591e481cd95d60aa1b60448201526064016106bf565b50600980546001600160a01b0319166001600160a01b0392909216919091179055565b60007f00000000000000000000000000000000000000000000000000000000000000004211610ac65760405162461bcd60e51b81526004016106bf906123fe565b6000805b8351811015610db057600960009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015610b2157600080fd5b505afa158015610b35573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b599190612307565b848281518110610b7957634e487b7160e01b600052603260045260246000fd5b60200260200101511115610b9f5760405162461bcd60e51b81526004016106bf906123c7565b6000610bac826001612435565b90505b8451811015610c6057848181518110610bd857634e487b7160e01b600052603260045260246000fd5b6020026020010151858381518110610c0057634e487b7160e01b600052603260045260246000fd5b60200260200101511415610c4e5760405162461bcd60e51b8152602060048201526015602482015274088eae0d8d2c6c2e8ca40e8ded6cadc40d2dcc8caf605b1b60448201526064016106bf565b80610c5881612521565b915050610baf565b506000848281518110610c8357634e487b7160e01b600052603260045260246000fd5b60200260200101519050610c943390565b6009546040516331a9108f60e11b8152600481018490526001600160a01b039283169290911690636352211e9060240160206040518083038186803b158015610cdc57600080fd5b505afa158015610cf0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d149190612103565b6001600160a01b031614610d6a5760405162461bcd60e51b815260206004820152601760248201527f53656e646572206973206e6f7420746865206f776e657200000000000000000060448201526064016106bf565b6000610d75826111dd565b90508015610d9b57610d878185612435565b600083815260086020526040902042905593505b50508080610da890612521565b915050610aca565b5080610df45760405162461bcd60e51b8152602060048201526013602482015272139bc81858d8dd5b5d5b185d19590813919513606a1b60448201526064016106bf565b61058333826118a7565b6000610e0a833361050c565b905081811015610e685760405162461bcd60e51b8152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f77604482015263616e636560e01b60648201526084016106bf565b610e758333848403611460565b6107028383611992565b610ea97f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a336110ff565b610f1b5760405162461bcd60e51b815260206004820152603760248201527f45524332305072657365744d696e7465725061757365723a206d75737420686160448201527f76652070617573657220726f6c6520746f20706175736500000000000000000060648201526084016106bf565b610809611b50565b6000828152600160205260408120610f3b9083611bcb565b9392505050565b600954604080516318160ddd60e01b815290516000926001600160a01b0316916318160ddd916004808301926020929190829003018186803b158015610f8757600080fd5b505afa158015610f9b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fbf9190612307565b821115610fde5760405162461bcd60e51b81526004016106bf906123c7565b6009546040516331a9108f60e11b8152600481018490526000916001600160a01b031690636352211e9060240160206040518083038186803b15801561102357600080fd5b505afa158015611037573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061105b9190612103565b6001600160a01b031614156110b25760405162461bcd60e51b815260206004820152601960248201527f4f776e65722063616e6e6f74206265203020616464726573730000000000000060448201526064016106bf565b6000828152600860205260408120546110eb577f0000000000000000000000000000000000000000000000000000000000000000610f3b565b505060009081526008602052604090205490565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b606060068054610598906124e6565b3360009081526003602090815260408083206001600160a01b0386168452909152812054828110156111b95760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016106bf565b6111c63385858403611460565b5060019392505050565b6000610628338484611584565b60007f0000000000000000000000000000000000000000000000000000000000000000421161121e5760405162461bcd60e51b81526004016106bf906123fe565b600061122983610f42565b90507f0000000000000000000000000000000000000000000000000000000000000000811061125b5750600092915050565b60007f000000000000000000000000000000000000000000000000000000000000000042106112aa577f00000000000000000000000000000000000000000000000000000000000000006112ac565b425b90506000620151806803b6888d08618be0006112c8858561248c565b6112d2919061246d565b6112dc919061244d565b90507f00000000000000000000000000000000000000000000000000000000000000008314156113e35761251c8511801561131857506126ad85105b15611338576113318169048d8470181e32700000612435565b90506113e3565b612134851115611356576113318169032d26d12e980b600000612435565b611964851115611374576113318169021e19e0c9bab2400000612435565b61119485111561139257611331816901b1ae4d6e2ef5000000612435565b6109c48511156113b0576113318169014542ba12a337c00000612435565b6103e88511156113cd576113318168d8d726b7177a800000612435565b6113e081686c6b935b8bbd400000612435565b90505b949350505050565b600081815260016020526040812061058390611bd7565b6107118282611be1565b6108aa8282611c07565b6000610f3b836001600160a01b038416611c8b565b60006001600160e01b03198216637965db0b60e01b148061058357506301ffc9a760e01b6001600160e01b0319831614610583565b6001600160a01b0383166114c25760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016106bf565b6001600160a01b0382166115235760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016106bf565b6001600160a01b0383811660008181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166115e85760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016106bf565b6001600160a01b03821661164a5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016106bf565b611655838383611cda565b6001600160a01b038316600090815260026020526040902054818110156116cd5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016106bf565b6001600160a01b03808516600090815260026020526040808220858503905591851681529081208054849290611704908490612435565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161175091815260200190565b60405180910390a35b50505050565b60008281526020819052604090206001015461177b8133611aec565b6107028383611c07565b6001600160a01b03811633146117f55760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016106bf565b6108aa8282611ce5565b6000610f3b836001600160a01b038416611d4a565b60075460ff1661185d5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016106bf565b6007805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b0382166118fd5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016106bf565b61190960008383611cda565b806004600082825461191b9190612435565b90915550506001600160a01b03821660009081526002602052604081208054839290611948908490612435565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0382166119f25760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016106bf565b6119fe82600083611cda565b6001600160a01b03821660009081526002602052604090205481811015611a725760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016106bf565b6001600160a01b0383166000908152600260205260408120838303905560048054849290611aa190849061248c565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b611af682826110ff565b6108aa57611b0e816001600160a01b03166014611e67565b611b19836020611e67565b604051602001611b2a92919061231f565b60408051601f198184030181529082905262461bcd60e51b82526106bf91600401612394565b60075460ff1615611b965760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016106bf565b6007805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861188a3390565b6000610f3b8383612049565b6000610583825490565b600082815260208190526040902060010154611bfd8133611aec565b6107028383611ce5565b611c1182826110ff565b6108aa576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055611c473390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000818152600183016020526040812054611cd257508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610583565b506000610583565b610702838383612081565b611cef82826110ff565b156108aa576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60008181526001830160205260408120548015611e5d576000611d6e60018361248c565b8554909150600090611d829060019061248c565b9050818114611e03576000866000018281548110611db057634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080876000018481548110611de157634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611e2257634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610583565b6000915050610583565b60606000611e7683600261246d565b611e81906002612435565b67ffffffffffffffff811115611ea757634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611ed1576020820181803683370190505b509050600360fc1b81600081518110611efa57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611f3757634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000611f5b84600261246d565b611f66906001612435565b90505b6001811115611ffa576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611fa857634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110611fcc57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93611ff3816124cf565b9050611f69565b508315610f3b5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016106bf565b600082600001828154811061206e57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b60075460ff16156107025760405162461bcd60e51b815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e736665722077686044820152691a5b19481c185d5cd95960b21b60648201526084016106bf565b6000602082840312156120f8578081fd5b8135610f3b81612568565b600060208284031215612114578081fd5b8151610f3b81612568565b60008060408385031215612131578081fd5b823561213c81612568565b9150602083013561214c81612568565b809150509250929050565b60008060006060848603121561216b578081fd5b833561217681612568565b9250602084013561218681612568565b929592945050506040919091013590565b600080604083850312156121a9578182fd5b82356121b481612568565b946020939093013593505050565b600060208083850312156121d4578182fd5b823567ffffffffffffffff808211156121eb578384fd5b818501915085601f8301126121fe578384fd5b81358181111561221057612210612552565b8060051b604051601f19603f8301168101818110858211171561223557612235612552565b604052828152858101935084860182860187018a1015612253578788fd5b8795505b83861015612275578035855260019590950194938601938601612257565b5098975050505050505050565b600060208284031215612293578081fd5b5035919050565b600080604083850312156122ac578182fd5b82359150602083013561214c81612568565b600080604083850312156122d0578182fd5b50508035926020909101359150565b6000602082840312156122f0578081fd5b81356001600160e01b031981168114610f3b578182fd5b600060208284031215612318578081fd5b5051919050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516123578160178501602088016124a3565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516123888160288401602088016124a3565b01602801949350505050565b60208152600082518060208401526123b38160408501602087016124a3565b601f01601f19169190910160400192915050565b6020808252601c908201527f4e465420617420696e646578206e6f74206265656e206d696e74656400000000604082015260600190565b6020808252601c908201527f456d697373696f6e20686173206e6f7420737461727465642079657400000000604082015260600190565b600082198211156124485761244861253c565b500190565b60008261246857634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156124875761248761253c565b500290565b60008282101561249e5761249e61253c565b500390565b60005b838110156124be5781810151838201526020016124a6565b838111156117595750506000910152565b6000816124de576124de61253c565b506000190190565b600181811c908216806124fa57607f821691505b6020821081141561251b57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156125355761253561253c565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146108b857600080fdfea26469706673582212202abcfea310e34c81a5a64b30753b4761a8cd20f4536e1444bfb356dbad2f414364736f6c63430008040033";

export class NFTLToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    emissionStartTimestamp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFTLToken> {
    return super.deploy(
      emissionStartTimestamp,
      overrides || {}
    ) as Promise<NFTLToken>;
  }
  getDeployTransaction(
    emissionStartTimestamp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(emissionStartTimestamp, overrides || {});
  }
  attach(address: string): NFTLToken {
    return super.attach(address) as NFTLToken;
  }
  connect(signer: Signer): NFTLToken__factory {
    return super.connect(signer) as NFTLToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTLTokenInterface {
    return new utils.Interface(_abi) as NFTLTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTLToken {
    return new Contract(address, _abi, signerOrProvider) as NFTLToken;
  }
}
