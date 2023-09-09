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
const PriceDisplay: React.FC<PriceDisplayProps> = ({ currencyType, price }) => {
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
  imageUrl,
  type,
  price,
  discount,
  quantity,
  isUnlocked,
  onPurchase
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
        <div className={styles.character}>
          <p>
            <span>{name}</span>
            {name}
          </p>
        </div>
      ) : (
        <div></div>
      )}
      <div className={styles.item}></div>
      <PriceDisplay currencyType={currencyType} price={price} />
      {isUnlocked ? (
        <Button disabled={true}>Unlocked</Button>
      ) : (
        <Button onClick={() => onPurchase()}>Buy Now</Button>
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
