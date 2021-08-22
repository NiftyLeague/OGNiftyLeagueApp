/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  NiftyLeagueCharacter,
  NiftyLeagueCharacterInterface,
} from "../NiftyLeagueCharacter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "nftlAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
    inputs: [],
    name: "getRemovedTraits",
    outputs: [
      {
        internalType: "uint16[]",
        name: "",
        type: "uint16[]",
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
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        internalType: "uint256",
        name: "trait",
        type: "uint256",
      },
    ],
    name: "isAvailableTrait",
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
        internalType: "uint256",
        name: "traitCombo",
        type: "uint256",
      },
    ],
    name: "isUnique",
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
    name: "owner",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
    inputs: [],
    name: "pauseMinting",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpauseMinting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b5060405162001ab838038062001ab8833981016040819052620000349162000254565b8151829082906200004d906000906020850190620000fb565b50805162000063906001906020840190620000fb565b505050620000806200007a620000a560201b60201c565b620000a9565b50506006805460ff60a01b1916905560601b6001600160601b0319166080526200032d565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b8280546200010990620002da565b90600052602060002090601f0160209004810192826200012d576000855562000178565b82601f106200014857805160ff191683800117855562000178565b8280016001018555821562000178579182015b82811115620001785782518255916020019190600101906200015b565b50620001869291506200018a565b5090565b5b808211156200018657600081556001016200018b565b600082601f830112620001b2578081fd5b81516001600160401b0380821115620001cf57620001cf62000317565b604051601f8301601f19908116603f01168101908282118183101715620001fa57620001fa62000317565b8160405283815260209250868385880101111562000216578485fd5b8491505b838210156200023957858201830151818301840152908201906200021a565b838211156200024a57848385830101525b9695505050505050565b60008060006060848603121562000269578283fd5b83516001600160a01b038116811462000280578384fd5b60208501519093506001600160401b03808211156200029d578384fd5b620002ab87838801620001a1565b93506040860151915080821115620002c1578283fd5b50620002d086828701620001a1565b9150509250925092565b600181811c90821680620002ef57607f821691505b602082108114156200031157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b60805160601c61176f620003496000396000505061176f6000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c80636352211e116100c3578063ae2003221161007c578063ae200322146102d4578063b88d4fde146102dc578063c87b56dd146102ef578063da8fbf2a14610302578063e985e9c51461030a578063f2fde38b1461034657600080fd5b80636352211e1461026c57806370a082311461027f578063715018a6146102a05780638da5cb5b146102a857806395d89b41146102b9578063a22cb465146102c157600080fd5b80631656efc6116101155780631656efc6146101f357806317bed2c51461021757806323b872dd1461022c5780633ccfd60b1461023f57806342842e0e146102475780635c975abb1461025a57600080fd5b806301ffc9a71461015257806306fdde031461017a5780630750d2fb1461018f578063081812fc146101b3578063095ea7b3146101de575b600080fd5b6101656101603660046113ed565b610359565b60405190151581526020015b60405180910390f35b6101826103ab565b604051610171919061151d565b61016561019d366004611425565b60009081526008602052604090205460ff161590565b6101c66101c1366004611425565b61043d565b6040516001600160a01b039091168152602001610171565b6101f16101ec3660046113c4565b6104d7565b005b610165610201366004611425565b60009081526009602052604090205460ff161590565b61021f6105ed565b60405161017191906114d5565b6101f161023a36600461127a565b61066c565b6101f161069d565b6101f161025536600461127a565b6106fa565b600654600160a01b900460ff16610165565b6101c661027a366004611425565b610715565b61029261028d36600461122e565b61078c565b604051908152602001610171565b6101f1610813565b6006546001600160a01b03166101c6565b610182610849565b6101f16102cf36600461138a565b610858565b6101f161091d565b6101f16102ea3660046112b5565b61094f565b6101826102fd366004611425565b610987565b6101f1610a6f565b610165610318366004611248565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101f161035436600461122e565b610aa1565b60006001600160e01b031982166380ac58cd60e01b148061038a57506001600160e01b03198216635b5e139f60e01b145b806103a557506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546103ba90611677565b80601f01602080910402602001604051908101604052809291908181526020018280546103e690611677565b80156104335780601f1061040857610100808354040283529160200191610433565b820191906000526020600020905b81548152906001019060200180831161041657829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166104bb5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006104e282610715565b9050806001600160a01b0316836001600160a01b031614156105505760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016104b2565b336001600160a01b038216148061056c575061056c8133610318565b6105de5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016104b2565b6105e88383610b3c565b505050565b6060600a80548060200260200160405190810160405280929190818152602001828054801561043357602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff168152602001906002019060208260010104928301926001038202915080841161062a5790505050505050905090565b6106763382610baa565b6106925760405162461bcd60e51b81526004016104b2906115b7565b6105e8838383610ca1565b6006546001600160a01b031633146106c75760405162461bcd60e51b81526004016104b290611582565b6040514790339082156108fc029083906000818181858888f193505050501580156106f6573d6000803e3d6000fd5b5050565b6105e88383836040518060200160405280600081525061094f565b6000818152600260205260408120546001600160a01b0316806103a55760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016104b2565b60006001600160a01b0382166107f75760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016104b2565b506001600160a01b031660009081526003602052604090205490565b6006546001600160a01b0316331461083d5760405162461bcd60e51b81526004016104b290611582565b6108476000610e41565b565b6060600180546103ba90611677565b6001600160a01b0382163314156108b15760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104b2565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6006546001600160a01b031633146109475760405162461bcd60e51b81526004016104b290611582565b610847610e93565b6109593383610baa565b6109755760405162461bcd60e51b81526004016104b2906115b7565b61098184848484610f30565b50505050565b6000818152600260205260409020546060906001600160a01b0316610a065760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016104b2565b6000610a1d60408051602081019091526000815290565b90506000815111610a3d5760405180602001604052806000815250610a68565b80610a4784610f63565b604051602001610a58929190611469565b6040516020818303038152906040525b9392505050565b6006546001600160a01b03163314610a995760405162461bcd60e51b81526004016104b290611582565b61084761107d565b6006546001600160a01b03163314610acb5760405162461bcd60e51b81526004016104b290611582565b6001600160a01b038116610b305760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104b2565b610b3981610e41565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610b7182610715565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610c235760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016104b2565b6000610c2e83610715565b9050806001600160a01b0316846001600160a01b03161480610c695750836001600160a01b0316610c5e8461043d565b6001600160a01b0316145b80610c9957506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610cb482610715565b6001600160a01b031614610d1c5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016104b2565b6001600160a01b038216610d7e5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016104b2565b610d89600082610b3c565b6001600160a01b0383166000908152600360205260408120805460019290610db2908490611634565b90915550506001600160a01b0382166000908152600360205260408120805460019290610de0908490611608565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600654600160a01b900460ff16610ee35760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016104b2565b6006805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b610f3b848484610ca1565b610f4784848484611105565b6109815760405162461bcd60e51b81526004016104b290611530565b606081610f875750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610fb15780610f9b816116b2565b9150610faa9050600a83611620565b9150610f8b565b60008167ffffffffffffffff811115610fda57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611004576020820181803683370190505b5090505b8415610c9957611019600183611634565b9150611026600a866116cd565b611031906030611608565b60f81b81838151811061105457634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350611076600a86611620565b9450611008565b600654600160a01b900460ff16156110ca5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104b2565b6006805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610f133390565b60006001600160a01b0384163b1561120757604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611149903390899088908890600401611498565b602060405180830381600087803b15801561116357600080fd5b505af1925050508015611193575060408051601f3d908101601f1916820190925261119091810190611409565b60015b6111ed573d8080156111c1576040519150601f19603f3d011682016040523d82523d6000602084013e6111c6565b606091505b5080516111e55760405162461bcd60e51b81526004016104b290611530565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c99565b506001949350505050565b80356001600160a01b038116811461122957600080fd5b919050565b60006020828403121561123f578081fd5b610a6882611212565b6000806040838503121561125a578081fd5b61126383611212565b915061127160208401611212565b90509250929050565b60008060006060848603121561128e578081fd5b61129784611212565b92506112a560208501611212565b9150604084013590509250925092565b600080600080608085870312156112ca578081fd5b6112d385611212565b93506112e160208601611212565b925060408501359150606085013567ffffffffffffffff80821115611304578283fd5b818701915087601f830112611317578283fd5b8135818111156113295761132961170d565b604051601f8201601f19908116603f011681019083821181831017156113515761135161170d565b816040528281528a6020848701011115611369578586fd5b82602086016020830137918201602001949094529598949750929550505050565b6000806040838503121561139c578182fd5b6113a583611212565b9150602083013580151581146113b9578182fd5b809150509250929050565b600080604083850312156113d6578182fd5b6113df83611212565b946020939093013593505050565b6000602082840312156113fe578081fd5b8135610a6881611723565b60006020828403121561141a578081fd5b8151610a6881611723565b600060208284031215611436578081fd5b5035919050565b6000815180845261145581602086016020860161164b565b601f01601f19169290920160200192915050565b6000835161147b81846020880161164b565b83519083019061148f81836020880161164b565b01949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906114cb9083018461143d565b9695505050505050565b6020808252825182820181905260009190848201906040850190845b8181101561151157835161ffff16835292840192918401916001016114f1565b50909695505050505050565b602081526000610a68602083018461143d565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b6000821982111561161b5761161b6116e1565b500190565b60008261162f5761162f6116f7565b500490565b600082821015611646576116466116e1565b500390565b60005b8381101561166657818101518382015260200161164e565b838111156109815750506000910152565b600181811c9082168061168b57607f821691505b602082108114156116ac57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156116c6576116c66116e1565b5060010190565b6000826116dc576116dc6116f7565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610b3957600080fdfea26469706673582212206ce5a23117a1443177aed473e326a38a6d6f959e951bfcd1d5e53af84855ead664736f6c63430008040033";

export class NiftyLeagueCharacter__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    nftlAddress: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NiftyLeagueCharacter> {
    return super.deploy(
      nftlAddress,
      name,
      symbol,
      overrides || {}
    ) as Promise<NiftyLeagueCharacter>;
  }
  getDeployTransaction(
    nftlAddress: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      nftlAddress,
      name,
      symbol,
      overrides || {}
    );
  }
  attach(address: string): NiftyLeagueCharacter {
    return super.attach(address) as NiftyLeagueCharacter;
  }
  connect(signer: Signer): NiftyLeagueCharacter__factory {
    return super.connect(signer) as NiftyLeagueCharacter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NiftyLeagueCharacterInterface {
    return new utils.Interface(_abi) as NiftyLeagueCharacterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NiftyLeagueCharacter {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as NiftyLeagueCharacter;
  }
}
