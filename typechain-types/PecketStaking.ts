/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface PecketStakingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getValidators"
      | "isValidator"
      | "minStake"
      | "rewardDebt"
      | "rewardRate"
      | "stake"
      | "stakes"
      | "token"
      | "unstake"
      | "validators"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Staked"
      | "Unstaked"
      | "ValidatorRegistered"
      | "ValidatorRemoved"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getValidators",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isValidator",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "minStake", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rewardDebt",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "stake", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "stakes", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "unstake",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "validators",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getValidators",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "minStake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rewardDebt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rewardRate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "validators", data: BytesLike): Result;
}

export namespace StakedEvent {
  export type InputTuple = [user: AddressLike, amount: BigNumberish];
  export type OutputTuple = [user: string, amount: bigint];
  export interface OutputObject {
    user: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnstakedEvent {
  export type InputTuple = [user: AddressLike, amount: BigNumberish];
  export type OutputTuple = [user: string, amount: bigint];
  export interface OutputObject {
    user: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ValidatorRegisteredEvent {
  export type InputTuple = [validator: AddressLike];
  export type OutputTuple = [validator: string];
  export interface OutputObject {
    validator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ValidatorRemovedEvent {
  export type InputTuple = [validator: AddressLike];
  export type OutputTuple = [validator: string];
  export interface OutputObject {
    validator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PecketStaking extends BaseContract {
  connect(runner?: ContractRunner | null): PecketStaking;
  waitForDeployment(): Promise<this>;

  interface: PecketStakingInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getValidators: TypedContractMethod<[], [string[]], "view">;

  isValidator: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  minStake: TypedContractMethod<[], [bigint], "view">;

  rewardDebt: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  rewardRate: TypedContractMethod<[], [bigint], "view">;

  stake: TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;

  stakes: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  token: TypedContractMethod<[], [string], "view">;

  unstake: TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;

  validators: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getValidators"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "isValidator"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "minStake"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "rewardDebt"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "rewardRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "stake"
  ): TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "stakes"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "token"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "unstake"
  ): TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "validators"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  getEvent(
    key: "Staked"
  ): TypedContractEvent<
    StakedEvent.InputTuple,
    StakedEvent.OutputTuple,
    StakedEvent.OutputObject
  >;
  getEvent(
    key: "Unstaked"
  ): TypedContractEvent<
    UnstakedEvent.InputTuple,
    UnstakedEvent.OutputTuple,
    UnstakedEvent.OutputObject
  >;
  getEvent(
    key: "ValidatorRegistered"
  ): TypedContractEvent<
    ValidatorRegisteredEvent.InputTuple,
    ValidatorRegisteredEvent.OutputTuple,
    ValidatorRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "ValidatorRemoved"
  ): TypedContractEvent<
    ValidatorRemovedEvent.InputTuple,
    ValidatorRemovedEvent.OutputTuple,
    ValidatorRemovedEvent.OutputObject
  >;

  filters: {
    "Staked(address,uint256)": TypedContractEvent<
      StakedEvent.InputTuple,
      StakedEvent.OutputTuple,
      StakedEvent.OutputObject
    >;
    Staked: TypedContractEvent<
      StakedEvent.InputTuple,
      StakedEvent.OutputTuple,
      StakedEvent.OutputObject
    >;

    "Unstaked(address,uint256)": TypedContractEvent<
      UnstakedEvent.InputTuple,
      UnstakedEvent.OutputTuple,
      UnstakedEvent.OutputObject
    >;
    Unstaked: TypedContractEvent<
      UnstakedEvent.InputTuple,
      UnstakedEvent.OutputTuple,
      UnstakedEvent.OutputObject
    >;

    "ValidatorRegistered(address)": TypedContractEvent<
      ValidatorRegisteredEvent.InputTuple,
      ValidatorRegisteredEvent.OutputTuple,
      ValidatorRegisteredEvent.OutputObject
    >;
    ValidatorRegistered: TypedContractEvent<
      ValidatorRegisteredEvent.InputTuple,
      ValidatorRegisteredEvent.OutputTuple,
      ValidatorRegisteredEvent.OutputObject
    >;

    "ValidatorRemoved(address)": TypedContractEvent<
      ValidatorRemovedEvent.InputTuple,
      ValidatorRemovedEvent.OutputTuple,
      ValidatorRemovedEvent.OutputObject
    >;
    ValidatorRemoved: TypedContractEvent<
      ValidatorRemovedEvent.InputTuple,
      ValidatorRemovedEvent.OutputTuple,
      ValidatorRemovedEvent.OutputObject
    >;
  };
}
