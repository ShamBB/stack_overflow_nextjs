import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/constant/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

const Community = async () => {
  const allUsers = await getAllUsers({});
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div
        className="mt-11 flex flex-col justify-between gap-7 
  max-sm:flex-col md:items-stretch"
      >
        <div className="flex flex-row gap-5 max-sm:flex-col">
          <LocalSearchBar
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search amazing minds here..."
            otherClasses="flex-1"
          />
          <Filter
            filters={UserFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>
        <section className="mt-2 flex flex-1 flex-wrap gap-4">
          {allUsers && allUsers.length > 0 ? (
            allUsers?.map((userObj) => {
              return <UserCard key={userObj._id} user={userObj} />;
            })
          ) : (
            <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
              <p>No users yet</p>
              <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
                Sign up to be the first user
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Community;