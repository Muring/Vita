import styles from "@/public/styles/modal.module.scss";

export default function SingleResult() {
  return (
    <div>
      <div className={`${styles.content} ${styles.center}`}>
        <h1>로딩중..</h1>
      </div>
    </div>
  );
}
