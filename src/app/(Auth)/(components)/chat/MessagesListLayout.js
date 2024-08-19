export default function MessagesListLayout({ isExpanded, children }) {
  return (
    <div
      className={`fixed bg-primary rounded-md shadow-lg 
    ${
      isExpanded
        ? 'h-[600px] w-11/12 sm:w-10/12 md:w-4/12 lg:w-4/12 xl:w-3/12 right-4 bottom-1'
        : 'h-auto w-10 sm:w-1/12 right-2 border bottom-0'
    } `}
    >
      {children}
    </div>
  );
}
