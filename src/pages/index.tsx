import Image from "next/image";
import image1 from "../../public/assets/pizza.png";
import image2 from "../../public/assets/logo.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const openModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal?.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal?.close();
    router.push("/signup");
  };
  return (
    <main className="bg-neutral h-screen flex  ">
      <div className="relative top-20">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-white font-bold text-3xl">
          FOOD PLAGA
        </div>
        <Image src={image2} alt="Pizza" className="block" />

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Enter Your Mobile Number</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={closeModal}>
                  Next
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <button className="btn absolute bottom-60 right-5 " onClick={openModal}>
        NEXT
        <AiOutlineArrowRight className="w-5 h-5" />
      </button>

      <Image src={image1} alt="Pizza" className="absolute bottom-0 left-0" />
    </main>
  );
}
