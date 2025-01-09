import { useUser } from '../providers/useUser'
import { useWallet } from '@solana/wallet-adapter-react';
import { UserContextType } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Copy } from 'lucide-react'

function Dashboard () {
  const [hovered, setHovered] = useState<boolean>(false)
  const { connected } = useWallet();
  const { globalUser } = useUser() as UserContextType
  const navigate = useNavigate()
  // if (!connected) {
  //   navigate('/')
  // }
  return (
    <>
      <div className="absolute top-2 right-4 flex flex-col items-center mt-2"
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
        />
      </div>

      <Copy className="h-4 w-4" />

      <h1 className="text-3xl font-bold text-center text-black-500 mt-20">Welcome, {globalUser?.username}</h1>

      <h2 className='text-xl font-bold text-center text-black-200'>You have {globalUser?.referrals} referrals</h2>

      <p className='text-center'>Click to copy your referral link</p>
    </>
  )
}


export default Dashboard;