import { FC, forwardRef, RefCallback } from 'react';

interface MessageProps {
  name: string;
  text: string;
  color: string;
  time: string;
}

const Message = forwardRef<HTMLLIElement, MessageProps>(
  ({ name, text, color }, ref) => {
    return (
      <li className="flex flex-row gap-[0.2rem] text-white" ref={ref}>
        <div
          className="w-fit rounded-sm px-1 py-[0.1rem]"
          style={{
            background: color,
          }}
        >
          <span>{name}</span>
        </div>
        <div className="flex flex-row items-center">
          <span>
            {' : '}
            {text}
          </span>
        </div>
      </li>
    );
  },
);

export default Message;
