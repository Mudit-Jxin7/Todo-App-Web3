import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import TaskAbi from '../../backend/build/contracts/TaskContract'
import { TaskContractAddress } from '../config.js'
import { ethers } from 'ethers';
import { useEffect, useState } from 'react'

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
    const [correctNetwork, setCorrectNetwork] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [currentAccount, setCurrentAccount] = useState('');
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        connectWallet()
    }, [])

    // Calls Metamask to connect wallet on clicking Connect Wallet button
    const connectWallet = async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                console.log("Metamask not available")
                return;
            }
            let chainId = await ethereum.request({ method: 'eth_chainId' })
            console.log('connected to chain : ', chainId);

            const goerliChainId = '0x5'
            if (chainId !== goerliChainId) {
                alert('You are not connected to goerli chain');
                setCorrectNetwork(false);
                return;
            } else {
                setCorrectNetwork(true);
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Found accounts ', accounts[0]);
            setIsUserLoggedIn(true);
            setCurrentAccount(accounts[0]);

        } catch (e) {
            console.log(e);
        }
    }

    // Just gets all the tasks from the contract
    const getAllTasks = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                console.log(ethereum);
                const provider = new ethers.providers.Web3Provider(ethereum);

                const signer = provider.getSigner();
                const TaskContract = new ethers.Contract(
                    TaskContractAddress,
                    TaskAbi.abi,
                    signer
                )

                let allTasks = await TaskContract.getMyTasks()
                setTasks(allTasks);
            } else {
                console.log('Etherium is not available')
            }
        } catch (e) {
            console.log(e);
        }
    }

    // Add tasks from front-end onto the blockchain
    const addTask = async e => {
        e.preventDefault();
        let task = {
            taskText: input,
            isDeleted: false,
        }

        try {
            const { ethereum } = window;
            if (ethereum) {
                console.log(ethereum);
                const provider = new ethers.providers.Web3Provider(ethereum);

                const signer = provider.getSigner();
                const TaskContract = new ethers.Contract(
                    TaskContractAddress,
                    TaskAbi.abi,
                    signer
                )
                TaskContract.AddTask(task.taskText, task.isDeleted)
                    .then(res => {
                        setTasks([...tasks, task]);
                        console.log('Added tasks');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                console.log('Ethereum is not available');
            }
        } catch (err) {
            console.log(err);
        }

        setInput('');
    }

    // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
    const deleteTask = key => async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                console.log(ethereum);
                const provider = new ethers.providers.Web3Provider(ethereum);

                const signer = provider.getSigner();
                const TaskContract = new ethers.Contract(
                    TaskContractAddress,
                    TaskAbi.abi,
                    signer
                )

                const deleted = await TaskContract.DeleteTask(key, true);
                console.log('Deleted ', deleted);
                let allTasks = await TaskContract.getMyTasks();
                setTasks(allTasks);
            } else {
                console.log('Etherium is not available')
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
            {!isUserLoggedIn ? <ConnectWalletButton connectWallet={connectWallet} /> :
                correctNetwork ? <TodoList tasks={tasks} input={input} setInput={setInput} addTask={addTask} deleteTask={deleteTask} /> : <WrongNetworkMessage />}
        </div>
    )
}

