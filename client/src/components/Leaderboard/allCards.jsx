import TopCard from "./TopCard";
import { useStateContext } from "../../Contexts/ContextProvider";

function Cards() {
  const { leaderboard } = useStateContext();
  return (
    <div>
      <TopCard
        backgroundColor="#64b5f6"
        backgroundImage="linear-gradient(to right,#FF6F91, #FF9671)"
        avatarSrc={leaderboard[1]?.picture}
        name={leaderboard[1]?.name}
        subName={`Rs ${leaderboard[1]?.totalProfit}`}
        imageSrc="https://i.postimg.cc/L8FFG0kn/card2.png"
        rank={2}
      />
      <TopCard
        backgroundColor="#9575cd"
        backgroundImage="linear-gradient(to right,#B83FAE, #845EC2)"
        avatarSrc={leaderboard[0]?.picture}
        name={leaderboard[0]?.name}
        subName={`Rs ${leaderboard[0]?.totalProfit}`}
        imageSrc="https://i.postimg.cc/yYbk9Bz2/card.png"
        rank={1}
      />
      <TopCard
        backgroundColor="#64b5f6"
        backgroundImage="linear-gradient(to right,#FF6F91, #FF9671)"
        avatarSrc={leaderboard[2]?.picture}
        name={leaderboard[2]?.name}
        subName={`Rs ${leaderboard[2]?.totalProfit}`}
        imageSrc="https://i.postimg.cc/DZMt6Cyf/card3.png"
        rank={3}
      />
    </div>
  );
}
export default Cards;
