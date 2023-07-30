import invalidchat from "../assets/invalidchat.png";

export const InvalidChat = () => {
  const inavlidchatImg = invalidchat;
  return (
    <main className="w-[calc(100%-320px)] flex justify-center items-center h-screen">
      <div className="max-w-3xl w-full max-h-[450px] h-full bg-[#edededea] mx-2 rounded-3xl relative flex flex-col justify-center">
      

        <img src={inavlidchatImg} alt="invalid chat"></img>
      </div>
    </main>
  );
};
