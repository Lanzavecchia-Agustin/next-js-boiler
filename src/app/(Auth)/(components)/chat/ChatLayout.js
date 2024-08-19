function ChatLayout({ isExpanded, children }) {
  return (
    <div
      className={`fixed bottom-2  ${
        isExpanded
          ? 'right-2 sm:right-4 md:right-72 lg:right-96 xl:right-96'
          : 'right-8 sm:right-2 md:right-20 lg:right-24 xl:right-36'
      } w-10/12 sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-3/12 bg-white rounded-md shadow-lg h-[80vh] sm:h-[500px] flex flex-col`}
    >
      {children}
    </div>
  );
}

export default ChatLayout;
