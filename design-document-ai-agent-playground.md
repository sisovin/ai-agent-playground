# AI Agent Playground - Course Card Grid with Interactive Chat

## Dashboard

Build a modern, interactive learning platform featuring 9 AI agent course cards with integrated Ollama-powered chat playground for hands-on experimentation.

**Key UI Components**
- Yellow Header Banner - Eye-catching top banner with title and tagline
- Course Card Grid - Responsive 3-column grid (mobile: 1 column) with numbered badges, provider logos, duration badges, and instructor avatars
- Agent Playground Modal - Full-screen or slide-over chat interface that opens when clicking any card
- Chat Interface - Clean message bubbles, input field with send button, model selector dropdown for Ollama models

**Key Features & Interactions**
- Card Click Handler - Opens playground modal with agent-specific context and pre-loaded prompts
- Ollama API Integration - Connect to local Ollama instance (localhost:11434) for real-time AI responses
- Dynamic Agent Context - Each of the 9 agents loads with unique system prompts (CrewAI for multi-agent, LangGraph for workflows, RAG for retrieval, etc.)
- Model Switching - Dropdown to switch between available Ollama models (llama2, mistral, codellama)
- Smooth Animations - Card hover effects, modal transitions, and message fade-ins using Framer Motion or CSS transitions

**Style & Design Tips**

Use a clean, modern aesthetic with a bright yellow accent color (#FCD34D or similar) for the header and CTAs. Cards should have subtle shadows, rounded corners, and hover lift effects. The playground should feel like a professional IDE with a dark or light theme toggle option.

**Technical Notes**
- Use Next.js App Router with server components for the card grid and client components for the interactive playground
- Implement error handling for Ollama connection failures with helpful setup instructions
- Add loading states for API calls and streaming responses for a ChatGPT-like experience

## Header and Footer

Create a comprehensive, modern, and fully responsive header and footer for your AI Agent Playground:

✨ **Header Features:**
- Sticky navigation with backdrop blur effect
- Logo with branding (icon + text)
- Desktop navigation with icons (Courses, Features, Community, About)
- Mobile hamburger menu with smooth animations
- Theme switcher integration
- CTA button ("Get Started")
- Fully responsive - adapts beautifully to all screen sizes

🎯 **Footer Features:**
- Brand section with logo and description
- Newsletter subscription form
- 4 link columns: Product, Resources, Company, Legal
- Social media links (GitHub, Twitter, LinkedIn, Email)
- Copyright notice with heart icon
- Separator for visual hierarchy
- Mobile-friendly grid layout that stacks on small screens

📱 **Mobile Optimizations:**
- Collapsible mobile menu
- Touch-friendly button sizes
- Responsive grid layouts
- Optimized spacing and typography
- Smooth animations

## Home Landing Page
Create a comprehensive, modern landing page with:

🎨 **Landing Page Sections:**
1. Hero Section - Eye-catching gradient background with CTA buttons and badge
2. Stats Bar - 4 key metrics with icons (courses, hours, students, success rate)
3. Features Section - 6 feature cards highlighting platform benefits
4. Courses Section - Grid of all 9 AI agent courses (existing)
5. Benefits Section - Two-column layout with checklist and pricing card
6. Final CTA - Call-to-action section encouraging sign-ups

✨ **Key Features:**
- Fully responsive - Mobile-first design that scales beautifully
- Smooth scrolling - Navigation links scroll to sections
- Interactive elements - Hover effects, transitions, and animations
- Yellow accent theme - Consistent branding throughout
- Modern UI components - Using shadcn/ui cards, badges, buttons
- Clear hierarchy - Logical flow from hero to conversion
- Social proof - Stats and benefits to build trust
- Multiple CTAs - Strategic placement of action buttons

## Auth, Signin, and Signup Page
Create a comprehensive authentication system with:

✨ Features Implemented:
1. Auth Context (src/lib/auth-context.tsx)
- User state management
- Sign in/sign up/sign out functions
- LocalStorage persistence
- Loading states
2. Sign In Page (/signin)
- Email & password fields with icons
- Loading states
- Form validation
- Toast notifications
- Link to sign up page
- Forgot password link
3. Sign Up Page (/signup)
- Full name, email, password fields
- Password confirmation
- Password strength validation
- Loading states
- Toast notifications
- Link to sign in page
4. Updated Header
- When signed out: Shows "Sign In" and "Get Started" buttons
- When signed in: Shows user avatar with dropdown menu
- Avatar with user's initial fallback
- Dropdown with user info, dashboard, settings
- Sign out option
- Mobile responsive: Avatar and menu in mobile view
- Smooth transitions and hover effects

5. User Avatar
- Generated using DiceBear API
- Fallback to user's initial
- Yellow border accent
- Dropdown menu with user actions

## Dashboard with Authentication for each success user signin accessibility
Create a protected dashboard for authenticated users. Here's what you build:

**Dashboard Features:**
- Authentication Protection - Only accessible after successful sign-in, automatically redirects to /signin if not authenticated
- User Profile Header - Shows user avatar, name, email, and sign-out button
- Stats Overview - 4 key metrics cards showing:
- Courses Enrolled
- Hours Learned
- Completed Courses
- Achievements
- Continue Learning Section - Shows recent activity with progress bars for courses in progress
- All Courses Grid - Full access to all 9 AI agent courses with the interactive playground
- Updated Sign-in/Sign-up Flow - Both now redirect to /dashboard instead of the home page

## Mermaind Code

```md
graph TD
    Start([User Lands on Platform]) --> ViewGrid[View Course Card Grid]
    ViewGrid --> GridDisplay{Display Mode}
    GridDisplay -->|Desktop| Desktop3Col[Show 3-Column Grid]
    GridDisplay -->|Mobile| Mobile1Col[Show 1-Column Grid]
    
    Desktop3Col --> CardInteraction
    Mobile1Col --> CardInteraction
    
    CardInteraction[User Views 9 Course Cards] --> HoverCard{User Hovers Card?}
    HoverCard -->|Yes| ShowHover[Show Hover Effects: Lift & Shadow]
    HoverCard -->|No| CardInteraction
    ShowHover --> CardInteraction
    
    CardInteraction --> ClickCard{User Clicks Card?}
    ClickCard -->|No| CardInteraction
    ClickCard -->|Yes| LoadAgent[Load Agent-Specific Context]
    
    LoadAgent --> CheckOllama{Check Ollama Connection}
    CheckOllama -->|Connected| OpenModal[Open Playground Modal]
    CheckOllama -->|Failed| ShowError[Display Connection Error]
    ShowError --> ShowInstructions[Show Setup Instructions]
    ShowInstructions --> RetryConnection{User Retries?}
    RetryConnection -->|Yes| CheckOllama
    RetryConnection -->|No| CloseError[Close Error Modal]
    CloseError --> CardInteraction
    
    OpenModal --> LoadContext[Load Agent System Prompt]
    LoadContext --> DisplayPlayground[Display Chat Interface]
    DisplayPlayground --> ShowModelSelector[Show Model Dropdown]
    ShowModelSelector --> DefaultModel[Set Default Model]
    
    DefaultModel --> ChatReady[Chat Interface Ready]
    
    ChatReady --> UserAction{User Action}
    
    UserAction -->|Change Model| SelectModel[Open Model Dropdown]
    SelectModel --> ChooseModel{Select Model}
    ChooseModel -->|llama2| SetLlama2[Set Model: llama2]
    ChooseModel -->|mistral| SetMistral[Set Model: mistral]
    ChooseModel -->|codellama| SetCodellama[Set Model: codellama]
    SetLlama2 --> ChatReady
    SetMistral --> ChatReady
    SetCodellama --> ChatReady
    
    UserAction -->|Toggle Theme| SwitchTheme{Current Theme}
    SwitchTheme -->|Light| SetDark[Switch to Dark Theme]
    SwitchTheme -->|Dark| SetLight[Switch to Light Theme]
    SetDark --> ChatReady
    SetLight --> ChatReady
    
    UserAction -->|Type Message| InputMessage[User Types in Input Field]
    InputMessage --> SendAction{User Sends?}
    SendAction -->|No| InputMessage
    SendAction -->|Yes| ValidateInput{Input Valid?}
    ValidateInput -->|Empty| InputMessage
    ValidateInput -->|Valid| ShowLoading[Show Loading State]
    
    ShowLoading --> SendToOllama[Send Request to Ollama API]
    SendToOllama --> StreamResponse{API Response}
    StreamResponse -->|Success| DisplayStreaming[Stream Response in Real-time]
    StreamResponse -->|Error| ShowAPIError[Display Error Message]
    
    DisplayStreaming --> AnimateMessage[Fade-in Message Animation]
    AnimateMessage --> MessageComplete[Message Complete]
    MessageComplete --> ChatReady
    
    ShowAPIError --> RetryPrompt{User Retries?}
    RetryPrompt -->|Yes| SendToOllama
    RetryPrompt -->|No| ChatReady
    
    UserAction -->|Close Modal| ConfirmClose{Unsaved Chat?}
    ConfirmClose -->|No| CloseModal[Close Playground Modal]
    ConfirmClose -->|Yes| ShowWarning[Show Close Warning]
    ShowWarning --> UserConfirm{Confirm Close?}
    UserConfirm -->|Yes| CloseModal
    UserConfirm -->|No| ChatReady
    
    CloseModal --> AnimateClose[Smooth Close Animation]
    AnimateClose --> CardInteraction
    
    CardInteraction --> ExitSite{User Exits?}
    ExitSite -->|No| CardInteraction
    ExitSite -->|Yes| End([Session Ends])
    
    subgraph Card Grid Display
        ViewGrid
        GridDisplay
        Desktop3Col
        Mobile1Col
        CardInteraction
        HoverCard
        ShowHover
    end
    
    subgraph Playground Modal
        OpenModal
        LoadContext
        DisplayPlayground
        ShowModelSelector
        DefaultModel
        ChatReady
    end
    
    subgraph Chat Interaction Loop
        UserAction
        InputMessage
        SendAction
        ValidateInput
        ShowLoading
        SendToOllama
        StreamResponse
        DisplayStreaming
        AnimateMessage
        MessageComplete
    end
    
    subgraph Error Handling
        CheckOllama
        ShowError
        ShowInstructions
        ShowAPIError
        RetryPrompt
    end
```