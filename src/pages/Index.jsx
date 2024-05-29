import { useEffect } from "react";
import { Container, Text, VStack } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

const Index = () => {
  useEffect(() => {
    const webhookUrl = "https://discord.com/api/webhooks/1245264638074032169/SQOYL5a3KvrE25GAybCtaiHyM6uzOIm2SRypPQfD1GeO-IcuwXC6FMwG8fQTnjOO5E6_";

    const deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `Device Info: \nUser Agent: ${deviceInfo.userAgent}\nPlatform: ${deviceInfo.platform}\nLanguage: ${deviceInfo.language}\nScreen Resolution: ${deviceInfo.screenResolution}`,
      }),
    });
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the Device Info Logger</Text>
        <Text>Your device information has been sent to our Discord channel.</Text>
        <IconButton aria-label="Discord" icon={<FaDiscord />} size="lg" />
      </VStack>
    </Container>
  );
};

export default Index;
