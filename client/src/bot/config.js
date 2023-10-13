import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Hi I am ShopWiz`),createChatBotMessage(`If you want any help to refund processes/fashion trends or Brand informations I can help with that`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#d8d8d8',
    },
    chatMessageBox:{
      backgroundColor: '#212529'
    },
    botMessage:{
      color:'#d8d8d8'
    },
    chatButton: {
      backgroundColor: '#1d1d1d',
    }}
};

export default config;