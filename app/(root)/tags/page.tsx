import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/constant/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";

const Tag = async ({ searchParams }: SearchParamsProps) => {
  const allTags = await getAllTags({ searchQuery: searchParams.q });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div
        className="mt-11 flex flex-col justify-between gap-7 
  max-sm:flex-col md:items-stretch"
      >
        <div className="flex flex-row gap-5 max-sm:flex-col">
          <LocalSearchBar
            route="/tags"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for tags"
            otherClasses="flex-1"
          />
          <Filter
            filters={UserFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>
        <section className="mt-2 flex flex-1 flex-wrap gap-4">
          {allTags && allTags.length > 0 ? (
            allTags?.map((tagObj) => {
              return <TagCard key={tagObj._id} tag={tagObj} />;
            })
          ) : (
            <NoResult
              title="No Tags Found"
              description="It looks there are no tags found."
              link="/ask-question"
              linkTitle="Ask a question"
            />
          )}
        </section>
      </div>
    </>
  );
};

export default Tag;
