import React , {useState} from 'react'
import { connect } from "@argent/get-starknet"
import { Contract } from 'starknet'


function Analytics() {

  const [isConnect,setIsConnected] = useState("Connect")
  const [Address, setAddress] = useState()
  const [provider, setProvider] = useState()


// Let the user pick a wallet (on button click)

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

  const getDetails = async() => {

    console.log("isConnect",isConnect)
    console.log("ADdress", Address)
    console.log("provider", provider.signer)
  }

  const contractABI= [
    {
        "members": [
            {
                "name": "low",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "high",
                "offset": 1,
                "type": "felt"
            }
        ],
        "name": "Uint256",
        "size": 2,
        "type": "struct"
    },
    {
        "inputs": [
            {
                "name": "__warp_3__num",
                "type": "Uint256"
            }
        ],
        "name": "changes_8d62c64e",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [],
        "name": "returnOwner_94a927fe",
        "outputs": [
            {
                "name": "__warp_4",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "__warp_5__num1",
                "type": "Uint256"
            },
            {
                "name": "__warp_6__num2",
                "type": "Uint256"
            }
        ],
        "name": "sum_cad0899b",
        "outputs": [
            {
                "name": "__warp_7",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sampel_0707a33e",
        "outputs": [
            {
                "name": "__warp_8",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "num1_3b9eac4b",
        "outputs": [
            {
                "name": "__warp_9",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "num2_15d4266c",
        "outputs": [
            {
                "name": "__warp_10",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "address1_3a36399e",
        "outputs": [
            {
                "name": "__warp_11",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "constructor",
        "outputs": [],
        "type": "constructor"
    }
]
  const interactWithContract = async() => {
    // const contractAddress = "0x06915b0588b6154dea74c622063a9c989bc9e453113ef1b900668080e89c2b30";
    const contractAddress = "0x00c0258244a530731964ad09a2b1b5b90ba119d6e90d6a931f15c6d35a1b5954"; // test2 contract 
    const contractInstance = new Contract (contractABI,contractAddress,  provider)
    // const tx = await contractInstance.num1_3b9eac4b()
    // console.log(tx[0]["low"].toString()) // Printing the value properlu

    // const writeTx = await contractInstance.changes_8d62c64e([45, []]) // Working  
    console.log("Done!")


    const readNum1 = await contractInstance.num1_3b9eac4b();
    console.log(readNum1[0]["low"].toString())

  }

  return (
    <>

        <h1>Analytics</h1>
        <button onClick={connectFun}> {isConnect} </button>
        <br /><hr />
        <button onClick={getDetails}> getDetails </button>
        <br /><hr />
        <button onClick={interactWithContract}>interactWithContract </button>


    </>
  )
}

export default Analytics