import FloatingMenu from "./containers/floating-menu";
import InfoContainer from "./containers/info-container";
import Chat from "./containers/chat";

export default function Home() {
  return (
    <div className="w-screen h-fit bg-[#E2E4EA] flex justify-center items-start py-20 px-20">
      <InfoContainer />
      <FloatingMenu />
      <Chat />
    </div>
  );
}
