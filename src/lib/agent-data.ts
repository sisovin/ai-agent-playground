export interface AgentCourse {
  id: number;
  title: string;
  provider: string;
  duration: string;
  instructor: string;
  description: string;
  systemPrompt: string;
  icon: string;
}

export const agentCourses: AgentCourse[] = [
  {
    id: 1,
    title: "CrewAI Multi-Agent Systems",
    provider: "CrewAI",
    duration: "6 weeks",
    instructor: "João Moura",
    description: "Build collaborative AI agent teams that work together to solve complex tasks",
    systemPrompt: "You are a CrewAI expert assistant. Help users understand multi-agent orchestration, role assignment, and collaborative task execution. Provide examples of how different agents can work together with specific roles and goals.",
    icon: "👥"
  },
  {
    id: 2,
    title: "LangGraph Workflow Design",
    provider: "LangChain",
    duration: "5 weeks",
    instructor: "Harrison Chase",
    description: "Master stateful workflows and complex agent routing with LangGraph",
    systemPrompt: "You are a LangGraph specialist. Guide users through building stateful workflows, creating conditional edges, and designing complex agent routing patterns. Explain graph-based agent architectures.",
    icon: "🔄"
  },
  {
    id: 3,
    title: "RAG Systems & Retrieval",
    provider: "LlamaIndex",
    duration: "4 weeks",
    instructor: "Jerry Liu",
    description: "Implement advanced Retrieval-Augmented Generation for knowledge-based AI",
    systemPrompt: "You are a RAG (Retrieval-Augmented Generation) expert. Help users understand document indexing, semantic search, embedding strategies, and how to build effective knowledge retrieval systems.",
    icon: "📚"
  },
  {
    id: 4,
    title: "AutoGPT Autonomous Agents",
    provider: "AutoGPT",
    duration: "5 weeks",
    instructor: "Toran Bruce Richards",
    description: "Create self-directed agents that can plan and execute complex goals",
    systemPrompt: "You are an AutoGPT specialist. Teach users about autonomous agent loops, goal decomposition, self-reflection, and how agents can independently plan and execute multi-step tasks.",
    icon: "🤖"
  },
  {
    id: 5,
    title: "Agent Memory Systems",
    provider: "MemGPT",
    duration: "4 weeks",
    instructor: "Charles Packer",
    description: "Build agents with long-term memory and context management",
    systemPrompt: "You are a memory systems expert. Explain short-term vs long-term memory, context window management, memory hierarchies, and how to build agents that remember past interactions effectively.",
    icon: "🧠"
  },
  {
    id: 6,
    title: "Tool-Using Agents",
    provider: "OpenAI",
    duration: "3 weeks",
    instructor: "Lilian Weng",
    description: "Enable agents to interact with external tools and APIs",
    systemPrompt: "You are a tool-use specialist. Guide users through function calling, tool selection strategies, API integration, and how agents can effectively use external tools to accomplish tasks.",
    icon: "🔧"
  },
  {
    id: 7,
    title: "Multi-Modal Agents",
    provider: "Anthropic",
    duration: "5 weeks",
    instructor: "Amanda Askell",
    description: "Work with agents that process text, images, and audio",
    systemPrompt: "You are a multi-modal AI expert. Help users understand how agents can process and generate different types of content including text, images, and audio. Explain cross-modal reasoning.",
    icon: "🎨"
  },
  {
    id: 8,
    title: "Agent Evaluation & Testing",
    provider: "Weights & Biases",
    duration: "3 weeks",
    instructor: "Lukas Biewald",
    description: "Measure and improve agent performance systematically",
    systemPrompt: "You are an agent evaluation expert. Teach users about metrics, benchmarking, A/B testing, and systematic approaches to measuring and improving agent performance.",
    icon: "📊"
  },
  {
    id: 9,
    title: "Production Agent Deployment",
    provider: "LangSmith",
    duration: "4 weeks",
    instructor: "Ankush Gola",
    description: "Deploy, monitor, and scale agents in production environments",
    systemPrompt: "You are a production deployment specialist. Guide users through monitoring, logging, error handling, scaling strategies, and best practices for running agents in production.",
    icon: "🚀"
  }
];