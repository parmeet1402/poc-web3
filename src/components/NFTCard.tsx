// 3rd Party Packages
import { Box, VStack, Image } from "@chakra-ui/react";

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

export default NFTCard;
