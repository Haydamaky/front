'use client';

import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { MUTUAL_CHAT_ID } from 'lib/constants';

type MessageObjType = {
  text: string;
  chatId: string;
  userId?: number;
  nickname?: string;
};

type Game = {
  id: string;
  players: any[];
};

const RoomsPage = () => {
  const [message, setMessage] = useState<MessageObjType>({
    text: '',
    chatId: MUTUAL_CHAT_ID,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [messages, setMessages] = useState<MessageObjType[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/games', { credentials: 'include' })
      .then(data => data.json())
      .then(games => {
        console.log(games);
        setGames(games);
      });
    socket.on('onMessage', (data: MessageObjType) => {
      setMessages(prevMessage => [...prevMessage, data]);
    });

    socket.on('error', (err: any) => {
      console.log(err);
    });

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket');
    });

    socket.on('onParticipateGame', (game: any) => {
      console.log('On Participation', game);
      setGames(prevGames => {
        const indexOfGame = prevGames.findIndex(
          curGame => curGame.id === game.id,
        );
        const copyOfGames = [...prevGames];
        copyOfGames.splice(indexOfGame, 1, game);
        console.log(copyOfGames);
        return copyOfGames;
      });
    });

    async function getChatData() {
      const chatData = await socket.emitWithAck('chatData', {
        chatId: MUTUAL_CHAT_ID,
      });
      setMessages(chatData.messages);
    }
    getChatData();

    return () => {
      socket.off('onMessage');
      socket.off('error');
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('newMessage', {
        text: message.text,
        chatId: MUTUAL_CHAT_ID,
      });
      setMessage({ text: '', chatId: MUTUAL_CHAT_ID });
    }
  };

  const handleJoinGame = (id: string) => {
    socket?.emit('joinGame', { id });
  };

  const hadleLeaveGame = (id: string) => {
    socket?.emit('leaveGame', { id });
    console.log('leaveGame', socket.id);
  };
  return (
    <div className="space-between flex">
      <div className="w-1/2">
        <h1>Chat</h1>
        <div>
          {messages.length &&
            messages.map((msgObj, index) => <p key={index}>{msgObj.text}</p>)}
        </div>
        <input
          type="text"
          value={message?.text}
          onChange={e =>
            setMessage(prevMessageObj => ({
              ...prevMessageObj,
              text: e.target.value,
            }))
          }
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="w-1/2">
        <h1>Games</h1>
        <div>
          {games.length &&
            games.map(game => {
              console.log(game);
              return (
                <div key={game.id}>
                  <p>id: {game.id}</p>
                  <div>
                    Players:
                    {game.players.map(player => (
                      <div key={player.id}>
                        <p>{player.user.nickname}</p>
                        <button
                          className="bg-rose-600"
                          onClick={() => hadleLeaveGame(game.id)}
                        >
                          Leave game
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="bg-lime-600"
                    onClick={() => handleJoinGame(game.id)}
                  >
                    Join Game
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
