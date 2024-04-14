import { Schema } from "mongoose";
import Link from "next/link";

interface IProps {
  tag: {
    _id: string;
    name: string;
    questions: Schema.Types.ObjectId[];
  };
}

const TagCard = ({ tag }: IProps) => {
  return (
    <Link passHref legacyBehavior href={`/tags/${tag._id}`}>
      <article
        className="shadow-light100_darknone
        background-light900_dark200 light-border flex w-full
        cursor-pointer flex-col items-center
        justify-center gap-2 rounded-2xl px-8 
        py-10 max-xs:min-w-full xs:w-[220px]"
      >
        <Link
          href={`/tags/${tag._id}`}
          className="background-light800_dark400 text-dark300_light900
        paragraph-semibold rounded px-5 py-[6px] "
        >
          {tag.name}
        </Link>
        {/* <h3 className="text-dark500_light700  small-regular pb-[14px] pt-5">
          JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS
        </h3> */}
        <div className="flex items-baseline gap-3">
          <p className="primary-gradient body-semibold !bg-clip-text text-transparent">
            {tag.questions.length}+
          </p>
          <p className="small-medium text-dark400_light500 ">Questions</p>
        </div>
      </article>
    </Link>
  );
};

export default TagCard;
