import {
  Center,
  Heading,
  VStack,
  Text,
  HStack,
  Button,
  Spinner,
  Wrap,
  WrapItem,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [allVideos, setAllVideos] = useState<any>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.files?.length && setSelectedFile(e.target.files[0]);
    setIsSelected(true);
  }

  function onFileUpload(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setShowSpinner(true);
    const formData = new FormData();
    formData.append("file", selectedFile!, selectedFile?.name);
    try {
      fetch(process.env.REACT_APP_API_ENDPOINT + "videos", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("success!");
          setUploadSuccess(!uploadSuccess);
          setShowSpinner(false);
          setIsSelected(false);
          setSelectedFile(null);
          onClose();
        })
        .catch((error) => {
          setShowSpinner(false);
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "videos")
      .then((response) => response.json())
      .then((data) => {
        setAllVideos(data);
      });
  }, [uploadSuccess]);

  useEffect(() => {
    console.log(allVideos);
  }, [allVideos]);

  return (
    <div className="App">
      <Flex
        bg="white"
        height={"5em"}
        padding={"8"}
        align="center"
        justify={"space-between"}
        borderBottom={"0.5px solid lightgray"}
      >
        <Flex>
          <Text fontWeight={"900"} fontSize={"40px"} color={"#706F6D"}>
            Inspo
          </Text>
        </Flex>
        <Flex>
          <Button
            size={"lg"}
            bgColor={"#706F6D"}
            color={"white"}
            onClick={onOpen}
          >
            Upload
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload A Beautiful Image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack>
                <input
                  title="video upload"
                  type="file"
                  onChange={onInputChange}
                ></input>
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button
                size={"lg"}
                bgColor={"#706F6D"}
                color={"white"}
                isDisabled={!isSelected}
                onClick={onFileUpload}
              >
                Inspire Us
              </Button>
              {showSpinner && (
                <Center>
                  <Spinner size={"md"}></Spinner>
                </Center>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Center bg="#706F6D" padding="8">
        <VStack minHeight={"100vh"}>
          <Flex
            flexDirection={"column"}
            align="center"
            textAlign="center"
            marginBottom={6}
          >
            <Text color={"white"} fontSize={"lg"} fontWeight={900}>
              For those in need of inspiration. For those with the ability to
              inspire others. For those unable to travel. For those who are
              unable to stay in one place. The lens allows us all to see farther
              than imaginable.
            </Text>
            <br />
            <Text color={"white"} fontSize={"lg"}>
              Klay Anthony Clarke
            </Text>
          </Flex>
          <VStack>
            <Stack
              flexDirection={{ base: "column", md: "row" }}
              gap={{ base: "0px", md: "10px" }}
            >
              <VStack>
                {/* show half of the videos in db */}
                {allVideos.length !== 0 &&
                  allVideos
                    .slice(0, allVideos.length / 2)
                    .map((video: any, index: any) => {
                      return (
                        <WrapItem height={"fit-content"} w={"100%"} key={index}>
                          <Image src={video["video_url"]} borderRadius={"lg"} />
                        </WrapItem>
                      );
                    })}
              </VStack>
              <VStack>
                {/* show other half of the videos in db (minus the #ad videos at the end) */}
                {allVideos.length !== 0 &&
                  allVideos
                    .slice(allVideos.length / 2, allVideos.length)
                    .map((video: any, index: any) => {
                      return (
                        <WrapItem height={"fit-content"} w={"100%"} key={index}>
                          <Image src={video.video_url} borderRadius={"lg"} />
                        </WrapItem>
                      );
                    })}
              </VStack>
            </Stack>
          </VStack>
        </VStack>
      </Center>
    </div>
  );
}

export default App;
