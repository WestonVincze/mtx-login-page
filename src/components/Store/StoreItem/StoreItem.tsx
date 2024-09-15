import { currency, itemType } from "../types";
import { Button } from "../../Button";
import React from "react";
import styles from "./StoreItem.module.scss";

interface PriceDisplayProps {
  currencyType: currency;
  price: number;
  discount?: number;
}

// PurchaseButton
const PriceDisplay = ({ currencyType, price }: PriceDisplayProps) => {
  let priceText: string;
  switch (currencyType) {
    case currency.Dollars:
      priceText = `$${price}`;
      break;
    case currency.LBucks:
      priceText = `${price} LBucks`;
      break;
  }
  return (
    <div className={""}>
      <p>{priceText}</p>
    </div>
  );
};

export const StoreItem = ({
  name,
  type,
  price,
  isUnlocked,
  onPurchase,
}: StoreItemProps) => {
  let currencyType: currency;
  switch (type) {
    case itemType.LBucks:
      currencyType = currency.Dollars;
      break;
    default:
      currencyType = currency.LBucks;
      break;
  }
  //const currencyType = itemType.LBucks ? currency.Dollars : currency.LBucks;
  return (
    <div className={styles.storeItem}>
      {type === itemType.Character ? (
        <p className={`${styles.character} ${isUnlocked && styles.unlocked}`}>
          <span>{name}</span>
          {name}
        </p>
      ) : (
        <div />
      )}
      {isUnlocked ? (
        <p>Unlocked!</p>
      ) : (
        <div className={styles.purchase}>
          <PriceDisplay currencyType={currencyType} price={price} />
          <Button onClick={() => onPurchase()}>Buy Now</Button>
        </div>
      )}
    </div>
  );
};

interface StoreItemProps {
  name: string;
  imageUrl?: string;
  type: itemType;
  price: number;
  discount?: number;
  quantity?: number;
  isUnlocked: boolean;
  onPurchase: () => void;
}
