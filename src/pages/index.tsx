import Image from "next/image";
import { Inter } from "next/font/google";
import NIV from "@/components/niv";
import Footer from "@/components/Footer";
import image1 from "../../public/assets/vecteezy_women-meditate-yoga-psychic-women-considers-mind-and_267170091.jpg";
import image2 from "../../public/assets/how-to-meditate-1024x640-removebg-preview.png";
import ReactPlayer from "react-player";
import Video from '@/components/video'
export default function Home() {
  return (
    <main>
      <NIV />
      <Image
        className="mx-auto w-screen h-[50vh] w-auto  "
        src={image1}
        alt="Your Company"
      />
      <div className="flex w-full flex-col lg:flex-row mt-10">
        <div className="card rounded-box grid  flex-grow place-items-center">
          <Image
            // className="mx-auto  w-auto  "
            src={image2}
            alt="Your Company"
          />
        </div>
        <div className="divider lg:divider-horizontal" />
        <div className="card rounded-box grid h-32 flex-grow place-items-right text-6xl font-poppins">
          Notice the <span className="text-yellow-500">rhythm</span> of your{" "}
          <span className="text-red-500">breath</span> as it flows in and out.
        </div>
      </div>
     
     

      <div className="flex w-full">
        <div className="card  rounded-box grid h-95 flex-grow place-items-center">
        <div className="text-center ms-40 me-40">
        Mindfulness is the practice of being fully present and engaged in the
        current moment, aware of your thoughts, feelings, and sensations without
        judgment. It involves focusing on the present experience rather than
        dwelling on the past or worrying about the future. Mindfulness can be
        cultivated through meditation and other techniques, promoting
        relaxation, reducing stress, and enhancing overall well-being.
      </div>
         
        </div>
     
        <div className="card  rounded-box grid h-95 flex-grow place-items-center">
      
           <Video/>
         
        </div>
      </div>

      <Footer />
    </main>
  );
}
