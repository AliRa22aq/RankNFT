/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type AmountChanged = ContractEventLog<{
  account: string;
  0: string;
}>;
export type BlackListed = ContractEventLog<{
  account: string;
  0: string;
}>;
export type MembershipAssigned = ContractEventLog<{
  account: string;
  duration: string;
  0: string;
  1: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type PaymentReceived = ContractEventLog<{
  from: string;
  amount: string;
  0: string;
  1: string;
}>;
export type PaymentReleased = ContractEventLog<{
  to: string;
  amount: string;
  0: string;
  1: string;
}>;
export type WhiteListed = ContractEventLog<{
  account: string;
  duration: string;
  0: string;
  1: string;
}>;

export interface RankNFT extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): RankNFT;
  clone(): RankNFT;
  methods: {
    /**
     * Returns the address of the current owner.
     */
    owner(): NonPayableTransactionObject<string>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(): NonPayableTransactionObject<void>;

    subscription_period(arg0: string): NonPayableTransactionObject<string>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    whitelisting_period(arg0: string): NonPayableTransactionObject<string>;

    developer_address(): NonPayableTransactionObject<string>;

    set_cost_of_subscription(
      _days: number | string | BN,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    get_cost_of_subscription(
      _days: number | string | BN
    ): NonPayableTransactionObject<string>;

    giveaway_subscription(
      _users: string[],
      _hours: number | string | BN
    ): NonPayableTransactionObject<void>;

    get_single_day_subscription(): PayableTransactionObject<void>;

    get_seven_days_subscription(): PayableTransactionObject<void>;

    get_one_month_subscription(): PayableTransactionObject<void>;

    get_six_month_subscription(): PayableTransactionObject<void>;

    is_whitelisted(_address: string): NonPayableTransactionObject<boolean>;

    is_subscriber(_address: string): NonPayableTransactionObject<boolean>;

    whitelist_users(
      _users: string[],
      _days: number | string | BN
    ): NonPayableTransactionObject<void>;

    blacklist_users(_users: string[]): NonPayableTransactionObject<void>;

    list_of_whitelisted_users(): NonPayableTransactionObject<string[]>;

    refresh_list_of_whitelisted_users(): NonPayableTransactionObject<void>;

    total_balance_available(): NonPayableTransactionObject<string>;

    withdraw_total_amount(): NonPayableTransactionObject<void>;
  };
  events: {
    AmountChanged(cb?: Callback<AmountChanged>): EventEmitter;
    AmountChanged(
      options?: EventOptions,
      cb?: Callback<AmountChanged>
    ): EventEmitter;

    BlackListed(cb?: Callback<BlackListed>): EventEmitter;
    BlackListed(
      options?: EventOptions,
      cb?: Callback<BlackListed>
    ): EventEmitter;

    MembershipAssigned(cb?: Callback<MembershipAssigned>): EventEmitter;
    MembershipAssigned(
      options?: EventOptions,
      cb?: Callback<MembershipAssigned>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    PaymentReceived(cb?: Callback<PaymentReceived>): EventEmitter;
    PaymentReceived(
      options?: EventOptions,
      cb?: Callback<PaymentReceived>
    ): EventEmitter;

    PaymentReleased(cb?: Callback<PaymentReleased>): EventEmitter;
    PaymentReleased(
      options?: EventOptions,
      cb?: Callback<PaymentReleased>
    ): EventEmitter;

    WhiteListed(cb?: Callback<WhiteListed>): EventEmitter;
    WhiteListed(
      options?: EventOptions,
      cb?: Callback<WhiteListed>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "AmountChanged", cb: Callback<AmountChanged>): void;
  once(
    event: "AmountChanged",
    options: EventOptions,
    cb: Callback<AmountChanged>
  ): void;

  once(event: "BlackListed", cb: Callback<BlackListed>): void;
  once(
    event: "BlackListed",
    options: EventOptions,
    cb: Callback<BlackListed>
  ): void;

  once(event: "MembershipAssigned", cb: Callback<MembershipAssigned>): void;
  once(
    event: "MembershipAssigned",
    options: EventOptions,
    cb: Callback<MembershipAssigned>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "PaymentReceived", cb: Callback<PaymentReceived>): void;
  once(
    event: "PaymentReceived",
    options: EventOptions,
    cb: Callback<PaymentReceived>
  ): void;

  once(event: "PaymentReleased", cb: Callback<PaymentReleased>): void;
  once(
    event: "PaymentReleased",
    options: EventOptions,
    cb: Callback<PaymentReleased>
  ): void;

  once(event: "WhiteListed", cb: Callback<WhiteListed>): void;
  once(
    event: "WhiteListed",
    options: EventOptions,
    cb: Callback<WhiteListed>
  ): void;
}
