"use client";

import useUserStore from "@/store/user-store";
import { Modal } from "../../modal";

import Link from "next/link";
import styles from "@/public/styles/modal.module.scss";

export default function SingleResult() {
  const userStore = useUserStore();
  console.log(userStore.gameType);
  console.log(userStore.record);
  return (
    <div>
      <Modal>
        <p className={`${styles.title} ${styles.center}`}>result page modal</p>
        {userStore.gameType === 0 ? (
          <div>
            <p>Game Type 0: This is the result for game type 0.</p>
            <p>Your record: {(userStore.record / 1000).toFixed(3)}초</p>
          </div>
        ) : userStore.gameType === 1 ? (
          <div>
            <p>Game Type 1: This is the result for game type 1.</p>
            <p>Your record: {userStore.record}</p>
          </div>
        ) : (
          <div>
            <p>No valid game type found.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
