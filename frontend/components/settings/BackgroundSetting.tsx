"use client";
import Image from "next/image";
import styles from "@/public/styles/settings.module.scss";
import { getMyItemList } from "@/api/settings";
import { useEffect, useState } from "react";
import { getShopImagePath } from "@/util/images";

export default function BackgroundSettingPage() {
  const [myItemList, setMyItemList] = useState<MyItemList>(null);
  const [selectedItem, setSelectedItem] = useState<MyItem | null>();

  const fetchMyItem = async () => {
    try {
      const fetchedMyItemList = await getMyItemList();
      console.log("fetched my item list: ", fetchedMyItemList.items);
      setMyItemList(fetchedMyItemList.items);
    } catch (error) {
      console.log("Loading my item list failed: ", error);
      setMyItemList(null);
    }
  };

  useEffect(() => {
    fetchMyItem();
  }, []);

  const handleClick = (item: MyItem) => {
    setSelectedItem(item);
  };

  return (
    <div className={`${styles.content} ${styles.center}`}>
      {!myItemList ? (
        <p>No items to display.</p>
      ) : (
        myItemList
          .filter((item) => item.type.toUpperCase())
          .map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className={styles.item}
            >
              <Image
                src={getShopImagePath(item.name, item.type)}
                width={60}
                height={60}
                alt={`${item.name}`}
                layout="fixed"
                className={` ${
                  item === selectedItem ? styles.selectedItem : ""
                }`}
              />
            </div>
          ))
      )}
    </div>
  );
}
