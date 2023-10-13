const router = require("express").Router();
const Chatbot = require("../models/chatbot");
const openai = require("langchain/chat_models/openai");
const langchainAgents = require("langchain/agents");
const langchainTools = require("langchain/tools");
const langchainSchema = require("langchain/schema");
const dotenv = require("dotenv");
dotenv.config();


// Get all Items
router.route("/").get(async (req, res) => {
  try {
    const items = await Chatbot.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Assign the environment variable
process.env.LANCHAIN_HANDLER = "langchain";

// Define an async function to handle the "/add" route
const handleAddRoute = async (req, res) => {
  try {

    const {message} = req.body;
    const initiateRefund = async (name, item, phoneNumber) => {
      try {
        const chatbot = new Chatbot({
          name,
          item,
          phoneNumber
        });
        await chatbot.save();
        return 'Refund request initiated';
      } catch (err) {
        console.error(err);
      }
      return 'tell user  Refund request success';
    };

    // Create a new ChatOpenAI model
    const model = new openai.ChatOpenAI({ temperature: 0 });
    const SerpAPI  = new langchainTools.SerpAPI(process.env.SerpAPI)
    // Create a list of tools
    const tools = [
      new langchainTools.DynamicTool({
        name: "refund",
        description: "Do not use when user provide information like name,phonenuber,clothing item. when user name, phone number item not provided. this is used to refund",
        func: async () => "return response as 'Hey can you Please enter your name, phone number, clothing item' ",
      }),
      new langchainTools.DynamicTool({
        name: "initiateRefund",
        description: 'useful for when user provides name, phone number and clothing item given',
        func:  initiateRefund
      }),
      new langchainTools.DynamicTool({
        name: "fashionTrends",
        description: "This will recieve fashion Ideas/trends and Information related bussiness brands",
        func: SerpAPI.run
      }),
    ];

    

    // Initialize the agent executor
    const executor = await langchainAgents.initializeAgentExecutorWithOptions(
      tools,
      model,
      {
        agentType: "chat-conversational-react-description",
        verbose: true,
        agentArgs: {
          systemMessage:
          "You are ai chat bot for refund process If user send details you must save details in mongodb,You can only answer to brands information, refund proceses and fashion trends.If the name,phone number,item refund not given ask them to enter those details ",
          },
      }
    );

    // Run the agent with the specified input
    const result = await executor.run(message);
    console.log(result);
    console.log(message)

    // Send a response to the client
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

router.route("/add").post(handleAddRoute);
module.exports = router;
