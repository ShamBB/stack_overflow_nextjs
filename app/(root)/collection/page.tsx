import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constant/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { getUserInfoWithSavedQuestions } from "@/lib/actions/user.action";
import Link from "next/link";

export default async function Collection() {
  const result = await getQuestions({});
  const test = await getUserInfoWithSavedQuestions({});
  console.log(test);
  return (
    <>
      <div
        className="flex w-full flex-col-reverse 
        justify-between gap-4 sm:flex-row sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      </div>

      <div
        className="mt-11 flex flex-col justify-between gap-7 
      max-sm:flex-col md:items-stretch"
      >
        <div className=" mt-2 flex flex-1 flex-col  gap-6">
          {result.questions.length > 0 ? (
            result.questions.map((question) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
                hasSaved={true}
              />
            ))
          ) : (
            // <HomeCard questions={questions} />
            <NoResult
              title="There’s no question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from.
        Get involved! 💡"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          )}
        </div>
      </div>
    </>
  );
}
