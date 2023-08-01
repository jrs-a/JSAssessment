import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const [transactions, setTransactions] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
          <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                onClick={connectAccount}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Please connect your Metamask wallet
              </a>
            </div>
        )
    }

    if (balance == undefined) {
      getBalance();
    }

    //content if logged in
    return (
      <div className="flex flex-col items-center text-center">
        {/* account details */}
        <div class="block max-w-sm p-6 bg-white border border-gray-50 rounded-lg shadow hover:bg-gray-100">
          <p className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{balance} ETH</p>
          <p>{account}</p>
        </div>
        {/* actions */}
        <div className="flex gap-x-2 py-4">
          <a onClick={deposit}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >Deposit 1 ETH</a>
          <a onClick={withdraw}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >Withdraw 1 ETH</a>
        </div>
        {/* transactions history */}
        <div>
          {renderTransactionHistory()}
        </div>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  useEffect(() => {
    if (atm) {
      // Subscribe to DepositEvent and WithdrawEvent
      atm.on("Deposit", handleEvent);
      atm.on("Withdraw", handleEvent);

      // Cleanup function to unsubscribe from events when component unmounts
      return () => {
        atm.off("Deposit", handleEvent);
        atm.off("Withdraw", handleEvent);
      };
    }
  }, [atm]);

  const handleEvent = (from, amount, transactionId, event) => {
    // Create a new transaction object and update the transactions state
    console.log("event object is: ", event);
    const newTransaction = {
      type: event.event === "Deposit" ? "Deposit" : "Withdrawal",
      amount: ethers.utils.formatEther(amount),
      transactionId: transactionId.toNumber(),
    };

    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
  };

  const renderTransactionHistory = () => {
    if (transactions.length === 0) {
      return <p>No transaction history yet.</p>;
    }

    return (
      <div>
        <p className="pb-3 text-lg font-semibold">Transaction History</p>
        <div className="flex flex-col gap-3">
          {transactions.map((transaction) => (
            <div 
              className="max-w-sm py-3 px-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
              key={transaction.transactionId}>
              <span className="font-semibold pl-3">
                {transaction.type}
              </span>
              <span className="p-3">
                {transaction.amount} ETH
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  
  //main
  return (
    // <main className="container">
    //   <h1 className="underline">Welcome to Metacrafters ATM!</h1>
    //   {initUser()}

    //   {renderTransactionHistory()}
    //   <style jsx>{`
    //     .container {
    //       text-align: center
    //     }
    //   `}
    //   </style>
    // </main>
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* style */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        {/* main content */}
        <div className="mx-auto max-w-2xl py-0 sm:py-2 lg:py-8">
          <h1 className="text-3xl  tracking-tight text-gray-900 sm:text-3xl text-center py-4">
            Welcome to Metacrafters ATM!
          </h1>
          {initUser()}
        </div>
        {/* style */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}