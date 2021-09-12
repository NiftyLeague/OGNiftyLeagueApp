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
import type { TokenTimelock, TokenTimelockInterface } from "../TokenTimelock";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token_",
        type: "address",
      },
      {
        internalType: "address",
        name: "beneficiary_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "releaseTime_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "beneficiary",
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
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "releaseTime",
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
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60e060405234801561001057600080fd5b5060405161096438038061096483398101604081905261002f916100c0565b42811161009d5760405162461bcd60e51b815260206004820152603260248201527f546f6b656e54696d656c6f636b3a2072656c656173652074696d65206973206260448201527165666f72652063757272656e742074696d6560701b606482015260840160405180910390fd5b6001600160601b0319606093841b81166080529190921b1660a05260c05261011a565b6000806000606084860312156100d4578283fd5b83516100df81610102565b60208501519093506100f081610102565b80925050604084015190509250925092565b6001600160a01b038116811461011757600080fd5b50565b60805160601c60a05160601c60c0516107fd6101676000396000818160ac015260fd0152600081816053015261034001526000818160d7015281816101b4015261031e01526107fd6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806338af3eed1461005157806386d1a69f1461009d578063b91d4001146100a7578063fc0c546a146100d5575b600080fd5b7f00000000000000000000000000000000000000000000000000000000000000005b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100a56100fb565b005b6040517f00000000000000000000000000000000000000000000000000000000000000008152602001610094565b7f0000000000000000000000000000000000000000000000000000000000000000610073565b7f00000000000000000000000000000000000000000000000000000000000000004210156101b0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f546f6b656e54696d656c6f636b3a2063757272656e742074696d65206973206260448201527f65666f72652072656c656173652074696d65000000000000000000000000000060648201526084015b60405180910390fd5b60007f00000000000000000000000000000000000000000000000000000000000000006040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a082319060240160206040518083038186803b15801561023a57600080fd5b505afa15801561024e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102729190610712565b905060008111610304576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f546f6b656e54696d656c6f636b3a206e6f20746f6b656e7320746f2072656c6560448201527f617365000000000000000000000000000000000000000000000000000000000060648201526084016101a7565b61036573ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000167f000000000000000000000000000000000000000000000000000000000000000083610368565b50565b6040805173ffffffffffffffffffffffffffffffffffffffff8416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001790526103f59084906103fa565b505050565b600061045c826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166105069092919063ffffffff16565b8051909150156103f5578080602001905181019061047a91906106f2565b6103f5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016101a7565b6060610515848460008561051f565b90505b9392505050565b6060824710156105b1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016101a7565b843b610619576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016101a7565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610642919061072a565b60006040518083038185875af1925050503d806000811461067f576040519150601f19603f3d011682016040523d82523d6000602084013e610684565b606091505b509150915061069482828661069f565b979650505050505050565b606083156106ae575081610518565b8251156106be5782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101a79190610746565b600060208284031215610703578081fd5b81518015158114610518578182fd5b600060208284031215610723578081fd5b5051919050565b6000825161073c818460208701610797565b9190910192915050565b6020815260008251806020840152610765816040850160208701610797565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b60005b838110156107b257818101518382015260200161079a565b838111156107c1576000848401525b5050505056fea264697066735822122034d97526248a5c7f084a2c683f2def2b42a836a5544167cb729c28af5ddc74f464736f6c63430008040033";

export class TokenTimelock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    token_: string,
    beneficiary_: string,
    releaseTime_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TokenTimelock> {
    return super.deploy(
      token_,
      beneficiary_,
      releaseTime_,
      overrides || {}
    ) as Promise<TokenTimelock>;
  }
  getDeployTransaction(
    token_: string,
    beneficiary_: string,
    releaseTime_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      token_,
      beneficiary_,
      releaseTime_,
      overrides || {}
    );
  }
  attach(address: string): TokenTimelock {
    return super.attach(address) as TokenTimelock;
  }
  connect(signer: Signer): TokenTimelock__factory {
    return super.connect(signer) as TokenTimelock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenTimelockInterface {
    return new utils.Interface(_abi) as TokenTimelockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenTimelock {
    return new Contract(address, _abi, signerOrProvider) as TokenTimelock;
  }
}
