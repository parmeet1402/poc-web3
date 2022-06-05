// 3rd Party Packages
import { useState } from "react";
import { ethers } from "ethers";
import { useQuery } from "react-query";
import { Heading, Button, Spinner, Box, VStack } from "@chakra-ui/react";

// Components
import NFTCard from "../components/NFTCard";

// Types
import { NFT } from "../types";

const MyNFtsSection = () => {
  const [error, setError] = useState("");
  const [account, setAccount] = useState("");

  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
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
    return (
      <VStack>
        <Heading color="red.500">{error}</Heading>
      </VStack>
    );
  }

  if (!account) {
    return (
      <VStack>
        <Button colorScheme="cyan" onClick={connect}>
          Connect
        </Button>
      </VStack>
    );
  }

  if (isLoading) {
    return (
      <VStack>
        <Spinner color="cyan.500" />
      </VStack>
    );
  }

  if (isSuccess) {
    if (data.length === 0) {
      return (
        <VStack>
          <Heading size="md" color="red.500">
            You don't own any NFTs yet :(
          </Heading>
        </VStack>
      );
    }

    return (
      <VStack>
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
      </VStack>
    );
  }

  return null;
};

export default MyNFtsSection;
