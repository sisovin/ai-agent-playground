# AI Agent Playground

AI Agent Playground is a modern, interactive learning platform showcasing 9 AI agent "courses" with an integrated Ollama-powered chat playground for hands‑on experimentation. Each course card opens a dedicated playground modal with agent-specific system prompts, pre-loaded starter prompts, and live model switching. The UI emphasizes a clean, modern aesthetic with a bright yellow accent and professional playground experience (IDE-like) including dark/light theme support.

- Key concept: Click a course card → opens an interactive Agent Playground (chat) → talk to the agent using selected Ollama model(s).
- Local Ollama default endpoint: http://localhost:11434

Table of contents
- About
- Live demo / screenshots
- Key features
- UI components & design guidelines
- The nine agents (agent contexts & example system prompts)
- Tech stack & architecture
- Project structure
- Installation & local setup
  - Ollama setup & troubleshooting
  - Environment variables
- Development scripts
- Ollama API integration (examples & streaming)
- Error handling & user messaging
- Accessibility & performance notes
- Testing & code quality
- Contributing
- License
- Acknowledgements

---

About
-----
AI Agent Playground is intended as a sandbox and demo site for multiple AI agent patterns:
- Multi-agent orchestration (CrewAI)
- Workflow / pipeline agents (LangGraph)
- Retrieval-augmented generation (RAG)
- Code assistants, data explorers, content coaches, etc.

It demonstrates how to build a responsive course-card catalog with a production-feel interactive chat experience driven by an on-prem/local Ollama instance. The UI uses the Next.js App Router with server components for static server-side UI (cards) and client components for interactive playground behavior.

Live demo / screenshots
-----------------------
(Insert screenshots, animated GIFs or a hosted demo link here.)

Key features
------------
- Responsive Course Card Grid (3 columns desktop, 1 column mobile)
- Nine agent course cards, each with:
  - numbered badge
  - provider logo
  - duration badge
  - instructor avatars
  - hover effects and subtle shadows
- Agent Playground Modal:
  - Full-screen or slide-over chat interface
  - Dark / Light theme toggle
  - Model selector (switch between Ollama models like llama2, mistral, codellama)
  - Pre-loaded agent-specific prompts and context
  - Streaming responses for ChatGPT-like experience
  - Smooth animations (modal transition, message fade-ins)
- Ollama integration: local API for low-latency model responses
- Good error handling & actionable setup hints for missing Ollama connections
- Header & Footer:
  - Sticky top navigation with blur, logo + brand text
  - Mobile hamburger menu with animation
  - Theme switcher and CTA
  - Footer with newsletter, four link columns, social icons, copyright
- Landing page: hero, stats, features, course grid, benefits, pricing/CTA

UI components & design guidelines
---------------------------------
Visual style
- Accent color (yellow): #FCD34D (or similar)
- Clean modern aesthetic, rounded corners, subtle shadows
- Cards lift on hover (translateY -2 to -6px + shadow increase)
- Playground should resemble a professional IDE (monospace in code messages, line highlighting)
- Smooth transitions (use Framer Motion or CSS transitions)

Key UI components
- Yellow Header Banner — top banner with title and tagline; CTA button: "Get Started"
- Course Card Grid — responsive 3-column grid on desktop, 1 column on mobile
- Agent Playground Modal — opens per card, full screen or slide-over
- Chat Interface — message bubbles, right/left alignment, message timestamps, sender avatars
- Model Selector — dropdown in the playground header (shows available local Ollama models)
- Theme Toggle — in header, persists preference to localStorage

Mobile & accessibility
- Touch-friendly sizes for buttons and inputs
- Mobile hamburger with accessible controls and focus management
- Keyboard navigation and ARIA labels for modal, chat input, and model selector
- High contrast color mode works with yellow accent

The nine agents (example contexts)
---------------------------------
Each agent loads a unique system prompt and a set of starter prompts. Customize these later from JSON or database.

1. CrewAI — Multi-agent coordinator
   - System prompt: "You are CrewAI, an expert orchestrator coordinating multiple agent specialists to solve complex tasks..."
2. LangGraph — Workflow & pipeline agent
   - System prompt: "You are LangGraph, an agent that turns user goals into structured multi-step workflows..."
3. RAG (Retrieval-Augmented Generation)
   - System prompt: "You are a RAG assistant with access to a knowledge retriever. Always cite sources and include retrieval context..."
4. Code Mentor
   - System prompt: "You are a senior software engineer and mentor. Provide step-by-step code explanations, and when possible, provide runnable code..."
5. Data Explorer
   - System prompt: "You are a data analyst assistant. Ask clarifying questions, propose charts and SQL, and explain results in plain language..."
6. Security Auditor
   - System prompt: "You are a security auditor. Evaluate vulnerabilities, propose mitigations, and explain risk impact..."
7. Content Strategist
   - System prompt: "You are a content strategist who generates outlines, SEO suggestions, and copy variations..."
8. Design Critic
   - System prompt: "You are a UX/UI expert. Provide critiques, accessibility recommendations, and alternative patterns..."
9. Interview Coach
   - System prompt: "You are an interview coach, providing practice questions, feedback, and tips for behavioral answers..."

For each agent, include a few starter prompts (e.g., "Give me a 3-step plan", "Show a sample prompt to run with this agent", "Walk me through debugging this snippet").

Tech stack & architecture
-------------------------
- Next.js (App Router)
  - Server Components: Course Card Grid, public content
  - Client Components: Playground modal, chat, model selector
- React + TypeScript
- shadcn/ui (optional UI primitives) — for cards, badges, modals, etc.
- Framer Motion (or CSS transitions) — for smooth animations
- Tailwind CSS — utility-first styling (recommended)
- Ollama local HTTP API — model serving (default port 11434)
- Fetch / streaming for chat responses (SSE or fetch ReadableStream)
- Optional: database or headless CMS for agent configuration (JSON, Prisma, or similar)

Project structure (recommended)
-------------------------------
- app/
  - layout.tsx            # Root layout (header/footer, theme)
  - page.tsx              # Landing/Home with hero, stats, features, courses
  - courses/
    - page.tsx            # Server component that renders Course Card Grid
- components/
  - Header.tsx
  - Footer.tsx
  - CourseCard.tsx        # server -> hydrates clickable client wrapper
  - AgentPlayground.tsx   # client component; modal + chat UI
  - ChatMessage.tsx
  - ModelSelector.tsx
  - ThemeToggle.tsx
- lib/
  - ollama.ts             # helper functions for communicating with Ollama
  - agents.ts             # agent definitions (id, title, icon, prompts, system prompt)
- styles/ or tailwind.config.js
- public/                 # logos, avatars, images
- scripts/                # dev scripts if needed

Installation & local setup
--------------------------
Prerequisites:
- Node.js 18+ (or as required by Next.js)
- npm or yarn
- Local Ollama installed and running (see Ollama Setup)

1. Clone the repo
   git clone <repo-url>
   cd <repo-dir>

2. Install dependencies
   pnpm install
   # or
   npm install
   # or
   yarn install

3. Copy .env example and edit
   cp .env.example .env
   # set OLLAMA_URL if custom

Environment variables
- OLLAMA_URL (optional) — default: http://localhost:11434
- NEXT_PUBLIC_OLLAMA_URL — for client-side calls (if used)
- NEXT_PUBLIC_DEFAULT_MODEL — e.g. "llama2"
- NEXT_PUBLIC_THEME — "light" | "dark" (optional default)

Example .env
```
OLLAMA_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
NEXT_PUBLIC_DEFAULT_MODEL=llama2
```

Development scripts
- Start dev:
  - pnpm dev
  - npm run dev
  - yarn dev
- Build:
  - pnpm build
  - npm run build
  - yarn build
- Start production preview:
  - pnpm start
  - npm run start
  - yarn start

Ollama setup & troubleshooting
------------------------------
Ollama runs locally and serves models via an HTTP API on port 11434 by default. Follow Ollama docs for installation: https://ollama.com/docs (or your organization's mirror).

Quick start:
- Install Ollama
- Add or pull models (e.g., llama2, mistral, codellama)
- Run Ollama daemon:
  - ollama serve
- Confirm connectivity:
  - curl http://localhost:11434/ping
  - curl http://localhost:11434/models

Common problems & fixes:
- Connection refused / network error:
  - Ensure Ollama is running (ollama serve).
  - Confirm port (11434) is not blocked by firewall.
  - If Ollama runs on a different host or Docker container, update OLLAMA_URL to the reachable address.
- Model not found:
  - Pull or install the requested model into Ollama (ollama pull <model-name>).
- Authentication:
  - If using a secured Ollama setup behind a proxy, configure credentials and update fetch calls accordingly.
- CORS:
  - If calling Ollama directly from the browser, ensure CORS is allowed or proxy requests via Next.js API routes to avoid CORS issues.

Ollama API integration (examples)
--------------------------------
Note: The exact endpoints may depend on your Ollama version. The project contains a lib/ollama.ts helper to centralize calls.

Server-side fetch (example)
```ts
// lib/ollama.ts (server-side helper)
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

export async function fetchModelList() {
  const res = await fetch(`${OLLAMA_URL}/models`);
  if (!res.ok) {
    throw new Error(`Ollama returned ${res.status}`);
  }
  return res.json();
}
```

Client-side chat with streaming (recommended pattern)
- Option A: Proxy requests through a Next.js API route (recommended to hide OLLAMA_URL and avoid client CORS issues)
- Option B: Direct client calls to NEXT_PUBLIC_OLLAMA_URL (if configured and CORS allowed)

Example (Next.js API route to proxy and stream):
```ts
// pages/api/ollama-chat.ts (or app/api/...)
import type { NextApiRequest, NextApiResponse } from 'next';

const OLLAMA_URL = process.env.OLLAMA_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { model, messages } = req.body;
    const upstream = await fetch(`${OLLAMA_URL}/chat/${model}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, stream: true }) // stream:true if supported
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      res.status(502).json({ error: text });
      return;
    }

    // pipe stream from Ollama to client (this depends on runtime and whether upstream provides SSE or ndjson)
    const reader = upstream.body!.getReader();
    const encoder = new TextEncoder();

    // Set headers for SSE/streaming response (adjust to client implementation)
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });

    // stream loop
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(encoder.decode(value));
    }
    res.end();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
```

Client-side usage (Playground):
- Open modal, set selectedModel, send chat input
- Append a client message to UI, then call the proxy API
- Stream partial content into a "pending" message bubble, then finalize on stream end

Error handling & user messaging
------------------------------
- If Ollama connection fails on startup:
  - Show a clear banner in the playground modal: "Cannot connect to Ollama at http://localhost:11434 — please ensure Ollama is running locally. See Help."
  - Provide a "Troubleshoot" link that expands actionable steps (start ollama, check port, update OLLAMA_URL)
- For model load failures:
  - Fallback to a safe lightweight model or show a retry button
- Loading states:
  - Skeleton placeholders for the card grid
  - Message bubble with spinner while streaming
- Rate-limit or model error:
  - Display the error message with a friendly explanation and optionally show logs/debug info (hidden by default)

Design & animation recommendations
----------------------------------
- Use Framer Motion for:
  - Card hover lift
  - Modal entrance/exit
  - Message fade-in and auto-scroll
- CSS fallbacks if Framer Motion not available: transform + transition on hover & opacity transitions
- Provide a small micro-interaction when model is switched (toast "Switched model to X")

Accessibility & performance
---------------------------
- Ensure modal traps focus and returns focus to trigger on close
- Provide ARIA labels for all interactive components
- Use semantic headings and landmark regions
- Lazy-load non-critical images and icons
- Use image srcset or next/image (if hosted)
- Server components for static content to improve TTFB
- Use pagination / virtualization for long chat histories

Testing & code quality
----------------------
- Unit tests for helper functions (lib/ollama.ts)
- Integration tests for API routes (mock Ollama endpoints)
- End-to-end tests (Cypress / Playwright) for main flows:
  - Opening playground from a card
  - Sending a prompt and receiving streaming response
  - Model switching
  - Theme toggling
- Linting: ESLint + Prettier or similar
- TypeScript strict mode on recommended

Contributing
------------
- Fork the repo
- Create a feature branch: git checkout -b feat/my-feature
- Run tests and linters locally
- Submit a PR with a clear description and screenshots if UI changes
- For new agents: add agent metadata in lib/agents.ts and include icon/assets in /public

Repository checklist for pull requests
- UI changes: include screenshots for mobile/desktop
- New agents: include system prompt and a couple sample prompts
- Ollama API changes: ensure proxy route updated and example included in README

License
-------
MIT (or choose the appropriate license for your project)

Acknowledgements
----------------
- Ollama — for local model serving
- Framer Motion — for animations
- shadcn/ui & Tailwind CSS — for rapid UI composition

Appendix — Example agent definition (lib/agents.ts)
--------------------------------------------------
```ts
export const AGENTS = [
  {
    id: 'crewai',
    title: 'CrewAI — Multi-Agent Orchestration',
    thumbnail: '/images/agents/crewai.png',
    duration: '1h 30m',
    instructors: ['alice', 'bob'],
    systemPrompt: 'You are CrewAI, an expert orchestrator coordinating multiple specialized agents to achieve complex tasks. Always delegate subtasks and aggregate results coherently.',
    starterPrompts: [
      'Plan a 4-step release workflow for a microservice with CI/CD, testing, and rollback.',
      'Act as CrewAI to coordinate a content generation pipeline for a product launch.'
    ]
  },
  // other agents...
];
```

Contact & support
-----------------
For questions, feature requests, or to report bugs, please open an issue in the repository or contact the maintainers.

--- 
