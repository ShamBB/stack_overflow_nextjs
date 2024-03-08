import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constant/filters";
import Link from "next/link";

export default function Home() {
  const questions = [
    {
      _id: "1",
      title: "How to optimize website performance?",
      tags: [
        { _id: "1", name: "Web Development" },
        { _id: "2", name: "Performance" },
      ],
      author: {
        _id: "1",
        name: "John Doe",
        picture: "/assets/icons/account.svg",
      },
      upvotes: 15,
      views: 120,
      answers: [
        {
          /* answer objects can be added here */
        },
      ],
      createdAt: new Date("2024-03-02T10:30:00"),
    },
    {
      _id: "2",
      title: "Best practices for securing REST APIs?",
      tags: [
        { _id: "3", name: "Security" },
        { _id: "4", name: "APIs" },
      ],
      author: {
        _id: "2",
        name: "Jane Smith",
        picture: "/assets/icons/account.svg",
      },
      upvotes: 2100000,
      views: 500000,
      answers: [
        {
          /* answer objects can be added here */
        },
      ],
      createdAt: new Date("2024-03-04T09:15:00"),
    },
    {
      _id: "3",
      title: "How to start a career in data science?",
      tags: [
        { _id: "5", name: "Data Science" },
        { _id: "6", name: "Career" },
      ],
      author: {
        _id: "3",
        name: "Alice Johnson",
        picture: "/assets/icons/account.svg",
      },
      upvotes: 3500,
      views: 150,
      answers: [
        {
          /* answer objects can be added here */
        },
      ],
      createdAt: new Date("2024-03-04T09:15:00"),
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
        <HomeFilters />

        <div className=" mt-2 flex flex-1 flex-col  gap-6">
          {questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            // <HomeCard questions={questions} />
            <NoResult
              title="There’s no question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from.
        Get involved! 💡"
              link="#"
              linkTitle="Ask a Question"
            />
          )}
        </div>
      </div>
    </>
  );
}
