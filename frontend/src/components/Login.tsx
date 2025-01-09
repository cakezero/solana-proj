import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios'
import { useUser } from '../providers/useUser';
import { UserContextType } from '../types/types';
import { Spinner, LoadingSpinner } from './LoadingSpinner'

const API_ENDPOINT = 'http://localhost:5050/api/ref'

function Login() {
  const [check, setCheck] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [hovered, setHovered] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined)
  const [submit, setSubmit] = useState<boolean>(false)

  const navigate = useNavigate();
  const location = useLocation();

  const { setGlobalUser } = useUser() as UserContextType; 

  const { publicKey, connected, disconnect } = useWallet();

  console.log(`walletAddress: ${walletAddress}`);

  const NewUser = async () => {
    if (!username) {
      toast.error("Username field can't be empty")
      return;
    }
    setSubmit(true)

    const response = await axios.get(`${API_ENDPOINT}/check-user?walletAddress=${walletAddress}`);

    if (response.data?.UserReferrals) {
      toast.error('Username already exists')
      setSubmit(false)
      return;
    }
    
    const queryParams = new URLSearchParams(location.search);
    const refQuery = queryParams.get('ref');

    const referrer = refQuery ? refQuery : null

    const newResponse = await axios.post(`${API_ENDPOINT}/user`, { username, walletAddress, referrer });

    if (newResponse.data?.error) {
      toast.error("Error Logging you in! Try Again");
      return;
    }

    const userProp = newResponse.data.prop!

    toast.success("You are registered!")
    setGlobalUser(userProp)
    setSubmit(false)
    navigate('/dashboard')
  }

  useEffect(() => {
    if (connected) {
      const checkUser = async () => {
        try {
          setWalletAddress(publicKey?.toString())
          setCheck(true);

          const response = await axios.get(`${API_ENDPOINT}/check-user?walletAddress=${walletAddress}`);

          if(response.data?.error) {
            toast.error("Error Logging you in! Please try again later");
            console.log(response.data?.error)
            await disconnect();
            return;
          }

          if(response.data?.UserReferrals) {
            toast.success("User authenticated!")
            setGlobalUser(response.data.UserReferrals);
            navigate('/dashboard');
            setCheck(false)
            return;
          }

          setNewUser(true)
          setCheck(false)
        } catch (error) {
          toast.error("Error Logging you in! Please try again later")
          console.log(error)
        }
      }
      checkUser()
    }
  }, [walletAddress, disconnect, publicKey, setGlobalUser, navigate, connected]);

  return (
    <div>
      {newUser ? 
      <>
        <h1 className="text-center text-3xl font-bold text-black-500 mt-20">
          Enter Username to continue 🫡
        </h1>

        <div className="flex flex-col items-center justify-center mt-10">
          <input
            className="border border-gray-300 rounded px-3 py-2 placeholder-gray-300 focus:outline-none focus:border-black-500"
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button
            onClick={NewUser}
            className="bg-blue-500 flex items-center mt-4 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            {submit ? (
              <>
                <Spinner />
                <span className="ml-2">Authenticating...</span>
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </> : <>
        <h1 className="text-center text-3xl font-bold text-black-500 mt-20">
          Login to start refering frens 😉
        </h1>

        <div className="flex flex-col items-center justify-center mt-10" 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          <WalletMultiButton 
            style={{
              backgroundColor: hovered ? '#2980b9' : '#3498db',
              display: 'flex',
              alignItems: 'center',
              marginTop: '1rem',
              color: '#ffffff',
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
            }}
          >
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              Connect Solana Wallet
            </span>
          </WalletMultiButton>
        </div>
      </>}
      <Toaster />
      {check && <LoadingSpinner />}
    </div>    
  )
}

export default Login;