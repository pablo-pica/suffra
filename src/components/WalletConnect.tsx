import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, LogOut, AlertTriangle, ShieldCheck, Coins } from 'lucide-react';
import { type UseMidnightResult } from '../hooks/useMidnight';

interface WalletConnectProps {
  midnight: UseMidnightResult;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ midnight }) => {
  const {
    connected,
    connecting,
    walletAddress,
    shieldedAddress,
    balance,
    dustBalance,
    error,
    connect,
    disconnect,
  } = midnight;

  // Formats address to look like: mn_addr...1234
  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 12)}...${addr.slice(-6)}`;
  };

  const spring = { type: 'spring', stiffness: 400, damping: 25 } as const;

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="w-full rounded-xl shadow-card p-6 bg-white border border-slate-200 hover:shadow-elevated transition-shadow duration-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-headings text-slate-900 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-accent-blue" />
          Midnight Wallet Connection
        </h2>
        <AnimatePresence mode="wait">
          {connected ? (
            <motion.span
              key="connected-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Connected
            </motion.span>
          ) : (
            <motion.span
              key="disconnected-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Disconnected
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {!connected ? (
          <motion.div
            key="connect-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p className="text-sm text-slate-500 leading-relaxed">
              Connect your Lace Wallet (Midnight edition) to preview private credentials, generate zero-knowledge proofs locally, and interact with the Counter smart contract.
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 leading-relaxed font-mono"
              >
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={spring}
              disabled={connecting}
              onClick={connect}
              className="mt-2 w-full rounded-lg bg-accent-blue hover:bg-indigo-600 text-white font-medium px-4 py-2.5 transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {connecting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connecting to Lace...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Connect Lace Wallet
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="details-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Unshielded Address</span>
                <span className="text-sm font-mono text-slate-900 break-all select-all leading-tight">
                  {formatAddress(walletAddress)}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  Public ID (visible on chain)
                </span>
              </div>

              <div className="rounded-lg border border-indigo-100 bg-indigo-50/30 p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Shielded Address
                </span>
                <span className="text-sm font-mono text-indigo-950 break-all select-all leading-tight">
                  {formatAddress(shieldedAddress)}
                </span>
                <span className="text-[11px] text-indigo-400 mt-1">
                  Private Keypair (Z-Swap enabled)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 min-w-0">
                <div className="p-2 rounded-lg bg-white text-slate-700 shadow-xs shrink-0">
                  <Coins className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 overflow-hidden">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">tNight</span>
                  <span className="font-mono text-sm font-bold text-slate-900 truncate" title={`${balance.toString()} raw base units`}>
                    {balance === 0n ? '0.00' : (balance >= 1000000n ? (Number(balance) / 1e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : Number(balance).toLocaleString())}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100/50 min-w-0">
                <div className="p-2 rounded-lg bg-white text-indigo-600 shadow-xs shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 overflow-hidden">
                  <span className="text-[11px] font-medium text-indigo-600 uppercase tracking-wider">DUST</span>
                  <span className="font-mono text-sm font-bold text-indigo-950 truncate" title={`${dustBalance.toString()} raw base units`}>
                    {dustBalance === 0n ? '0.00' : (Number(dustBalance) >= 1e9 ? (Number(dustBalance) / 1e9).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : (Number(dustBalance) >= 1e6 ? (Number(dustBalance) / 1e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : Number(dustBalance).toLocaleString()))}
                  </span>
                </div>
              </div>
            </div>



            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={spring}
              onClick={disconnect}
              className="mt-3 w-full rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Disconnect Wallet
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
