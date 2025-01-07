import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [wallet, setWallet] = useState<string>('');
  const ConnectWallet = () => {
    try {
      const provider = window.solana.connect();
      setWallet(provider.publicKey.toString());
      useNavigate('/');
    } catch (error) {
      toast.error('Error connecting wallet');
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-black-500 mt-20">
        Login to customize NFT
      </h1>

      <div className="flex flex-col items-center justify-center mt-10">
        <button
          onClick={ConnectWallet}
          className="bg-blue-500 flex items-center mt-4 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Connect Solana Wallet
        </button>
      </div>
      <Toaster />
    </>  
  )
}

export default Login;