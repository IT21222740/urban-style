import React from 'react';
import { ThemeProvider } from 'styled-components';

import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from './../bot/config';
import MessageParser from './../bot/MessageParser';
import ActionProvider from './../bot/ActionProvider';

// all available props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Montserrat',
  headerBgColor: '#000000',
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#000000',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  {
    id: '1',
    message: 'Hello World',
    end: true,
  },
];

const Chatbottheme = () => (
  <div >
      <Chatbot config={config}
      messageParser ={MessageParser}
      actionProvider={ActionProvider}/>
  </div>
);

export default Chatbottheme;