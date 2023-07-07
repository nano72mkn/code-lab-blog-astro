import type { FC } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { getTweetId } from "../../utils/getTweetId";

export const Tweet: FC<{ href: string }> = ({ href }) => {
  const tweetId = getTweetId({ url: href });
  if (tweetId === undefined) return <p>{href}</p>;
  return (
    <div className="my-10">
      <TwitterTweetEmbed tweetId={tweetId} options={{ align: "center" }} />
    </div>
  );
};
