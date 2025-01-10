import { useUser } from '../providers/useUser'
import { useWallet } from '@solana/wallet-adapter-react';
import { UserContextType } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Copy } from 'lucide-react'
import toast, { Toaster } from "react-hot-toast"
const FRONTEND_URL = "https://solana-proj.vercel.app";

function Dashboard () {
  const [hovered, setHovered] = useState<boolean>(false)
  const { connected } = useWallet();
  const { globalUser } = useUser() as UserContextType
  const navigate = useNavigate()
  if (!connected) {
      navigate('/')
  }
  const REFERRAL_ID = `${FRONTEND_URL}?ref=${globalUser?.refId}`
  const referrals = globalUser?.referrals 
  const username = globalUser?.username
  console.log({username})
  const copyRef = () => {
    navigator.clipboard.writeText(REFERRAL_ID);
    toast.success("Referral link copied to clipboard!")
  }
  return (
    <>
      <div
        className="absolute top-2 right-4 flex flex-col items-center mt-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <WalletMultiButton
          style={{
            backgroundColor: hovered ? "#2980b9" : "#3498db",
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            color: "#ffffff",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
          }}
        />
      </div>

      <h1 className="text-3xl font-bold text-center text-black-500 mb-7 mt-20">
        Welcome, {username}
      </h1>

      <h2 className="text-xl font-bold text-center text-black-200 mb-4">
        You have {referrals} referrals
      </h2>
      <div className="text-center justify-center flex-row flex">
        <p className="text-center mr-2">
          Your Referral ID: <strong>{REFERRAL_ID}</strong>
        </p>
        <button onClick={copyRef}>
          <Copy className="w-4" />
        </button>
      </div>
        <p className="flex-row flex justify-center">
          Click <Copy className="mr-2 ml-2 w-4" /> to copy your referral link
        </p>
      <Toaster />
    </>
  );
}


export default Dashboard;