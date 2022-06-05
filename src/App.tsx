import { useState } from "react";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import {
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Spinner,
  Box,
  VStack,
  Image,
} from "@chakra-ui/react";
import "./App.css";

type NFT = {
  name: string;
  image_preview_url: string;
  permalink: string;
};

const NFTCard = ({
  name,
  imgSrc,
  permaLink,
}: {
  name: string;
  imgSrc: string;
  permaLink: string;
}) => {
  return (
    <a href={permaLink}>
      <VStack align="center">
        <Box textAlign="left">
          <Image
            boxSize="240px"
            objectFit="cover"
            borderRadius="2xl"
            src={imgSrc}
            alt={name}
          />
          <h2>{name}</h2>
        </Box>
      </VStack>
    </a>
  );
};

const AllAssetsSection = () => {
  // Make API call to get all assets
  const { isLoading, data } = useQuery("getAllAssets", async () => {
    const response = await fetch(
      "https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=40&include_orders=false"
    );

    return response.json();
  });

  console.log({ data });

  return (
    <div>
      <Heading size="2xl" color="cyan.400">
        Latest NFTs
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        gridGap="24"
        my="20"
      >
        {data?.assets
          ?.filter((nft: NFT) => nft.image_preview_url)
          .map((nft: NFT) => (
            <NFTCard
              name={nft.name}
              imgSrc={nft.image_preview_url}
              permaLink={nft.permalink}
            />
          ))}
      </Box>
    </div>
  );
};

const MyNFtsSection = () => {
  const [error, setError] = useState("");

  const [account, setAccount] = useState("");
  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const res = await provider.send("eth_requestAccounts", []);
      setAccount(res[0]);
    } catch (err) {
      setError("Metamask not found!");
    }
  };

  const { isLoading, data, isFetched, isSuccess } = useQuery(
    "getMyNFTData",
    async () => {
      const response = await fetch(
        `https://api.opensea.io/api/v1/collections?asset_owner=${account}&offset=0&limit=300`
      );
      return response.json();
    },
    { enabled: !!account, cacheTime: 0 }
  );

  if (error) {
    return <Heading color="red.500">{error}</Heading>;
  }

  if (!account) {
    return (
      <Button colorScheme="cyan" onClick={connect}>
        Connect
      </Button>
    );
  }

  if (isLoading) {
    return <Spinner color="cyan.500" />;
  }

  if (isSuccess) {
    if (data.length === 0) {
      return (
        <Heading size="md" color="red.500">
          You don't own any NFTs yet :(
        </Heading>
      );
    }

    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        gridGap="24"
        my="20"
      >
        {data?.assets
          ?.filter((nft: NFT) => nft.image_preview_url)
          .map((nft: NFT) => (
            <NFTCard
              name={nft.name}
              imgSrc={nft.image_preview_url}
              permaLink={nft.permalink}
            />
          ))}
      </Box>
    );
  }

  return null;
};

function App() {
  return (
    <div className="App">
      <Tabs colorScheme="cyan">
        <TabList>
          <Tab>Latest NFTs</Tab>
          <Tab>My NFTs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AllAssetsSection />
          </TabPanel>
          <TabPanel>
            <MyNFtsSection />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
