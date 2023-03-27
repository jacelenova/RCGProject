import { HubConnectionBuilder } from '@microsoft/signalr';
import React, { useState, useEffect, useRef } from 'react';
import { HUB_METHOD_CANCEL, HUB_METHOD_ENCODE_MESSAGE, HUB_METHOD_RECEIVE_MESSAGE, HUB_STATE_CONNECTED, HUB_STATE_DISCONNECTED, HUB_URL } from '../helpers/constants';
import { uuidv4 } from '../helpers/utils';

export const AppContext = React.createContext();

export const AppContextProvider = ({children}) => {
  const [connection, setConnection] = useState();
  const [hubMessage, setHubMessage] = useState();
  const [result, setResult] = useState("");
  const [isEncoding, setIsEncoding] = useState(false);
  const encodeId = useRef();
  const userId = uuidv4();

  const encodeMessage = async (text) => {
    if (connection.state === HUB_STATE_CONNECTED) {
      try {
          const id = uuidv4();
          encodeId.current = id;
          setIsEncoding(true);
          setResult("");

          const msg = { id, message: text };
          await connection.send(HUB_METHOD_ENCODE_MESSAGE, msg);
      }
      catch(e) {
          console.log(e);
      }
    }
    else {
        alert('No connection to server yet.');
    }
  }

  const cancelEncoding = async () => {
    if (connection.state === HUB_STATE_CONNECTED) {
      try {
          setIsEncoding(false);
          await connection.send(HUB_METHOD_CANCEL, encodeId.current);
          encodeId.current = "";
      }
      catch(e) {
          console.log(e);
      }
    }
    else {
        alert('No connection to server yet.');
    }
  }

  useEffect(() => {
    const connect = async () => {
      if (connection && connection.state === HUB_STATE_DISCONNECTED) {
        try {
          await connection.start();
          console.log('Connected!');
          connection.on(HUB_METHOD_RECEIVE_MESSAGE, msg => {
            console.log(msg);

            if (msg.id === encodeId.current) {
              if (msg.message === 'Done') {
                setIsEncoding(false);
              } else {
                setHubMessage(msg.message);
                setResult((current) => `${current || ""}${msg.message}`)
              }
            }

          });
        } catch(e) {
          console.log('Connection failed:', e);
        }
      }
    };

    connect();
  }, [connection]);

  useEffect(() => {
    if (!connection) {
      const newConnection = new HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

      setConnection(newConnection);
    }
  }, [connection]);

  const defaultValue = {
    userId,
    hubMessage,
    encodeMessage,
    result,
    isEncoding,
    cancelEncoding,
  };

  return (
    <AppContext.Provider value={defaultValue}>
      {children}
    </AppContext.Provider>
  )
}