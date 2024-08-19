'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

export default function page() {
  useEffect(() => {
    const token = Cookies.get('token'); //
    const socket = io('http://localhost:3001/notifications', {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on('connection-status', (data) => {
      console.log(data);
    });

    // socket.on('connect-error', (data) => {
    //   console.error(data.message);
    // });

    socket.on('productCreated', (product) => {
      console.log('Nuevo producto creado:', product);
    });

    socket.on('productDeleted', ({ productId }) => {
      console.log('Producto eliminado con ID:', productId);
    });

    // return () => {
    //   socket.disconnect(); // In notifications this is not very smart
    // };
  }, []);

  return <div>page</div>;
}
