export default function ErrorMessage({ error }) {
  const formatErrorMessage = (message) => {
    if (Array.isArray(message)) {
      return (
        <ul className="pl-5 list-disc">
          {message.map((item, index) => (
            <li key={index}>
              {typeof item === 'string'
                ? item.charAt(0).toUpperCase() + item.slice(1)
                : JSON.stringify(item)}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof message === 'string') {
      return message.charAt(0).toUpperCase() + message.slice(1);
    }

    if (typeof message === 'object' && message !== null) {
      // Si es un objeto, intentamos convertirlo a string para mostrarlo
      return JSON.stringify(message);
    }

    // En caso de que el mensaje no sea un string o un array, mostramos un mensaje genérico
    return 'An unexpected error occurred';
  };

  return (
    <div className="px-2 py-1 text-sm text-white bg-red-500 rounded-md">
      {formatErrorMessage(error) || 'An unexpected error occurred'}
    </div>
  );
}
