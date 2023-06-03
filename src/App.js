import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Web3 from 'web3';
import './App.css';

import mintNFT from "./abi/mintNFT.json";
import Home from './pages/home';
import CreateNFT from "./pages/create-nft";
import ApproveNFT from './pages/approve-nft';

import Navbar from './components/layout/navbar/Navbar';
import PetDetails from "./pages/detailed-nft";

function App() {
  const [account, setAccount] = useState('')
  const [contractData, setContractData] = useState('')
  const [unapprovedList, setUnapprovedList] = useState([])
  const [approvedList, setApprovedList] = useState({})
  const [tokenid, setTokenId] = useState(0);
  const [nftList, setNftList] = useState([]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying Metamask!',
      )
    }
  }

  const getContract = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = mintNFT.networks[networkId]

    if (networkData) {
      const abi = mintNFT.abi
      const address = "0x1c11Fd298278d30014644DA1c5c8975f84294F48"; //contract address CHANGE THIS
      const myContract = new web3.eth.Contract(abi, address)
      setContractData(myContract)
    } else {
      window.alert(
        'Contract is not deployed to the detected network. Connect to the correct network!',
      )
    }
  }

  const connectWallet = async () => {
    await loadWeb3()
    await getContract()
  }

  async function updateUList(url) {
    var time = Date().toLocaleString()
    await setUnapprovedList([...unapprovedList,{url, account, time}]);
  }

  async function updateAList(address, tokenid, cid, txHash) {
    var tempList = approvedList;
    if (tempList[address] == undefined) {
      tempList[address] = []
      console.log("making new address")
    }
    tempList[address].push(tokenid);
    await setNftList([...nftList, [cid, txHash]]);
    await setApprovedList(tempList);
  }

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="cl">
        <Navbar account={account} connectWallet={connectWallet} />
          <Routes>
            <Route path="/" element={
              <Home 
              approvedList={approvedList}
              nftList={nftList}
              account={account}
              />} />
            <Route path='/create-nft' element={<CreateNFT account={account} updateUList={updateUList}/>} />
            <Route path='/approve-nft' element={
              <ApproveNFT 
                account={account} 
                contract={contractData}
                approvedList={approvedList}
                unapprovedList={unapprovedList} 
                tokenid={tokenid}
                setUnapprovedList={setUnapprovedList}
                updateAList={updateAList}
                setTokenId={setTokenId}
                />} />
            <Route path='/nft-details/:nftId/:nfttxhsh' element={<PetDetails nftList={nftList}/>}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App



