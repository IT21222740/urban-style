module.exports = (app) => {
    const chatbot = require("../../controllers/chatbot");
    app.use("/chatbot",chatbot );
    
  };