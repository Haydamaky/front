import { Player } from '@/types/player';
import { gradientColorVariants } from '../../_utils';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/store';
import GiveUpButton from '../playerCard/GiveUpButton';
import InnerPlayerCard from '../playerCard/InnerPlayerCard';
import { OtherPlayerButtons } from '../playerCard/OtherPlayerButtons';

interface PlayerCardProps {
  player: Player;
  turnOfUserId: string;
  turnTime: number;
  index: number;
}

const fromTopArr = ['top-[0]', 'top-[25.33%]', 'top-[50.66%]', 'top-[76%]'];

const PlayerCard = ({
  player,
  turnOfUserId,
  turnTime,
  index,
}: PlayerCardProps) => {
  const { data: user } = useAppSelector(state => state.user);
  const [isPlayerClicked, setIsPlayerClicked] = useState(false);

  const borderColor = gradientColorVariants[player.color];
  const playerBg = player.userId !== turnOfUserId ? 'bg-playerGradient' : '';
  const fromTop = fromTopArr[index];
  const mainPlayer = player.userId === user?.id;

  const opacity = isPlayerClicked && mainPlayer ? 'opacity-100' : 'opacity-0';
  const opacityOtherPlayer =
    isPlayerClicked && !mainPlayer ? 'opacity-100' : 'opacity-0';

  const handleMouseClick = () => setIsPlayerClicked(prev => !prev);

  const playerButtons = mainPlayer ? (
    <GiveUpButton opacity={opacity} />
  ) : (
    <OtherPlayerButtons opacity={opacityOtherPlayer} />
  );

  const playerHTML = (
    <InnerPlayerCard
      player={player}
      playerBg={playerBg}
      turnOfUserId={turnOfUserId}
      turnTime={turnTime}
      buttons={playerButtons}
    />
  );

  const height = isPlayerClicked ? (mainPlayer ? '25%' : '31%') : '';
  return (
    <div
      onClick={handleMouseClick}
      style={{
        background: borderColor,
        zIndex: isPlayerClicked ? '1000' : '',
        height,
      }}
      className={`${fromTop} trasnsition-all absolute flex h-[24%] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[6%] duration-300 ease-in-out`}
    >
      {player.userId === turnOfUserId ? (
        <div className="h-[98%] w-[97%] rounded-[6%] bg-transparent">
          {playerHTML}
        </div>
      ) : (
        <div className="h-[98%] w-[97%] rounded-[6%] bg-primaryGame">
          {playerHTML}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
