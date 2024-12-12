import { avatar5 } from '../../assets/img/blogpage';
import { mockOwl, mockRobot } from '../../assets/img/common';
import miniLogo from '../../assets/img/common/minilogo.png';

export function MockMobile() {
  const BOTProfile = miniLogo;

  return (
    <>
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[252px] max-w-[440px] md:h-[294px] md:max-w-[512px]">
        <div className="rounded-xl overflow-hidden h-full md:h-[262px]">
          <figure className="ms-auto h-full me-20 relative z-[1] max-w-full w-[50rem] shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)] rounded-b-lg">
            <div className="relative flex items-center max-w-[50rem] bg-gray-800 rounded-t-lg py-2 px-24 dark:bg-neutral-700">
              <div className="flex gap-x-1 absolute top-2/4 start-4 -translate-y-1">
                <span className="size-2 bg-gray-600 rounded-full dark:bg-neutral-600"></span>
                <span className="size-2 bg-gray-600 rounded-full dark:bg-neutral-600"></span>
                <span className="size-2 bg-gray-600 rounded-full dark:bg-neutral-600"></span>
              </div>
              <div className="flex justify-center items-center size-full bg-gray-700 text-[.25rem] text-gray-400 rounded-sm sm:text-[.5rem] dark:bg-neutral-600 dark:text-neutral-400">
                https://promptarena.vercel.app{' '}
              </div>
            </div>

            <div className="bg-gray-800 h-full rounded-b-lg">
              {/* <img
                className="max-w-full h-auto rounded-b-lg"
                src="../assets/img/1618x1010/img1.jpg"
                alt="Browser Placeholder"
              /> */}
              <div className="w-full md:h-full h-[180px] flex justify-center">
                <div
                
                  onWheel={e => {
                    e.stopPropagation(); // Prevent scrolling the entire page
                  }}
                  className="flex scroll-smooth items-center justify-center bg-[#030303] w-[900px]  pb-10 border border-1 border-zinc-300 border-opacity-30 rounded-md relative overflow-y-auto cursor-move overflow-x-hidden mockupScroll p-1 md:p-5"
                >
                  <div className="absolute -top-10 -right-10 w-[72%] h-12 bg-gray-500 rounded-full opacity-90 blur-[100px]"></div>
                  <div className="absolute -bottom-10 -left-10 w-[72%] h-8 bg-blue-500 rounded-full opacity-90 blur-[100px]"></div>
                  <div className="flex h-full flex-col w-full">
                    <div
                      id="leftMsg"
                      className="flex  justify-start items-center mb-1"
                    >
                      <img
                        src={BOTProfile}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="Bot avatar"
                      />
                      <div className="w-full sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        I’m Promptex🤖, PromptArena’s AI powerhouse. How can I
                        help you today?
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-end items-center mb-1"
                    >
                      <img
                        src={avatar5}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="User avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        You can tell today's date?
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-start items-center mb-1"
                    >
                      <img
                        src={BOTProfile}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="Bot avatar"
                      />
                      <div className="sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        Sure, Today's date is December 12, 2024. 😊
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-end items-center mb-1"
                    >
                      <img
                        src={avatar5}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="User avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        Can you provide a short story prompt about time travel?
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>

                    <div
                      id="leftMsg"
                      className="flex justify-start items-center mb-1"
                    >
                      <img
                        src={BOTProfile}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="Bot avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        Write a short story about a time traveler who
                        accidentally changes a major historical event and must
                        find a way to restore the timeline.
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-end items-center mb-1"
                    >
                      <img
                        src={avatar5}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="User avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        Nice one!
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>

                    <div
                      id="leftMsg"
                      className="flex justify-start items-center mb-1"
                    >
                      <img
                        src={BOTProfile}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="Bot avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        Thank you! If you need more prompts or anything else,
                        just let me know! 😊✨
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-end items-center mb-1"
                    >
                      <img
                        src={avatar5}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="User avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        Generate an image of a futuristic robot.
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-start items-center mb-1"
                    >
                      <img
                        src={BOTProfile}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="Bot avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] rounded-md flex items-center text-zinc-300 relative">
                        <img
                          src={mockRobot}
                          className="size-[100px] rounded-md"
                          alt="mockup robot"
                        />
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-end items-center mb-1"
                    >
                      <img
                        src={avatar5}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="User avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        Provide a JavaScript function for validating an email
                        address.
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-start items-center mb-1"
                    >
                      <img
                        src={BOTProfile}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="Bot avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        "A JavaScript function that validates an email address
                        by using a regular expression to check its format. It
                        should return true for valid emails and false for
                        invalid ones."
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-end items-center mb-1"
                    >
                      <img
                        src={avatar5}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="User avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        That's great!
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-end items-center mb-1"
                    >
                      <img
                        src={avatar5}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="User avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] border border-zinc-300 border-opacity-30 rounded-md flex items-center px-1 py-[1px] text-zinc-300 relative">
                        Give me a image of owl with the body of a wolf.
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                    <div
                      id="leftMsg"
                      className="flex justify-start items-center md:pb-10 pb-5"
                    >
                      <img
                        src={BOTProfile}
                        className="size-4 bg-[#c5c3c3] border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-2 opacity-90"
                        alt="Bot avatar"
                      />
                      <div className=" sm:w-auto bg-[#030303] text-[0.5rem] rounded-md flex items-center text-zinc-300 relative">
                        <img
                          src={mockOwl}
                          className="size-[100px] rounded-md"
                          alt={'Owl image'}
                        />
                      </div>
                      <div className="ml-1 text-zinc-400 text-[0.4rem]">
                        2:50pm
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
      <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"></div>
      <div className="relative mx-auto bg-gray-800 rounded-t-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"></div>
    </>
  );
}