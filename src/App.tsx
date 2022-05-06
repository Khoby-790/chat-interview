import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { useSocket } from './context/SocketContext'



const App = () => {
  const { logout, user } = useAuth0();
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [messages, setMessages] = useState<Record<string, any>[]>([]);
  const [message, setMessage] = useState("second");
  const [selectedUser, setSelectedUser] = useState<Record<string, any> | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    socket.emit('join', { ...user })
    socket.on('message', () => {

    })
    socket.on('users', (data: any) => {

      setUsers(data)
      console.log(data)
      // if (!data.find((el: any) => el?.sub === selectedUser?.sub)) {
      //   setSelectedUser(null)
      // }
    })

    socket.on('messages', (data: any) => {
      setMessages(data)
    })
    return () => {
      socket.emit("out", { ...user })
      // setSelectedUser(null)
    }
  }, [selectedUser, socket, user])


  const sendMessage = () => {
    socket.emit('message', {
      from: user,
      to: selectedUser,
      message: message
    })
  }

  useEffect(() => {
    socket.emit("messages", { chatId: [user?.sub, selectedUser?.sub].sort().join('') })
    return () => {
      setMessages([])
    }
  }, [selectedUser, socket, user?.sub])




  return (
    <div className='h-screen w-screen flex bg-cog flex-1'>
      <div className='md:w-96 w-1/3 h-full bg-white overflow-y-scroll'>
        <div className='p-3'>
          <div className='flex'>
            <img src={user?.picture} className="h-11 w-11 rounded-full" alt={user?.nickname} />
            <div className='space-x-4 p-3'>
              <span>{user?.given_name}</span>
              <span>{user?.family_name}</span>
            </div>
          </div>
          <p>{user?.email}</p>
          <button onClick={() => logout()}>Logout</button>
        </div>
        {users.filter(el => el?.sub !== user?.sub).map((chat, index) => (
          <div onClick={() => setSelectedUser(chat)} key={index} className='flex hover:bg-gray-200 cursor-pointer space-x-3 items-center p-2'>
            <div className='h-11 w-11 rounded-full bg-gray-600'></div>
            <div>
              <span>{chat?.given_name} {chat?.family_name}</span>
            </div>
          </div>
        ))}
      </div>


      {/* Main Pane */}
      {selectedUser && <div className='flex-1 flex flex-col w-full h-full bg-green-100/40'>

        {/* Chat Header */}
        <div className='flex-1'>
          <div className='p-3 flex justify-between bg-white'>
            <h2>{selectedUser?.given_name} {selectedUser?.family_name}</h2>
            <button onClick={() => {
              socket.emit("block", { from: user, to: selectedUser })
              setSelectedUser(null)
            }}>block</button>
          </div>
          <div className='space-y-2 px-2'>
            {messages.map((message, index) => (
              <div key={index} className='flex first:mt-2 items-center p-3 bg-white mx-auto'>
                <img src={message?.from?.picture} className="h-11 w-11 rounded-full" alt={message?.from?.nickname} />
                <div className='space-x-4 p-3'>
                  <span>{message?.from?.given_name} {message?.from?.family_name}</span>
                  <span>{message?.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Message Box */}
        <div className='flex p-2 bg-white w-full space-x-3'>
          <input onChange={e => setMessage(e.target.value)} onSubmit={sendMessage} type="text" className='h-11 flex-1 border px-4' placeholder='type here' />
          <button onClick={sendMessage} className='bg-blue-700 flex items-center justify-center space-x-3 text-white px-4'>
            Send
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
      }
    </div>
  )
}

export default App;