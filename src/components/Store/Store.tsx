import { alphaCharacters } from "../../services/data/characters";
import { StoreItem } from "./StoreItem/StoreItem";
import { itemType } from "./types";
import { useUnlockedCharacters } from "../../services/hooks/unlockedCharacters";
import styles from "./Store.module.scss";

export const Store = () => {
  const inventory = alphaCharacters;
  const { isCharacterUnlocked, addCharacter } = useUnlockedCharacters();

  // get inventory
  // get player unlocks
  return (
    <>
      <div className={styles.store}>
        {inventory.map((c, i) => (
          <StoreItem
            key={i}
            name={c}
            type={itemType.Character}
            price={100}
            discount={0}
            quantity={1}
            isUnlocked={isCharacterUnlocked(c)}
            onPurchase={() => addCharacter(c)}
          />
        ))}
      </div>
    </>
  );
};

// Featured Items

// All Characters

// LBucks Packages

// Skins

// Keys
