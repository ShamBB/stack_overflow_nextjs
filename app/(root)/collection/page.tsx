import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { QuestionFilters } from "@/constant/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Collection() {
  // const result = await getQuestions({});
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const result = await getSavedQuestions({ clerkId: userId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div
        className="mt-11 flex flex-col justify-between gap-7 
      max-sm:flex-col md:items-stretch"
      >
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions Here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />

        <div className=" mt-2 flex flex-1 flex-col  gap-6">
          {result.savedQuestion.length > 0 ? (
            result.savedQuestion.map((question: any) => (
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
                hasSaved
              />
            ))
          ) : (
            // <HomeCard questions={questions} />
            <NoResult
              title="There’s no saved question to show"
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
