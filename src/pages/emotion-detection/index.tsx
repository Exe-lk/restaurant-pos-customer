import React, { useState, useRef } from "react";
import Niv from "@/components/niv";
import axios from "axios";
import Swal from "sweetalert2";
import image4 from "../../../public/assets/vecteezy_women-meditate-yoga-psychic-women-considers-mind-and_26717009.jpg";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Footer from "@/components/Footer";

type Message = {
  text: string;
  user: "bot" | "user";
};

function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const genAI = new GoogleGenerativeAI("AIzaSyBOuKQeL_tedOz3cl6_kqglHLeAw-mvw0I");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const handleSend = async (input: any, status: any) => {
    console.log(input);
    setInput("");
    if (!input) return;
    if (status === 1) {
      const userMessage: Message = { text: input, user: "user" };
      setMessages([...messages, userMessage]);
    }

    const prompt = "this is a chatbot used to increase the mindfulness and happiness of the user I will provide user input you have to give the answer User input:" + input + " this is previous chat " + JSON.stringify(messages) + " give me the mindfulness answer only";
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      const botMessage: Message = { text: text, user: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message to Google Generative AI:", error);
      const errorMessage: Message = {
        text: "Sorry, there was an error processing your request.",
        user: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setImage(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
        setIsUploaded(true);
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const selectedFile = event.dataTransfer.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setImage(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
        setIsUploaded(true);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement | null;
    fileInput?.click();
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const process = Swal.fire({
        title: "Processing...",
        html: 'Please wait while the data is being processed.<br><div class="spinner-border" role="status"></div>',
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
      });
      try {
        await axios
          .post(
            "https://asia-south1-hardy-crossbar-422213-h9.cloudfunctions.net/Emotion_detection",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(async (res) => {
            Swal.close();
            console.log("File uploaded successfully:", res.data);
            if(res.data.error=="Enter a valid Image"){
              Swal.fire('Error..!', 'Enter a valid Image', 'error');
              return
            }
            await setInput(res.data.class);
            await handleSend("I am in " + res.data.class, 0);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            Swal.close;
            alert(
              "An error occurred while adding the document. Please try again later."
            );
          });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleClear = () => {
    setImage(null);
    setFile(null);
    setIsUploaded(false);
  };

  const handleStartCamera = () => {
    setShowCamera(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });
  };
  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured.png", { type: "image/png" });
            setImage(URL.createObjectURL(blob));
            setFile(file);
            setIsUploaded(true);
            handleStopCamera(); // Stop the camera after capturing the image
            
          }
        }, "image/png");
      }
    }
  };

  return (
    <div>
      <Niv />
      <div>
        {!isUploaded ? (
          <div
            className="border-2 border-dashed border-gray-500 rounded-lg p-6 flex flex-col items-center justify-center mt-20 ms-20 me-20"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-12 h-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v8zM7 10l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </div>
            <p className="text-gray-500 mb-2">Drag and Drop an image here</p>
            <p className="text-gray-500">or</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleButtonClick}
            >
              Browse Files
            </button>
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={handleStartCamera}
            >
              Use Camera
            </button>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center justify-center">
            <h4 className="text-lg font-bold">Uploaded Image:</h4>
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className=" h-72 object-cover mt-2"
              />
            )}
            <div className="mt-4 flex space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative">
            <video ref={videoRef} autoPlay className="w-full h-full"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <button
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-2 rounded-md"
              onClick={handleCapture}
            >
              Capture Photo
            </button>
          </div>
        </div>
      )}
      <div>
        <div className="flex flex-col h-[50vh] p-4 mt-10 ms-20 me-20">
          <div
            className="flex-grow overflow-auto p-4 bg-gray-100 rounded-lg shadow-inner"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),url("../../../public/assets/vecteezy_women-meditate-yoga-psychic-women-considers-mind-and_26717009.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.user === "user"
                      ? "chat chat-end justify-end"
                      : "chat chat-start"
                  }`}
                >
                  <div className="chat-bubble">{message.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 flex">
            <input
              type="text"
              className="flex-grow border rounded-l-lg p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend(input, 1);
                }
              }}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-r-lg"
              onClick={() => {
                handleSend(input, 1);
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
