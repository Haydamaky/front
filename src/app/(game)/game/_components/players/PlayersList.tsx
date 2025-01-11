'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setFields } from '@/store/slices/fields';
import { setGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';
import { Player } from '@/types/player';
import { useEffect, useRef, useState } from 'react';
import PlayerCard from '../playerCard/PlayerCard';

const PlayersList = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(state => state.game.game);
  const [turnTime, setTurnTime] = useState(0);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);
  useEffect(() => {
    const startCountdown = (timeToEnd: any) => {
      let countDown = timeToEnd;
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (countDown <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }
        countDown--;
        setTurnTime(prev => prev - 1);
      }, 1000);
    };

    const calculateTimeToEndAndSetStates = ({ game }: DataWithGame) => {
      const now = Date.now();
      const timeToEnd = Math.floor((+game.turnEnds - now) / 1000);
      setTurnTime(timeToEnd);
      startCountdown(timeToEnd);
    };

    const dispatchSetGame = (data: DataWithGame) => {
      dispatch(setGame(data.game));
    };

    const dispatchSetFields = (data: DataWithGame) => {
      if (data.fields) {
        dispatch(setFields(data.fields));
      }
    };

    socket.emitWithCallbacks('getGameData', dispatchSetGame, dispatchSetFields);

    socket.on(
      ['hasPutUpForAuction', 'getGameData', 'passTurnToNext', 'rolledDice'],
      calculateTimeToEndAndSetStates,
    );

    socket.on('passTurnToNext', dispatchSetGame);
    socket.on(
      ['payedForField', 'playerSurrendered'],
      dispatchSetGame,
      dispatchSetFields,
    );
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      socket.off(
        ['hasPutUpForAuction', 'getGameData', 'passTurnToNext', 'rolledDice'],
        calculateTimeToEndAndSetStates,
      );
      socket.off(['passTurnToNext'], dispatchSetGame);
      socket.off(
        ['payedForField', 'playerSurrendered'],
        dispatchSetFields,
        dispatchSetGame,
      );
    };
  }, []);

  return (
    <div className="relative my-auto flex h-[88%] flex-col gap-[2.7%] overflow-visible text-xs md:text-sm lg:text-lg">
      {game.players?.map((player: Player, index) => {
        return (
          <PlayerCard
            player={player}
            key={player.id}
            turnOfUserId={game.turnOfUserId}
            turnTime={turnTime}
            index={index}
          ></PlayerCard>
        );
      })}
    </div>
  );
};

export default PlayersList;
