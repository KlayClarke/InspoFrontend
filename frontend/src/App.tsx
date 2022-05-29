import {
  Center,
  Heading,
  VStack,
  Text,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

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
        </VStack>
      </Center>
    </div>
  );
}

export default App;
