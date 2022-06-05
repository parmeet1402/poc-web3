import { useState } from "react";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import "./App.css";

const NFTCard = ({ name, description, imgSrc, ownerImg, permaLink }) => {
  // Add options as per the NFT Card
  return (
    <a href={permaLink}>
      {/* <span>NFT Card...</span> */}
      <h2>{name}</h2>
      <p>{description}</p>
      <img src={imgSrc} alt={name} />
      <img src={ownerImg} alt={""} />
    </a>
  );
};

const AllAssetsSection = () => {
  // Make API call to get all assets

  const { isLoading, data } = useQuery("getAllAssets", async () => {
    const response = await fetch(
      "https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&include_orders=false"
    );

    return response.json();
  });

  console.log({ data });

  return (
    <div>
      <h2>All Assets</h2>

      {JSON.stringify(data?.asset, null, 2)}
      {data?.assets?.map(nft => (
        <NFTCard
          name={nft.name}
          description={nft.description}
          imgSrc={nft.image_preview_url}
          permaLink={nft.permalink}
          ownerImg={nft.owner.profile_img_url}
        />
      ))}
    </div>
  );
};

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
      {/* {account && <p>Account: {account}</p>}
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
        ))} */}

      <AllAssetsSection />
    </div>
  );
}

export default App;
