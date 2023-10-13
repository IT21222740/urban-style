// in ActionProvider.jsx
import React from 'react';
import axios from 'axios';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const handleHello = (message) => {
    const requestData = {
      message: message,
    };
    
    axios.post('http://localhost:8070/chatbot/add', requestData)
    .then((response) => {
      // Handle the API response here
      console.log('API response:', response.data.result);
   
      const botMessage = createChatBotMessage(response.data.result);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],

    }));
    })
    .catch((error) => {
      // Handle any errors here
      console.error('API call error:', error);
    });


  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;