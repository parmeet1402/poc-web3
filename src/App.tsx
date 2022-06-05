import { useState } from "react";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [isFetching, setIsFetching] = useState(false);

  const [account, setAccount] = useState("");
  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const res = await provider.send("eth_requestAccounts", []);
    setAccount(res[0]);
  };

  // fetch('https://api.opensea.io/api/v1/collections?asset_owner=dfdfd&offset=0&limit=300', options)

  const { isLoading, data, isFetched, isSuccess } = useQuery(
    "getMyNFTData",
    async () => {
      console.log({ account });
      const response = await fetch(
        `https://api.opensea.io/api/v1/collections?asset_owner=${account}&offset=0&limit=300`
      );
      return response.json();
    },
    { enabled: isFetching, cacheTime: 0 }
  );
  console.log({ data, isFetching });

  return (
    <div className="App">
      {account && <p>Account: {account}</p>}
      {!account && <button onClick={connect}>Connect</button>}
      {account && (
        <button
          onClick={() => {
            setIsFetching(true);
          }}
        >
          Get Data
        </button>
      )}
      <br />
      <br />
      {isLoading && <p>Loading...</p>}
      {isSuccess &&
        (data.length > 0 ? (
          <div>
            <p>success</p>
          </div>
        ) : (
          <span>You don't own any NFTs, Start Purchasing some!</span>
        ))}
    </div>
  );
}

export default App;
