import React, { useState, useEffect } from "react";
import report from "@/public/styles/report.module.scss";
import Image from "next/image";
import { getUserCharacterImagePath } from "@/util/images.js";
import { getCharacterReport } from "@/api/report";
import { CharacterReport, Character } from "@/interfaces/report-interface";

type Props = {
  character: Character;
};

// 기본 정보
const BasicInfo = ({
  characterReport,
}: {
  character: Character;
  characterReport: CharacterReport;
}) => (
  <div className={report["damagochi-health"]}>
    <div className={report["info"]}>
      <div className={report["info-title"]}>생성일</div>
      <div className={report["info-tmp"]}>{characterReport.created_at}</div>
    </div>
    <div className={report["info"]}>
      <div className={report["info-title"]}>키</div>
      <div className={report["info-tmp"]}> {characterReport.height} cm</div>
    </div>
    <div className={report["info"]}>
      <div className={report["info-title"]}>몸무게</div>
      <div className={report["info-tmp"]}> {characterReport.weight} kg</div>
    </div>
    <div className={report["info"]}>
      <div className={report["info-title"]}>체형</div>
      <div className={report["info-tmp"]}> {characterReport.body_shape}</div>
    </div>
    <div className={report["info"]}>
      <div className={report["info-title"]}>BMI</div>
      <div className={report["info-tmp"]}>
        {characterReport.bmi < 18.5
          ? "마름 / "
          : characterReport.bmi < 25
          ? "보통 / "
          : characterReport.bmi < 30
          ? "과체중 / "
          : "비만"}{" "}
        {characterReport.bmi.toFixed(2)}
      </div>
    </div>
    <div className={report["info"]}>
      <div className={report["info-title"]}>획득한 수명</div>
      <div className={report["info-tmp"]}>
        {" "}
        {characterReport.plus_vita ?? 0}년
      </div>
    </div>
    <div className={report["info"]}>
      <div className={report["info-title"]}>잃은 수명</div>
      <div className={report["info-tmp"]}>
        {" "}
        {characterReport.minus_vita ?? 0}년
      </div>
    </div>
    {/* <div className={report["info"]}>
      <div className={report["info-title"]}>업적 수</div>
      <div className={report["info-tmp"]}>
        {" "}
        {characterReport.achievement_count ?? 0}개
      </div>
    </div> */}
  </div>
);

// 인벤토리
const Inventory = ({ character }: { character: Character }) => (
  <div>
    <p>인벤토리 아이템 수: {character.character_item.length}</p>
  </div>
);

// PvP전적 컴포넌트
const PvpRecord = () => (
  <div>
    <p>플레이 횟수: </p>
    <p>승 / 패 (%): </p>
    <p>얻은 수명: </p>
    <p>잃은 수명: </p>
  </div>
);

// 다마고치 종합 리포트 컴포넌트
const DamagochiHealth: React.FC<Props> = ({ character }) => {
  const [activeTab, setActiveTab] = useState("basicInfo");
  const [characterReport, setCharacterReport] =
    useState<CharacterReport | null>(null);

  useEffect(() => {
    async function fetchCharacterReport() {
      const data = await getCharacterReport();
      setCharacterReport(data);
    }

    fetchCharacterReport();
  }, [character]);

  if (!character) {
    return <div>Loading...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "basicInfo":
        return characterReport ? (
          <BasicInfo character={character} characterReport={characterReport} />
        ) : null;
      case "inventory":
        return <Inventory character={character} />;
      case "pvpRecord":
        return <PvpRecord />;
      default:
        return <div>선택된 탭이 없습니다.</div>;
    }
  };

  return (
    <div className={`${report["inner-text"]} ${report["inner-background"]}`}>
      <h1 className={report["sub-title"]}>다마고치 종합 리포트</h1>
      <div className={report["inner-image-block"]}>
        <Image
          src={getUserCharacterImagePath(
            character.gender,
            character.body_shape,
            "idle",
            0
          )}
          width={80}
          height={160}
          alt="Character Image"
        />
        <span>{character.nickname}</span>
      </div>
      <div className={report["damagochi-history-detail"]}>
        <div className={report["tabs"]}>
          <span
            className={activeTab === "basicInfo" ? "active" : ""}
            onClick={() => setActiveTab("basicInfo")}
          >
            기본정보
          </span>
        </div>
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DamagochiHealth;
