import { BN } from "@coral-xyz/anchor";
import { AddressUtil } from "@orca-so/common-sdk";
import type { PublicKey } from "@solana/web3.js";
import { METADATA_PROGRAM_ADDRESS } from "../../types/public";
import { PriceMath } from "./price-math";
import { TickUtil } from "./tick-utils";

const PDA_WHIRLPOOL_SEED = "whirlpool";
const PDA_POSITION_SEED = "position";
const PDA_METADATA_SEED = "metadata";
const PDA_TICK_ARRAY_SEED = "tick_array";
const PDA_FEE_TIER_SEED = "fee_tier";
const PDA_ORACLE_SEED = "oracle";
const PDA_POSITION_BUNDLE_SEED = "position_bundle";
const PDA_BUNDLED_POSITION_SEED = "bundled_position";
const PDA_CONFIG_EXTENSION_SEED = "config_extension";
const PDA_TOKEN_BADGE_SEED = "token_badge";
const PDA_LOCK_CONFIG_SEED = "lock_config";

/**
 * @category Whirlpool Utils
 */
export class PDAUtil {
  /**
   *
   * @param programId
   * @param whirlpoolsConfigKey
   * @param tokenMintAKey
   * @param tokenMintBKey
   * @param feeTierIndex
   * @returns
   */
  public static getWhirlpool(
    programId: PublicKey,
    whirlpoolsConfigKey: PublicKey,
    tokenMintAKey: PublicKey,
    tokenMintBKey: PublicKey,
    feeTierIndex: number,
  ) {
    return AddressUtil.findProgramAddress(
      [
        Buffer.from(PDA_WHIRLPOOL_SEED),
        whirlpoolsConfigKey.toBuffer(),
        tokenMintAKey.toBuffer(),
        tokenMintBKey.toBuffer(),
        new BN(feeTierIndex).toArrayLike(Buffer, "le", 2),
      ],
      programId,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param programId
   * @param positionMintKey
   * @returns
   */
  public static getPosition(programId: PublicKey, positionMintKey: PublicKey) {
    return AddressUtil.findProgramAddress(
      [Buffer.from(PDA_POSITION_SEED), positionMintKey.toBuffer()],
      programId,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param positionMintKey
   * @returns
   */
  public static getPositionMetadata(positionMintKey: PublicKey) {
    return AddressUtil.findProgramAddress(
      [
        Buffer.from(PDA_METADATA_SEED),
        METADATA_PROGRAM_ADDRESS.toBuffer(),
        positionMintKey.toBuffer(),
      ],
      METADATA_PROGRAM_ADDRESS,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param programId
   * @param whirlpoolAddress
   * @param startTick
   * @returns
   */
  public static getTickArray(
    programId: PublicKey,
    whirlpoolAddress: PublicKey,
    startTick: number,
  ) {
    return AddressUtil.findProgramAddress(
      [
        Buffer.from(PDA_TICK_ARRAY_SEED),
        whirlpoolAddress.toBuffer(),
        Buffer.from(startTick.toString()),
      ],
      programId,
    );
  }

  /**
   * Get the PDA of the tick array containing tickIndex.
   * tickArrayOffset can be used to get neighboring tick arrays.
   *
   * @param tickIndex
   * @param tickSpacing
   * @param whirlpool
   * @param programId
   * @param tickArrayOffset
   * @returns
   */
  public static getTickArrayFromTickIndex(
    tickIndex: number,
    tickSpacing: number,
    whirlpool: PublicKey,
    programId: PublicKey,
    tickArrayOffset = 0,
  ) {
    const startIndex = TickUtil.getStartTickIndex(
      tickIndex,
      tickSpacing,
      tickArrayOffset,
    );
    return PDAUtil.getTickArray(
      AddressUtil.toPubKey(programId),
      AddressUtil.toPubKey(whirlpool),
      startIndex,
    );
  }

  public static getTickArrayFromSqrtPrice(
    sqrtPriceX64: BN,
    tickSpacing: number,
    whirlpool: PublicKey,
    programId: PublicKey,
    tickArrayOffset = 0,
  ) {
    const tickIndex = PriceMath.sqrtPriceX64ToTickIndex(sqrtPriceX64);
    return PDAUtil.getTickArrayFromTickIndex(
      tickIndex,
      tickSpacing,
      whirlpool,
      programId,
      tickArrayOffset,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param programId
   * @param whirlpoolsConfigAddress
   * @param feeTierIndex
   * @returns
   */
  public static getFeeTier(
    programId: PublicKey,
    whirlpoolsConfigAddress: PublicKey,
    feeTierIndex: number,
  ) {
    return AddressUtil.findProgramAddress(
      [
        Buffer.from(PDA_FEE_TIER_SEED),
        whirlpoolsConfigAddress.toBuffer(),
        new BN(feeTierIndex).toArrayLike(Buffer, "le", 2),
      ],
      programId,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param programId
   * @param whirlpoolAddress
   * @returns
   */
  public static getOracle(programId: PublicKey, whirlpoolAddress: PublicKey) {
    return AddressUtil.findProgramAddress(
      [Buffer.from(PDA_ORACLE_SEED), whirlpoolAddress.toBuffer()],
      programId,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param programId
   * @param positionBundleMintKey
   * @param bundleIndex
   * @returns
   */
  public static getBundledPosition(
    programId: PublicKey,
    positionBundleMintKey: PublicKey,
    bundleIndex: number,
  ) {
    return AddressUtil.findProgramAddress(
      [
        Buffer.from(PDA_BUNDLED_POSITION_SEED),
        positionBundleMintKey.toBuffer(),
        Buffer.from(bundleIndex.toString()),
      ],
      programId,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param programId
   * @param positionBundleMintKey
   * @returns
   */
  public static getPositionBundle(
    programId: PublicKey,
    positionBundleMintKey: PublicKey,
  ) {
    return AddressUtil.findProgramAddress(
      [Buffer.from(PDA_POSITION_BUNDLE_SEED), positionBundleMintKey.toBuffer()],
      programId,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param positionBundleMintKey
   * @returns
   */
  public static getPositionBundleMetadata(positionBundleMintKey: PublicKey) {
    return AddressUtil.findProgramAddress(
      [
        Buffer.from(PDA_METADATA_SEED),
        METADATA_PROGRAM_ADDRESS.toBuffer(),
        positionBundleMintKey.toBuffer(),
      ],
      METADATA_PROGRAM_ADDRESS,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param programId
   * @param whirlpoolsConfigAddress
   * @returns
   */
  public static getConfigExtension(
    programId: PublicKey,
    whirlpoolsConfigAddress: PublicKey,
  ) {
    return AddressUtil.findProgramAddress(
      [
        Buffer.from(PDA_CONFIG_EXTENSION_SEED),
        whirlpoolsConfigAddress.toBuffer(),
      ],
      programId,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param programId
   * @param whirlpoolsConfigAddress
   * @param tokenMintKey
   * @returns
   */
  public static getTokenBadge(
    programId: PublicKey,
    whirlpoolsConfigAddress: PublicKey,
    tokenMintKey: PublicKey,
  ) {
    return AddressUtil.findProgramAddress(
      [
        Buffer.from(PDA_TOKEN_BADGE_SEED),
        whirlpoolsConfigAddress.toBuffer(),
        tokenMintKey.toBuffer(),
      ],
      programId,
    );
  }

  /**
   * @category Program Derived Addresses
   * @param programId
   * @param positionKey
   * @returns
   */
  public static getLockConfig(programId: PublicKey, positionKey: PublicKey) {
    return AddressUtil.findProgramAddress(
      [Buffer.from(PDA_LOCK_CONFIG_SEED), positionKey.toBuffer()],
      programId,
    );
  }
}
