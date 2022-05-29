import {
  Center,
  Heading,
  VStack,
  Text,
  HStack,
  Input,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allVideos, setAllVideos] = useState<any>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    fetch("https://localhost:8000/videos")
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
              onChange={() => {}}
              onClick={() => {}}
            ></input>
            <Button size={"lg"} colorScheme="blue" disabled>
              Upload Video
            </Button>
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
