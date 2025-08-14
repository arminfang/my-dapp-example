"use client";
import { BrowserProvider, Contract, ethers } from "ethers";
import { useState } from "react";
import { getProvider } from "@/app/lib";
import bankJson from "@/abis/SimpleBank.json";

const BANK_ADDRESS = "0x4e7af35ad98635e2e0db2ae754f9995049341c4c";

const SimpleBank = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }
    if (account) {
      alert("You are already connected to a wallet");
      return;
    }

    const accounts = await window.ethereum?.request({
      method: "eth_requestAccounts",
    });
    const { provider, signer } = await getProvider();
    const _balance = (await provider?.getBalance(accounts[0])) ?? "";
    const _contract = new Contract(BANK_ADDRESS, bankJson.abi, signer);

    setBalance(Number(ethers.formatEther(_balance)).toFixed(8));
    setProvider(provider);
    setAccount(accounts[0]);
    setContract(_contract);
  };

  const getCurrentBalance = async () => {
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }
    const _balance = (await provider?.getBalance(account || "")) ?? "";
    console.log("balance", _balance);
    setBalance(Number(ethers.formatEther(_balance)).toFixed(8));
  };

  const deposit = async () => {
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }
    alert(
      "Your transaction has lunched, please go to MetaMask to confirm the request."
    );
    const tx = await contract?.deposit({ value: 100 });
    await tx.wait();
  };

  const withdraw = async () => {
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }
    alert(
      "Your transaction has lunched, please go to MetaMask to confirm the request."
    );
    const tx = await contract?.withdraw(100);
    tx.wait();
  };

  const getBankBalance = async () => {
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }
    const totalBalance = await contract?.getContractAmount();
    alert(
      `Current total bank balance is: ${ethers.formatEther(totalBalance)} eth`
    );
  };

  const getCurrentBankBalance = async () => {
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }
    const ct = new Contract(BANK_ADDRESS, bankJson.abi, provider);
    const myBankBalance = await ct.getCurrentBalance(account);
    alert(
      `Your current bank balance is: ${ethers.formatEther(myBankBalance)} eth`
    );
  };

  const pause = async () => {
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }
    const tx = await contract?.pause();
    tx.wait();
  };
  const resume = async () => {
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }
    const tx = await contract?.resume();
    tx.wait();
  };

  return (
    <div className="flex flex-col items-start justify-start p-6 gap-6">
      <div>
        <h3>
          Your account address is:{" "}
          <span className="text-yellow-400">{account}</span>
        </h3>
        <h3>
          Your current balance is:{" "}
          <span className="text-yellow-400">{balance}</span> eth
        </h3>
        <button onClick={connectWallet} className="btn-primary mt-2">
          Connect wallet
        </button>

        <button onClick={getCurrentBalance} className="btn-primary ml-2">
          Refresh balance
        </button>
      </div>

      <div>
        <h3 className="text-2xl text-red-400 mb-2">Contract Interaction</h3>
        <h3 className="text-xl text-red-200 mb-2">
          Simple Bank: {BANK_ADDRESS}
        </h3>

        <button onClick={getBankBalance} className="btn-primary ">
          Total bank balance
        </button>
        <button
          onClick={getCurrentBankBalance}
          className="btn-primary ml-2 mb-2"
        >
          My bank balance
        </button>
        <br />
        <button onClick={deposit} className="btn-primary mb-2">
          Deposit 100 wei
        </button>

        <button onClick={withdraw} className="btn-primary ml-2">
          Withdraw 100 wei
        </button>
        <br />
        <button onClick={pause} className="btn-primary ">
          Pause
        </button>
        <button onClick={resume} className="btn-primary ml-2">
          Resume
        </button>
      </div>
    </div>
  );
};

export default SimpleBank;
