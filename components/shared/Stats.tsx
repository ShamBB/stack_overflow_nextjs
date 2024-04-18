import { formatNumberWithExtension } from "@/lib/utils";
import { BadgeCounts } from "@/types";
import Image from "next/image";
import React from "react";

interface StatProps {
  totalAnswers: number;
  totalQuestions: number;
  badges: BadgeCounts;
  reputation: number;
}

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
  return (
    <div
      className="background-light900_dark200 light-border
      flex items-center gap-3.5 rounded-md
      px-6 py-5 shadow-light-300 dark:shadow-dark-200"
    >
      <Image src={imgUrl} width={40} height={50} alt="badge" />
      <div className="flex flex-wrap justify-center gap-4">
        <div>
          <p className="paragraph-semibold text-dark200_light900 ">
            {formatNumberWithExtension(value)}
          </p>
          <p className="body-medium text-dark400_light700 ">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Stats = ({
  totalAnswers,
  totalQuestions,
  badges,
  reputation,
}: StatProps) => {
  return (
    <>
      <div className="mt-10">
        <h4 className="h3-semibold text-dark200_light900">
          Stats - {reputation}
        </h4>
        <div className="stats-grid mt-5">
          <div
            className="background-light900_dark200 light-border
      flex items-center gap-3.5 rounded-md px-6 py-5
      shadow-light-300 dark:shadow-dark-200"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <div>
                <p className="paragraph-semibold text-dark200_light900 ">
                  {formatNumberWithExtension(totalAnswers)}
                </p>
                <p className="body-medium text-dark400_light700 ">Answers</p>
              </div>
              <div>
                <p className="paragraph-semibold text-dark200_light900 ">
                  {formatNumberWithExtension(totalQuestions)}
                </p>
                <p className="body-medium text-dark400_light700 ">Questions</p>
              </div>
            </div>
          </div>

          <StatsCard
            imgUrl="/assets/icons/gold-medal.svg"
            value={badges.GOLD}
            title="Gold Badges"
          />
          <StatsCard
            imgUrl="/assets/icons/silver-medal.svg"
            value={badges.SILVER}
            title="Silver Badges"
          />
          <StatsCard
            imgUrl="/assets/icons/bronze-medal.svg"
            value={badges.BRONZE}
            title="Bronze Badges"
          />
        </div>
      </div>
    </>
  );
};

export default Stats;
