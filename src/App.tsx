import {
  Center,
  Heading,
  VStack,
  Text,
  HStack,
  Input,
  Button,
  SimpleGrid,
  Spinner,
  Wrap,
  WrapItem,
  AspectRatio,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { upload } from "@testing-library/user-event/dist/upload";
import { useEffect, useRef, useState } from "react";

function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [allVideos, setAllVideos] = useState<any>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef();

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
    fetch(process.env.REACT_APP_API_ENDPOINT + "status")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "videos")
      .then((response) => response.json())
      .then((data) => {
        setAllVideos(data);
      });
  }, [uploadSuccess]);

  return (
    <div className="App">
      <Flex
        bg="white"
        height={"5em"}
        padding={"6px 12px"}
        align="center"
        justify={"space-between"}
      >
        <Flex>
          <Text fontWeight={"700"} fontSize={"25px"} colorScheme={"twitter"}>
            vStore
          </Text>
        </Flex>
        <Flex>
          <Button size={"lg"} colorScheme={"twitter"} onClick={onOpen}>
            Upload
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload a short video</ModalHeader>
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
                colorScheme="blue"
                isDisabled={!isSelected}
                onClick={onFileUpload}
              >
                Upload Video
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
      <Center bg="black" color="white" padding="8">
        <VStack minHeight={"100vh"}>
          <Heading>#AD</Heading>
          <VStack>
            <Wrap width={"100%"} justify="center">
              {/* show first two videos in db */}
              {allVideos.length !== 0 &&
                allVideos
                  .slice(-2)
                  .reverse()
                  .map((video: any, index: any) => {
                    return (
                      <WrapItem w={{ base: "100%", lg: "45%" }} key={index}>
                        <video
                          src={video["video_url"]}
                          autoPlay
                          controls
                          loop
                          preload="auto"
                          muted
                          style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                          }}
                        ></video>
                      </WrapItem>
                    );
                  })}
            </Wrap>
          </VStack>
          <Heading>#Lifestyle</Heading>
          <VStack>
            <HStack>
              <VStack>
                {/* show half of the videos in db */}
                {allVideos.length !== 0 &&
                  allVideos
                    .slice(0, allVideos.length / 2 - 1)
                    .reverse()
                    .map((video: any, index: any) => {
                      return (
                        <WrapItem height={"fit-content"} w={"100%"} key={index}>
                          <video
                            src={video["video_url"]}
                            controls
                            loop
                            preload="auto"
                            muted
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                            }}
                          ></video>
                        </WrapItem>
                      );
                    })}
              </VStack>
              <VStack>
                {/* show other half of the videos in db (minus the #ad videos at the end) */}
                {allVideos.length !== 0 &&
                  allVideos
                    .slice(allVideos.length / 2 - 1, allVideos.length - 2)
                    .reverse()
                    .map((video: any, index: any) => {
                      return (
                        <WrapItem height={"fit-content"} w={"100%"} key={index}>
                          <video
                            src={video["video_url"]}
                            controls
                            loop
                            preload="auto"
                            muted
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                            }}
                          ></video>
                        </WrapItem>
                      );
                    })}
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Center>
    </div>
  );
}

export default App;
