import { Message, MessageRole } from "../../utils/types";
import classNames from 'classnames'
import Markdown from 'https://esm.sh/react-markdown@9'

export function MessageItem({ message }: { message: Message }) {

  const isUserMessage = message.role === MessageRole.USER
  const outerClassNames = classNames("flex flex-1 flex-col my-7 max-w-[75%]", {
    "items-start": !isUserMessage,
    "items-end text-right": isUserMessage,
  })

  const innerClassNames = classNames("rounded-md p-3", {
    "bg-gray-100": !isUserMessage,
    "bg-blue-100": isUserMessage,
  })

  return (
    <div className={outerClassNames}>
      <div className={innerClassNames}>
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  )
}
