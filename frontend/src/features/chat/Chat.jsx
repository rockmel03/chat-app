export const Chat = () => {
  return (
    <div className="w-full h-full max-h-screen flex flex-col justify-between ">
      <div className="bg-darkbg chat-header p-3 flex items-center justify-between">
        <div className="flex items-center gap-[0.5em]">
          <div className="w-10 h-10 rounded-full bg-zinc-200"></div>
          <div>
            <h3 className="text-sm">Chat Name</h3>
            <p className="text-xs">Offline</p>
          </div>
        </div>
        <button className="more">
          <i className="ri-more-2-line"></i>
        </button>
      </div>
      <div className="chat-content flex-1 px-4 py-2 overflow-auto flex flex-col gap-1 scroll-smooth">
        {/** all messages appear here */}
        <div className="incoming-message ">
          <div className="bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-left-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
        <div className="outgoing-message ">
          <div className="ml-auto bg-primary px-2 py-1 w-fit rounded-md relative before:w-3 before:rotate-45 before:aspect-square before:bg-inherit before:absolute before:-right-1 before:top-2">
            <div className="z-[1] relative leading-[1.2]">
              <p>hellow</p>
              <p>hellow world</p>
              <p>hellow how are you !</p>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-input pb-2 px-2">
        <form className="px-2 bg-white text-black shadow-2xl rounded-full flex gap-2">
          <textarea
            type="text"
            name="message"
            id="message"
            rows="1"
            className="border-none outline-none bg-transparent p-2 resize-none text-inherit flex-1"
          ></textarea>
          <button type="submit" className="text-inherit text-2xl">
            <i className="ri-send-plane-2-fill"></i>
          </button>
        </form>
      </div>
    </div>
  );
};
