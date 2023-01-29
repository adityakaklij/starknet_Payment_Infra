
import React , {useState} from 'react'
import { connect } from "@argent/get-starknet"
import {Account,Provider,defaultProvider,ec,json,SequencerProvider,Contract,stark,number,  shortString} from  "starknet";
import { contractABI } from '../Constants.js/ABI';


function DeployArgent() {

  const [isConnect,setIsConnected] = useState("Connect")
  const [Address, setAddress] = useState()
  const [provider, setProvider] = useState()
  const [txHash, setTxHash] = useState()

  const connectFun = async() => {
    try{

        const starknet = await connect()
        await starknet?.enable({ starknetVersion: "v4" })
        setProvider(starknet.account)
        setAddress(starknet.selectedAddress)
        setIsConnected("Connected")
   }
   catch(error){
        alert(error.message)
   }
  }


  const deployContract = async () => {
  
        const contractClassHash = '0x0238a1f2b3a1b36bb57bad9200f20bb91c6e812d8a952876de29c57213314465'; // Test2.sol   
        console.log("Deployment Tx - Contract to StarkNet...");

        const salt = (Date.now()).toString(); 

        const deployContractRes = await provider.deploy({
            classHash: contractClassHash,
            salt,
      });


      console.log("Waiting for Tx to be Accepted on Starknet - Contract Deployment...");
      await provider.waitForTransaction(deployContractRes.transaction_hash);

      const txReceipt = await provider.getTransactionReceipt(deployContractRes.transaction_hash);
      console.log("txReceipt",txReceipt)
      console.log("This the maing hash that containg actual contract address.",txReceipt.transaction_hash)
      setTxHash(txReceipt.transaction_hash);

  }

  async function getDetails() {
    
    const contractAddress = "0x00c0258244a530731964ad09a2b1b5b90ba119d6e90d6a931f15c6d35a1b5954"; // test2 contract 
    const contractInstance = new Contract (contractABI ,contractAddress,  provider)
    // const getTx = await provider.getTransaction("0x23352cc9291d60fb55462cfd4c0cc20fd3e0ab9d001b69600d1c0d90d8aa0b8") 
    const getTx = await provider.getContractAddresses("0x23352cc9291d60fb55462cfd4c0cc20fd3e0ab9d001b69600d1c0d90d8aa0b8") 
    console.log("getTx",getTx.contract_address);
    console.log("getTx",getTx.calldata);



  }


  return (
    <div>
        <h1>Deploy</h1>
        <button onClick={connectFun}>connectFun</button>

        <br /><hr />
        <button onClick={deployContract}>Deploy</button>

        <br /><hr />
        <button onClick={getDetails}>getDetails</button>

        <hr /><br />


    </div>
  )
}

export default DeployArgent