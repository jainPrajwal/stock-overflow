import { Flex, Image, Text } from "@chakra-ui/react";

export const Flair = ({
  cardBackgroundColor,
  isEdited = false
}: {
  cardBackgroundColor: string;
  isEdited?: boolean;
}) => {
  return (
    <>
      <Flex
        justify="center"
        p={["4px", "4px", "12px"]}
        bg={`${cardBackgroundColor}`}
        direction="column"
        minW={["160px", "160px", "220px"]}
        borderRadius="4px"
      >
        <Text fontSize="sm">{`${
          isEdited ? `edited` : `added`
        } 55 min ago`}</Text>
        <Flex
          align={`center`}
          _hover={{
            cursor: "pointer"
          }}
          width={`fit-content`}
        >
          <Image
            src={`https://res.cloudinary.com/dmk11fqw8/image/upload/v1657350555/unitag_qrcode_standard_srgab6.png`}
            width={`36px`}
            height={`36px`}
          ></Image>
          <Text ml="4px">
            <Text fontSize={`xs`}>Prajwal Jain</Text>
            <Text fontSize={`xs`}>
              <Text as="span">1K</Text>
              <Text as="span" ml="8px">
                gold
              </Text>
            </Text>
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
