import Image from "next/image";
import Link from "next/link";
import { getIconPath } from "@/util/icons.js";

export default function DebuffItem({ debuff }: { debuff: DeBuff }) {
  return (
    <Link href={`/debuff/${debuff.de_buff_id}`}>
      <Image
        src={getIconPath(debuff.type)}
        width={60}
        height={60}
        alt={debuff.type}
      ></Image>
    </Link>
  );
}
