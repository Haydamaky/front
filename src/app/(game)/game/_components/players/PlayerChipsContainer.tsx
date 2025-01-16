import { useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { useEffect, useRef } from 'react';
import PlayersChips from './PlayersChips';

const PlayerChipsContainer = () => {
  const game = useAppSelector(state => state.game.game);
  const prevGameAfterRolledDices = useRef(null);
  const shouldUpdate = useRef(false);
  useEffect(() => {
    const handleRollDiced = (data: any) => {
      prevGameAfterRolledDices.current = data.game;
      shouldUpdate.current = true;
    };
    const handleGetGameData = (data: any) => {
      prevGameAfterRolledDices.current = data.game;
      shouldUpdate.current = true;
    };
    socket.emit('getGameData', handleGetGameData);
    socket.on('rolledDice', handleRollDiced);
    return () => {
      socket.off('rolledDice', handleRollDiced);
    };
  }, []);
  if (shouldUpdate.current) {
    shouldUpdate.current = false;
    return <PlayersChips game={game} />;
  }
  return <PlayersChips game={prevGameAfterRolledDices.current} />;
};

export default PlayerChipsContainer;
