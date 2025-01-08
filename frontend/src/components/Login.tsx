import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios'
import { useUser } from '../providers/useUser';

function Login() {
  const [check, setCheck] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [hovered, setHovered] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setGlobalUser } = useUser(); 

  const { publicKey, connected } = useWallet();

  const walletAddress = publicKey?.toString();
  console.log(`walletAddress: ${walletAddress}`);

  const NewUser = async () => {

    const queryParams = new URLSearchParams(location.search);
    const refQuery = queryParams.get('ref');

    const referrer = refQuery ? refQuery : null

    const newResponse = await axios.post('http://localhost:5050/api/ref/user', { username, walletAddress, referrer });

    if (newResponse.data?.error) {
      toast.error("Error Logging you in! Try Again");
      return;
    }
    
    
  }

  useEffect(() => {
    if (connected) {
      const checkUser = async () => {
        try {
          setCheck(true);

          const response = await axios.get(`http://localhost:5050/api/ref/check-user?walletAddress=${walletAddress}`);

          if(response.data?.error) {
            toast.error("Error Logging you in! Please try again later");
            console.log(response.data?.error)
            return;
          }

          if(response.data?.UserReferrals) {
            toast.success("User authenticated!")
            setGlobalUser(response.data.UserReferrals);
            navigate('/dashboard');
            return;
          }

          setNewUser(true)
        } catch (error) {
          toast.error("Error Logging you in! Please try again later")
          console.error(error)
        }
      }
      checkUser()
    }
  }, [walletAddress, setGlobalUser, navigate, connected]);

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-black-500 mt-20">api
        Login to start refering friends 😉
      </h1>

      <div className="flex flex-col items-center justify-center mt-10" 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <WalletMultiButton 
          className="wallet-button hover:bg-blue-700"
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
      <Toaster />
    </>  
  )
}

export default Login;