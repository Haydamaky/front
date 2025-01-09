import { Button } from '@/components/ui/button';
import useScreenSize from '@/hooks/screenSize';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { setFields } from '@/store/slices/fields';
import { setGame } from '@/store/slices/game';
import { DataWithGame } from '@/types';
import { useEffect, useState } from 'react';

type Action = 'rollDice' | 'auction' | 'buy' | '';

const Center = () => {
  const screenSize = useScreenSize();
  const [action, setAction] = useState<Action>('');
  const dispatch = useAppDispatch();
  const fields = useAppSelector(state => state.fields.fields);
  const game = useAppSelector(state => state.game.game);
  const { data: user } = useAppSelector(state => state.user);
  const [player] = game.players.filter(player => player.userId === user?.id);
  const [currentField] = fields.filter(
    field => field.index === player?.currentFieldIndex,
  );
  useEffect(() => {
    const handleRolledDice = (data: any) => {
      setAction('buy');
    };
    const handleHasPutUpForAuction = (data: any) => {
      setAction('auction');
    };
    const handlePassTurnToNext = (data: DataWithGame) => {
      if (data.game.turnOfUserId === user?.id) {
        setAction('rollDice');
      } else {
        setAction('');
      }
    };
    const handleBoughtField = (data: any) => {
      dispatch(setFields(data.fields));
      dispatch(setGame(data.game));
    };

    socket.on('rolledDice', handleRolledDice);
    socket.on('hasPutUpForAuction', handleHasPutUpForAuction);
    socket.on('passTurnToNext', handlePassTurnToNext);
    socket.on('boughtField', handleBoughtField);
    return () => {
      socket.off('rolledDice', handleRolledDice);
      socket.off('hasPutUpForAuction', handleHasPutUpForAuction);
      socket.off('passTurnToNext', handlePassTurnToNext);
      socket.off('boughtField', handleBoughtField);
    };
  }, [user]);
  const rollDice = () => {
    socket.emit('rollDice');
  };
  const buyField = () => {
    socket.emit('buyField');
  };
  return (
    <div className="flex h-full flex-col justify-between">
      {(game.turnOfUserId === user?.id || action === 'auction') &&
        (!currentField?.specialField || action === 'rollDice') && (
          <div className="mx-6 mt-6 flex h-1/4 flex-col justify-between rounded-md bg-gameCenterModal px-4 py-2 text-xs text-white shadow-gameCenterModaShadowCombined lg:py-3">
            <div className="text-small font-bold md:text-standard lg:text-xl xl:text-3xl">
              {action === 'rollDice'
                ? 'Ваш хід'
                : action === 'buy'
                  ? 'Придбати поле?'
                  : action === 'auction'
                    ? 'Аукціон'
                    : ''}
            </div>
            {action === 'rollDice' && (
              <Button
                variant={'blueGame'}
                size={screenSize.width > 1200 ? 'default' : 'xs'}
                className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                onClick={rollDice}
              >
                Кинути кубики
              </Button>
            )}
            {action === 'buy' && (
              <div className="flex w-full gap-1 lg:gap-4">
                <Button
                  variant={'blueGame'}
                  size={screenSize.width > 1200 ? 'default' : 'xs'}
                  className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                  onClick={buyField}
                >
                  Придбати за {currentField.price}
                </Button>
                <div
                  className={`flex h-[38px] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-buttonBlueGradient px-[1px]`}
                >
                  <Button
                    variant={'gameDarkBlue'}
                    size={screenSize.width > 1200 ? 'default' : 'xs'}
                    className="font-custom"
                  >
                    <p className="bg-[linear-gradient(184.39deg,#5AB2F7_4.38%,#12CFF3_97.25%)] bg-clip-text text-4xl text-[9px] font-bold text-transparent md:text-sm lg:text-lg">
                      На аукціон
                    </p>
                  </Button>
                </div>
              </div>
            )}
            {action === 'auction' && (
              <div className="flex gap-1 lg:gap-4">
                <Button
                  size={screenSize.width > 1200 ? 'default' : 'xs'}
                  className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
                >
                  Підняти на 100
                </Button>
                <Button
                  variant={'white'}
                  size={screenSize.width > 1200 ? 'default' : 'xs'}
                  className="font-custom text-[9px] md:text-sm lg:text-lg"
                >
                  Відмовитись
                </Button>
              </div>
            )}
          </div>
        )}

      <div>Chat</div>
    </div>
  );
};

export default Center;
