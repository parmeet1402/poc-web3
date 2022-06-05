// 3rd Party Packages
import { Box, Heading, Spinner, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";

// Components
import NFTCard from "../components/NFTCard";

// Types
import { NFT } from "../types";

const AllAssetsSection = () => {
  // Make API call to get all assets
  const { isLoading, data } = useQuery("getAllAssets", async () => {
    const response = await fetch(
      "https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=40&include_orders=false"
    );

    return response.json();
  });

  if (isLoading) {
    return (
      <VStack>
        <Spinner color="cyan.500" />
      </VStack>
    );
  }

  return (
    <Box textAlign="center" my="8">
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
    </Box>
  );
};

export default AllAssetsSection;
