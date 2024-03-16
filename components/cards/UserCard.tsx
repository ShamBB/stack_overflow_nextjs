import Image from "next/image";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { Badge } from "../ui/badge";

interface IuserCardProps {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    picture: string;
  };
}

const UserCard = async ({ user }: IuserCardProps) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article
        className=" 
        background-light900_dark200 light-border
        flex w-full flex-col
        items-center justify-center gap-5 rounded-2xl p-8 text-center"
      >
        <Image
          src={user.picture || "/assets/images/default-profile.png"}
          alt="user profile picture"
          className="rounded-full"
          width={100}
          height={100}
        />
        <div>
          <h3 className="text-dark200_light900 h3-bold mb-2 line-clamp-2">
            {user.name}
          </h3>
          <p className="text-dark500_light500 body-regular">@{user.username}</p>
        </div>
        <div>
          {(interactedTags?.length ?? 0) > 0 ? (
            <div className="flex gap-2">
              {interactedTags?.map((obj) => {
                return (
                  <RenderTag key={obj._id} _id={obj._id} name={obj.name} />
                );
              })}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
