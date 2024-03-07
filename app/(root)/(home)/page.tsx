import HomeCard from "@/components/home/HomeCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constant/filters";
import Link from "next/link";

export default function Home() {
  const questions = [
    {
      id: 1,
      title: "How to make a website?",
      description:
        "I want to make a website for my business. I have no idea how to start. Can anyone help me?",
      votes: 1200,
      answers: 900,
      views: 5200,
      createdBy: {
        id: 1,
        name: "Ahmad Shamsyahiran",
        avatar: "/assets/icons/account.svg",
        time: "2024-03-01T12:00:00",
      },
      listOftags: [
        {
          id: 1,
          value: "HTML",
        },
        {
          id: 2,
          value: "CSS",
        },
        { id: 3, value: "JavaScript" },
      ],
    },
  ];

  return (
    <>
      <div
        className="flex w-full flex-col-reverse 
        justify-between gap-4 sm:flex-row sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

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
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />

        <div className=" mt-2 flex flex-1 items-center  justify-center">
          {questions.length > 0 ? (
            <HomeCard questions={questions} />
          ) : (
            <NoResult
              title="There’s no question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from.
        Get involved! 💡"
              link="#"
              buttonText="Ask a Question"
            />
          )}
        </div>
      </div>
    </>
  );
}
