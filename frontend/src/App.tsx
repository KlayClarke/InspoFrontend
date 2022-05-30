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
} from "@chakra-ui/react";
import { upload } from "@testing-library/user-event/dist/upload";
import { useEffect, useState } from "react";

function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [allVideos, setAllVideos] = useState<any>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

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
      <Center bg="black" color="white" padding="8">
        <VStack>
          <Heading>Welcome to vStore</Heading>
          <Text></Text>
          <HStack>
            <input
              title="video upload"
              type="file"
              onChange={onInputChange}
            ></input>
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
          </HStack>
          <Heading>Sponsored Videos</Heading>
          <SimpleGrid columns={3} spacing={8}>
            {allVideos.length !== 0 &&
              allVideos.map((video: any) => {
                return (
                  <video
                    src={video["video_url"]}
                    autoPlay
                    controls
                    loop
                    preload="auto"
                    muted
                  ></video>
                );
              })}
          </SimpleGrid>
        </VStack>
      </Center>
    </div>
  );
}

export default App;
