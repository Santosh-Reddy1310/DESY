# KLAROS - AI-Powered Decision Intelligence Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://klaros.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

> **Transform complex decisions into confident choices with AI-powered analysis and structured decision-making frameworks.**

KLAROS is an intelligent decision-making platform that combines structured decision analysis with advanced AI to help individuals and teams make better, more informed decisions. Unlike traditional chatbots that provide generic advice, KLAROS offers a systematic approach to decision-making with personalized insights, multi-criteria analysis, and actionable recommendations.

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Why KLAROS?](#-why-klaros)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Database Setup](#database-setup)
- [Usage Guide](#-usage-guide)
- [Architecture](#-architecture)
- [API Reference](#-api-reference)
- [Decision Framework](#-decision-framework)
- [Security](#-security)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [License](#-license)

## 🌟 Overview

KLAROS (Knowledge Learning Analysis and Reasoning Operating System) is built on the principle that better decisions come from structured thinking, not just intuition. By combining proven decision-making frameworks like Multi-Criteria Decision Analysis (MCDA) with the power of modern AI, KLAROS helps you:

- **Break down complex decisions** into manageable criteria
- **Evaluate options objectively** using weighted scoring
- **Visualize trade-offs** with interactive charts and matrices
- **Get AI-powered insights** tailored to your specific context
- **Track decision outcomes** to improve future choices
- **Collaborate with teams** on important decisions

### Real-World Use Cases

- 🏠 **Personal Life**: Choosing a home, planning a career move, selecting education paths
- 💼 **Business**: Vendor selection, strategic planning, investment decisions
- 🎯 **Product Management**: Feature prioritization, roadmap planning, market entry
- 🏢 **Hiring**: Candidate evaluation, compensation planning
- 🚗 **Purchases**: Buying a car, selecting equipment, technology choices
- 🌍 **Relocation**: City comparison, job offer evaluation

## 🚀 Key Features

### 🧠 Intelligent Decision Framework

#### Multi-Criteria Decision Analysis (MCDA)
KLAROS implements industry-standard MCDA methodology:
- **Weighted Criteria**: Assign importance (1-10) to each decision factor
- **Normalized Scoring**: Options rated consistently across all criteria
- **Aggregated Results**: Final scores calculated using weighted averages
- **Sensitivity Analysis**: See how changing weights affects outcomes

#### Comprehensive Options Comparison
- **Side-by-side Analysis**: Compare unlimited options simultaneously
- **Detailed Scoring**: Granular breakdown of how each option performs
- **Visual Comparisons**: Radar charts, bar graphs, and score matrices
- **Pros/Cons Integration**: Qualitative factors alongside quantitative scores

#### Advanced Constraint Management
Define decision boundaries that must be respected:
- **Budget Constraints**: Set spending limits
- **Time Constraints**: Define deadlines and timelines
- **Resource Constraints**: Specify availability limitations
- **Regulatory Constraints**: Ensure compliance requirements
- **Personal Constraints**: Add subjective non-negotiables

#### Comprehensive Risk Assessment
For each option, KLAROS helps identify:
- **Financial Risks**: Cost overruns, ROI uncertainty
- **Operational Risks**: Implementation challenges, dependencies
- **Strategic Risks**: Market changes, competitive responses
- **Personal Risks**: Lifestyle impacts, commitment levels
- **Mitigation Strategies**: AI-suggested ways to reduce risks

### 🤖 AI-Powered Insights

#### Contextual Analysis
KLAROS's AI engine:
- Understands your specific situation and requirements
- Analyzes historical decision patterns
- Considers industry-specific factors
- Adapts recommendations to your risk profile
- Learns from feedback and outcomes

#### Personalized Recommendations
- **Priority-Aware**: Recommendations respect your criteria weights
- **Context-Sensitive**: Considers your constraints and situation
- **Explainable**: Clear reasoning for every recommendation
- **Confidence Scoring**: Quantified certainty levels (0-100%)
- **Alternative Suggestions**: Multiple pathways when decisions are close

#### Reasoning Transparency
Every AI recommendation includes:
- **Scoring Breakdown**: How each option scored on criteria
- **Weight Impact Analysis**: Which criteria drove the recommendation
- **Risk Consideration**: How risks were factored in
- **Trade-off Explanation**: What you gain/lose with each choice
- **Assumption Documentation**: What the AI assumed in its analysis

### 📊 Advanced Analytics & Visualization

#### Interactive Visualizations
- **Radar Charts**: Multi-dimensional comparison across criteria
- **Score Distribution**: See how options cluster or differ
- **Weight Sensitivity**: Interactive weight adjustment
- **Timeline Views**: Track decision evolution
- **Export Options**: PNG, PDF, or data export

#### Decision Intelligence Dashboard
- **Decision Overview**: At-a-glance status of all decisions
- **Historical Analytics**: Learn from past decisions
- **Pattern Recognition**: Identify decision-making tendencies
- **Outcome Tracking**: Record and analyze decision results
- **Performance Metrics**: Decision quality and confidence trends

#### What-If Analysis
Explore scenarios by:
- Adjusting criteria weights in real-time
- Adding/removing constraints
- Changing option attributes
- Testing risk mitigation strategies
- Comparing different decision contexts

### 🔒 Enterprise-Grade Security

#### Authentication & Authorization
- **Multi-Factor Authentication**: Optional 2FA via Clerk
- **Single Sign-On (SSO)**: Enterprise SSO support
- **Role-Based Access**: Admin, Editor, Viewer roles
- **Invitation System**: Controlled team access
- **Session Management**: Secure token handling

#### Data Protection
- **Encryption at Rest**: AES-256 encryption for stored data
- **Encryption in Transit**: TLS 1.3 for all communications
- **Row-Level Security**: Database-level access controls
- **Data Isolation**: Complete tenant separation
- **Audit Logging**: Comprehensive activity tracking

#### Compliance
- **GDPR Compliant**: Right to access, deletion, portability
- **SOC 2 Ready**: Security control implementation
- **Data Residency**: Geographic data storage options
- **Privacy Controls**: Granular data sharing settings
- **Retention Policies**: Configurable data lifecycle

## 🎯 Why KLAROS?

### KLAROS vs Traditional AI Chatbots

| Feature | Traditional AI Chatbots | KLAROS |
|---------|------------------------|------|
| **Approach** | Conversational advice | Structured decision framework |
| **Analysis Method** | Subjective responses | Multi-criteria quantitative analysis |
| **Personalization** | Generic suggestions | Weighted criteria based on your priorities |
| **Transparency** | Black box reasoning | Clear scoring and detailed explanations |
| **Decision Tracking** | No context memory | Complete history with outcome tracking |
| **Collaboration** | Individual conversations | Team decision-making with shared context |
| **Actionability** | Vague recommendations | Specific, ranked options with confidence scores |
| **Reproducibility** | Different results each time | Consistent methodology with documented process |
| **Learning** | No improvement over time | Learns from decision outcomes |

### Key Differentiators

1. **Structured Methodology**: Based on proven decision science, not just AI responses
2. **Quantitative Framework**: Objective scoring alongside qualitative insights
3. **Reproducible Results**: Same inputs produce consistent, explainable outputs
4. **Decision Memory**: Context retained across sessions and decisions
5. **Team Collaboration**: Shared decision-making with role-based access
6. **Outcome Tracking**: Close the feedback loop by recording results
7. **Continuous Improvement**: System learns from your decision patterns

## 🛠 Technology Stack

### Frontend Architecture

#### Core Framework
- **React 18.3+**: Modern React with concurrent features
- **TypeScript 5.3+**: Type-safe development with strict mode
- **Vite 5.0+**: Next-generation frontend tooling
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Native ES modules support

#### UI & Styling
- **Tailwind CSS 3.4+**: Utility-first CSS framework
  - Custom design system configuration
  - Dark mode support
  - Responsive design utilities
- **Shadcn/ui**: High-quality, accessible React components
  - Radix UI primitives
  - Full customization capability
  - ARIA-compliant components

#### Data Visualization
- **Recharts 2.10+**: Composable charting library
  - Responsive radar charts
  - Interactive bar/line charts
  - Custom tooltips and legends
- **D3.js**: Advanced custom visualizations
- **React Flow** (planned): Decision tree visualization

#### State Management
- **React Context API**: Global state management
- **React Query**: Server state synchronization
  - Automatic caching
  - Background refetching
  - Optimistic updates
- **Zustand** (planned): Client state management

### Backend & Infrastructure

#### Database & Backend
- **Supabase**: Open-source Firebase alternative
  - **PostgreSQL 15**: Robust relational database
  - **Row-Level Security (RLS)**: Database-level authorization
  - **Real-time Subscriptions**: Live data updates
  - **PostgREST**: Automatic REST API generation
  - **Storage**: Secure file storage with CDN

#### Database Schema
```sql
-- Core Tables
- users: User profiles and preferences
- decisions: Decision metadata and status
- options: Decision options/alternatives
- criteria: Decision criteria and weights
- scores: Option scores per criterion
- constraints: Decision constraints
- ai_analyses: AI-generated insights
- decision_history: Audit trail and versions
```

#### Authentication & Security
- **Clerk Authentication**: Modern authentication platform
  - Email/password authentication
  - Social OAuth (Google, GitHub, etc.)
  - Magic link authentication
  - MFA/2FA support
  - User management dashboard
- **JWT Tokens**: Secure API authentication
- **API Key Management**: For programmatic access

### AI & Machine Learning

#### AI Provider Support
KLAROS supports multiple AI providers for flexibility:

**Primary Providers:**
- **OpenAI GPT-4**: Most powerful, highest quality
  - Models: `gpt-4-turbo-preview`, `gpt-4`
  - Best for: Complex analysis, nuanced reasoning
  
- **Groq**: Ultra-fast inference
  - Models: `llama-3.3-70b-versatile`, `mixtral-8x7b`
  - Best for: Real-time analysis, cost efficiency
  
- **OpenRouter**: Multi-model access
  - Access to 100+ models
  - Best for: Flexibility, experimentation

**Fallback System:**
- Automatic provider switching on failure
- Graceful degradation to simpler models
- Error handling and retry logic

#### AI Capabilities
- **Decision Analysis**: Structured evaluation of options
- **Risk Assessment**: Identification and evaluation of risks
- **Recommendation Generation**: Personalized suggestions
- **Explanation Generation**: Natural language reasoning
- **Pattern Recognition**: Learning from decision history
- **Constraint Validation**: Checking option feasibility

### Development Tools

#### Code Quality
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript Strict Mode**: Maximum type safety
- **Husky**: Git hooks for pre-commit checks

#### Testing (Planned)
- **Vitest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **MSW**: API mocking

#### Development Experience
- **VS Code**: Recommended IDE
- **TypeScript Language Server**: IntelliSense support
- **Tailwind IntelliSense**: CSS class autocomplete
- **Error Boundaries**: Graceful error handling

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher (LTS recommended)
  ```bash
  node --version  # Should show v18.x.x or higher
  ```
  
- **Package Manager**: npm (comes with Node.js) or Bun
  ```bash
  npm --version   # Should show 9.x.x or higher
  # OR
  bun --version   # Should show 1.x.x or higher
  ```

- **Git**: For cloning the repository
  ```bash
  git --version
  ```

### Required Accounts

You'll need to create accounts with the following services:

1. **Supabase** (Database & Backend)
   - Sign up at: https://supabase.com
   - Create a new project
   - Note your project URL and anon key

2. **Clerk** (Authentication)
   - Sign up at: https://clerk.com
   - Create a new application
   - Note your publishable key

3. **AI Provider** (Choose one or more)
   - **Groq** (Recommended for speed): https://groq.com
   - **OpenAI** (Best quality): https://openai.com
   - **OpenRouter** (Multi-model access): https://openrouter.ai

### Installation

#### Step 1: Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/yourusername/klaros.git

# OR clone via SSH
git clone git@github.com:yourusername/klaros.git

# Navigate to the project directory
cd klaros
```

#### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using Bun (faster)
bun install

# OR using yarn
yarn install
```

This will install all required dependencies including:
- React and React DOM
- TypeScript
- Vite and related plugins
- Tailwind CSS
- Shadcn/ui components
- Supabase client
- Clerk SDK
- Recharts
- And all other dependencies listed in `package.json`

#### Step 3: Environment Configuration

Create your environment configuration file:

```bash
# Copy the example environment file
cp .env.example .env.local
```

Open `.env.local` and fill in your credentials:

```env
# ==============================================
# SUPABASE CONFIGURATION
# ==============================================
# Get these from: https://app.supabase.com/project/_/settings/api
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key_here

# Optional: Supabase Service Role Key (for admin operations)
# NEVER commit this to version control or expose to frontend
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# ==============================================
# CLERK AUTHENTICATION
# ==============================================
# Get these from: https://dashboard.clerk.com
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# Optional: Clerk Secret Key (for backend operations)
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# ==============================================
# AI PROVIDER CONFIGURATION
# ==============================================
# Choose your primary AI provider: 'openai', 'groq', or 'openrouter'
VITE_PRIMARY_AI_PROVIDER=groq

# Groq Configuration (Recommended for speed and cost)
# Get from: https://console.groq.com/keys
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here
VITE_GROQ_MODEL=llama-3.3-70b-versatile

# OpenAI Configuration (Best for quality)
# Get from: https://platform.openai.com/api-keys
VITE_OPENAI_API_KEY=sk-your_openai_api_key_here
VITE_OPENAI_MODEL=gpt-4-turbo-preview

# OpenRouter Configuration (Access to multiple models)
# Get from: https://openrouter.ai/keys
VITE_OPENROUTER_API_KEY=sk-or-v1-your_openrouter_api_key_here
VITE_OPENROUTER_MODEL=anthropic/claude-3-opus

# ==============================================
# APPLICATION CONFIGURATION
# ==============================================
# Application environment: 'development', 'staging', or 'production'
VITE_APP_ENV=development

# Application URL (for OAuth redirects, etc.)
VITE_APP_URL=http://localhost:5173

# API Base URL (if using a separate backend)
# VITE_API_BASE_URL=http://localhost:3000

# ==============================================
# FEATURE FLAGS
# ==============================================
# Enable/disable features during development
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_TEAM_FEATURES=false
VITE_ENABLE_AI_SUGGESTIONS=true
VITE_ENABLE_EXPORT_PDF=true

# ==============================================
# ANALYTICS (Optional)
# ==============================================
# Google Analytics
# VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# PostHog Analytics
# VITE_POSTHOG_KEY=phc_your_posthog_key
# VITE_POSTHOG_HOST=https://app.posthog.com

# ==============================================
# MONITORING (Optional)
# ==============================================
# Sentry Error Tracking
# VITE_SENTRY_DSN=https://your_sentry_dsn@sentry.io/project_id
# VITE_SENTRY_ENVIRONMENT=development

# ==============================================
# STORAGE (Optional)
# ==============================================
# Supabase Storage bucket names
VITE_STORAGE_BUCKET_AVATARS=avatars
VITE_STORAGE_BUCKET_EXPORTS=exports
VITE_STORAGE_BUCKET_UPLOADS=uploads
```

### Configuration

#### Detailed Configuration Options

##### Supabase Configuration

1. **Get your Supabase credentials:**
   - Go to https://app.supabase.com
   - Select your project
   - Navigate to Settings → API
   - Copy the Project URL and anon/public key

2. **Configure Supabase:**
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
   ```

##### Clerk Authentication Configuration

1. **Set up Clerk:**
   - Go to https://dashboard.clerk.com
   - Create a new application
   - Configure authentication methods (email, social, etc.)
   - Get your publishable key from API Keys section

2. **Configure Clerk:**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   ```

3. **Configure authentication providers:**
   - In Clerk dashboard, go to User & Authentication → Social Connections
   - Enable desired providers (Google, GitHub, etc.)
   - Configure OAuth settings

##### AI Provider Configuration

**Option 1: Groq (Recommended for speed)**
```env
VITE_PRIMARY_AI_PROVIDER=groq
VITE_GROQ_API_KEY=gsk_...
VITE_GROQ_MODEL=llama-3.3-70b-versatile
```

Available Groq models:
- `llama-3.3-70b-versatile`: Best balance of speed and quality
- `mixtral-8x7b-32768`: Larger context window
- `llama-3.1-70b-versatile`: Alternative model

**Option 2: OpenAI (Best quality)**
```env
VITE_PRIMARY_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=sk-...
VITE_OPENAI_MODEL=gpt-4-turbo-preview
```

Available OpenAI models:
- `gpt-4-turbo-preview`: Latest GPT-4 with improved performance
- `gpt-4`: Original GPT-4
- `gpt-3.5-turbo`: Faster, more economical option

**Option 3: OpenRouter (Multi-model access)**
```env
VITE_PRIMARY_AI_PROVIDER=openrouter
VITE_OPENROUTER_API_KEY=sk-or-v1-...
VITE_OPENROUTER_MODEL=anthropic/claude-3-opus
```

### Database Setup

#### Step 1: Create Supabase Tables

1. **Open Supabase SQL Editor:**
   - Go to your Supabase project dashboard
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

2. **Run the schema creation script:**

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Clerk user data)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_user_id TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Decisions table
CREATE TABLE decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    context TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'analyzing', 'completed', 'archived')),
    decision_type TEXT,
    deadline TIMESTAMP WITH TIME ZONE,
    final_choice UUID,
    outcome_recorded BOOLEAN DEFAULT FALSE,
    outcome_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Options table
CREATE TABLE options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    pros TEXT[],
    cons TEXT[],
    estimated_cost DECIMAL,
    estimated_time_days INTEGER,
    custom_attributes JSONB DEFAULT '{}',
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criteria table
CREATE TABLE criteria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    weight INTEGER NOT NULL CHECK (weight >= 1 AND weight <= 10),
    category TEXT,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scores table (junction table for option-criterion scores)
CREATE TABLE scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    option_id UUID REFERENCES options(id) ON DELETE CASCADE,
    criterion_id UUID REFERENCES criteria(id) ON DELETE CASCADE,
    score DECIMAL NOT NULL CHECK (score >= 0 AND score <= 10),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(option_id, criterion_id)
);

-- Constraints table
CREATE TABLE constraints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('budget', 'time', 'resource', 'regulatory', 'personal')),
    description TEXT NOT NULL,
    value TEXT,
    is_hard_constraint BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Analyses table
CREATE TABLE ai_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE,
    analysis_type TEXT NOT NULL CHECK (analysis_type IN ('recommendation', 'risk_assessment', 'explanation')),
    provider TEXT NOT NULL,
    model TEXT NOT NULL,
    prompt TEXT,
    response JSONB NOT NULL,
    confidence_score DECIMAL CHECK (confidence_score >= 0 AND confidence_score <= 100),
    processing_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Decision History table (for version control and audit trail)
CREATE TABLE decision_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    changes JSONB,
    snapshot JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_decisions_user_id ON decisions(user_id);
CREATE INDEX idx_decisions_status ON decisions(status);
CREATE INDEX idx_options_decision_id ON options(decision_id);
CREATE INDEX idx_criteria_decision_id ON criteria(decision_id);
CREATE INDEX idx_scores_option_id ON scores(option_id);
CREATE INDEX idx_scores_criterion_id ON scores(criterion_id);
CREATE INDEX idx_constraints_decision_id ON constraints(decision_id);
CREATE INDEX idx_ai_analyses_decision_id ON ai_analyses(decision_id);
CREATE INDEX idx_decision_history_decision_id ON decision_history(decision_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_decisions_updated_at BEFORE UPDATE ON decisions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_options_updated_at BEFORE UPDATE ON options
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_criteria_updated_at BEFORE UPDATE ON criteria
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scores_updated_at BEFORE UPDATE ON scores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### Step 2: Configure Row-Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE options ENABLE ROW LEVEL SECURITY;
ALTER TABLE criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE constraints ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_history ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (clerk_user_id = auth.jwt() ->> 'sub');

-- Decisions policies
CREATE POLICY "Users can view own decisions" ON decisions
    FOR SELECT USING (user_id IN (
        SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can create own decisions" ON decisions
    FOR INSERT WITH CHECK (user_id IN (
        SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can update own decisions" ON decisions
    FOR UPDATE USING (user_id IN (
        SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can delete own decisions" ON decisions
    FOR DELETE USING (user_id IN (
        SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
    ));

-- Options policies
CREATE POLICY "Users can view options for own decisions" ON options
    FOR SELECT USING (decision_id IN (
        SELECT id FROM decisions WHERE user_id IN (
            SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
        )
    ));

CREATE POLICY "Users can manage options for own decisions" ON options
    FOR ALL USING (decision_id IN (
        SELECT id FROM decisions WHERE user_id IN (
            SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'
        )
    ));

-- Similar policies for criteria, scores, constraints, ai_analyses, and decision_history
-- (Follow the same pattern as options policies)
```

#### Step 3: Start Development Server

```bash
# Using npm
npm run dev

# OR using Bun
bun dev

# OR using yarn
yarn dev
```

The application will start on `http://localhost:5173`

#### Step 4: Verify Setup

1. **Open your browser** and navigate to `http://localhost:5173`
2. **Sign up** for a new account using the authentication form
3. **Create a test decision** to verify everything is working:
   - Click "New Decision"
   - Fill in the decision details
   - Add options and criteria
   - Request AI analysis
   - View results

If everything works correctly, you're ready to start using KLAROS!

## 📖 Usage Guide

### Creating Your First Decision

#### Step-by-Step Walkthrough

**1. Sign Up / Log In**
- Click "Get Started" or "Sign In" on the homepage
- Choose your authentication method:
  - Email and password
  - Google OAuth
  - GitHub OAuth
  - Magic link (passwordless)

**2. Start a New Decision**
- Click the "New Decision" button in the dashboard
- You'll be guided through a multi-step wizard

**3. Define Your Decision Context**
- **Decision Title**: Give your decision a clear, descriptive name
  - Example: "Choose Between Job Offers"
  
- **Description**: Provide context about what you're deciding
  - Example: "I have two job offers and need to decide which one aligns better with my career goals and personal life."
  
- **Decision Type** (optional): Categorize your decision
  - Career, Personal, Business, Financial, etc.
  
- **Deadline** (optional): Set when you need to decide
  - Helps prioritize and track time-sensitive decisions

**4. Add Your Options**
For each option, provide:
- **Title**: Concise name (e.g., "Company A - Senior Engineer")
- **Description**: Detailed information about the option
- **Pros**: What are the advantages?
  - Higher salary, better benefits, shorter commute
- **Cons**: What are the drawbacks?
  - Less interesting work, smaller team, less growth potential
- **Estimated Cost**: If applicable (e.g., relocation costs)
- **Time Investment**: How long to implement (e.g., 2 weeks notice period)

**Example Options:**
```
Option 1: Tech Startup - Senior Developer
- Pros: Cutting-edge tech, equity, flexible hours
- Cons: Lower base salary, less stable, longer hours
- Estimated Cost: $5,000 (relocation)
- Time: 30 days

Option 2: Enterprise Corporation - Lead Engineer
- Pros: High salary, job security, good benefits
- Cons: Legacy systems, bureaucracy, rigid schedule
- Estimated Cost: $0 (no relocation)
- Time: 14 days
```

**5. Define Your Criteria**
List what factors matter in your decision:
- **Name**: Clear criterion name
- **Description**: What this criterion means
- **Weight**: Importance level (1-10)
  - 10 = Critical factor
  - 7-9 = Very important
  - 4-6 = Moderately important
  - 1-3 = Nice to have
- **Category**: Group related criteria (optional)

**Example Criteria:**
```
1. Salary & Compensation (Weight: 10)
   - Base salary, bonuses, equity, benefits

2. Work-Life Balance (Weight: 9)
   - Hours, flexibility, commute, remote options

3. Career Growth (Weight: 9)
   - Learning opportunities, promotion path, skill development

4. Technology Stack (Weight: 7)
   - Modern tools, interesting problems, technical debt

5. Company Culture (Weight: 8)
   - Team dynamics, values alignment, management style

6. Job Security (Weight: 6)
   - Company stability, market position, funding
```

**6. Add Constraints (Optional)**
Define any non-negotiable requirements:
- **Budget Constraints**: "Must stay under $10k for relocation"
- **Time Constraints**: "Must start within 60 days"
- **Personal Constraints**: "Must allow 2 days/week remote work"
- **Regulatory**: "Must sponsor visa"

**7. Get AI Analysis**
- Click "Analyze with AI"
- The system will:
  - Evaluate each option against your criteria
  - Calculate weighted scores
  - Assess risks for each option
  - Generate personalized recommendations
  - Provide confidence scores and reasoning

**8. Review Results**
Explore the analysis through multiple views:
- **Summary Dashboard**: Top recommendation with reasoning
- **Detailed Scores**: How each option scored on every criterion
- **Visual Comparison**: Radar chart showing multi-dimensional comparison
- **Risk Assessment**: Identified risks and mitigation strategies
- **What-If Analysis**: Adjust weights to see how recommendations change

**9. Make Your Decision**
- Select your final choice
- Add outcome notes (what influenced your final decision)
- Mark the decision as completed

**10. Track Outcome**
- After implementing your decision, record the outcome
- Note what went well and what didn't
- Help KLAROS learn your preferences for future decisions

### Advanced Features

#### What-If Analysis
Test how changing priorities affects recommendations:

1. **Access What-If Mode**: Click "Explore Scenarios" in results view
2. **Adjust Criteria Weights**: Use sliders to change importance
3. **See Real-Time Updates**: Recommendations update as you adjust
4. **Compare Scenarios**: Save and compare different weight configurations
5. **Find Tipping Points**: Discover which criteria most influence the outcome

**Example Use Case:**
- Your initial weights prioritize salary highly
- What-If analysis shows that if work-life balance matters more, a different option becomes optimal
- Helps you understand trade-offs and make values-aligned decisions

#### Collaboration Features

**Share Decisions (Read-Only):**
- Generate a shareable link
- Recipients can view your decision framework and analysis
- Useful for getting input without editing access

**Team Decisions (Coming Soon):**
- Invite team members as collaborators
- Each member can submit their own criteria weights
- System aggregates preferences for group decisions
- Track individual vs. collective recommendations

#### Decision Templates
Create reusable frameworks for recurring decision types:

**Personal Templates:**
- Job evaluation framework
- Home purchase criteria
- Investment decision process
- Vendor selection criteria

**Team Templates:**
- Feature prioritization
- Candidate evaluation
- Strategic initiative ranking
- Supplier selection

#### Export & Reporting

**Export Formats:**
- **PDF Report**: Comprehensive decision documentation
  - Executive summary
  - Detailed analysis
  - Visual charts
  - Appendices with raw data
  
- **CSV Data**: Raw scores and criteria for spreadsheet analysis
  
- **JSON**: Complete decision data for programmatic access

**Report Customization:**
- Include/exclude sections
- Add custom branding
- Adjust detail level
- Add annotations

#### Decision History & Analytics

**Track Your Decisions:**
- View all past decisions in timeline view
- Filter by status, type, or date
- Search across decision titles and descriptions

**Learn from Patterns:**
- See which criteria you consistently prioritize
- Identify decision-making tendencies
- Analyze outcome patterns
- Improve future decisions based on past results

**Outcome Tracking:**
- Record whether decisions worked out as expected
- Note lessons learned
- Build personal decision-making wisdom

### Tips for Better Decisions

**1. Be Specific with Options**
- Include concrete details rather than vague descriptions
- Add quantitative information where possible
- Research thoroughly before inputting

**2. Balance Criteria Count**
- 5-8 criteria is usually optimal
- Too few oversimplifies; too many causes analysis paralysis
- Group related factors under broader criteria

**3. Calibrate Weights Carefully**
- Use the full 1-10 scale
- Don't make everything a 10
- Differentiate between critical, important, and nice-to-have

**4. Consider Constraints**
- Think about true non-negotiables vs. preferences
- Hard constraints eliminate options; soft constraints influence scoring

**5. Review AI Reasoning**
- Don't blindly follow recommendations
- Understand the "why" behind suggestions
- Use AI as decision support, not decision replacement

**6. Use What-If Analysis**
- Explore edge cases
- Test sensitivity to key criteria
- Understand trade-offs deeply

**7. Document Your Process**
- Add notes about your thinking
- Record external factors not captured in criteria
- Create an audit trail for future reference

**8. Follow Up on Outcomes**
- Track whether your decisions worked out
- Identify patterns in good vs. poor outcomes
- Refine your decision-making process over time

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   React UI   │  │  Clerk Auth  │  │   Recharts   │     │
│  │  Components  │  │    SDK       │  │ Visualization│     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                           │                                  │
│                  ┌────────▼────────┐                        │
│                  │  Supabase Client│                        │
│                  │    (JS SDK)     │                        │
│                  └────────┬────────┘                        │
└───────────────────────────┼─────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │   API Gateway   │
                   │   (PostgREST)   │
                   └────────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼─────┐  ┌─────────▼────────┐
│   PostgreSQL   │  │    Auth    │  │   Storage/CDN    │
│   (Database)   │  │   (GoTrue) │  │                  │
│   + RLS        │  │            │  │                  │
└───────┬────────┘  └────────────┘  └──────────────────┘
        │
┌───────▼─────────────────────────────────────────────┐
│              AI Service Layer                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐     │
│  │  OpenAI  │  │   Groq   │  │ OpenRouter   │     │
│  │   API    │  │   API    │  │     API      │     │
│  └──────────┘  └──────────┘  └──────────────┘     │
└──────────────────────────────────────────────────────┘
```

### Data Flow

**Decision Creation Flow:**
```
User Input → Validation → State Management → Supabase API
                                                  ↓
                                            Database Storage
                                                  ↓
                                           Trigger AI Analysis
                                                  ↓
                                            AI Provider
                                                  ↓
                                          Analysis Results
                                                  ↓
                                         Update Database
                                                  ↓
                                          Real-time Update
                                                  ↓
                                           UI Refresh
```

**Authentication Flow:**
```
User Login → Clerk Auth → JWT Token → Supabase Auth
                                           ↓
                                      RLS Policies
                                           ↓
                                      Data Access
```

### Component Architecture

```
src/
├── components/
│   ├── auth/                    # Authentication components
│   │   ├── SignInForm.tsx
│   │   ├── SignUpForm.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── dashboard/               # Dashboard components
│   │   ├── DashboardLayout.tsx
│   │   ├── DecisionCard.tsx
│   │   ├── DecisionList.tsx
│   │   └── StatsOverview.tsx
│   │
│   ├── wizard/                  # Decision creation wizard
│   │   ├── WizardContainer.tsx
│   │   ├── Step1Context.tsx
│   │   ├── Step2Options.tsx
│   │   ├── Step3Criteria.tsx
│   │   ├── Step4Constraints.tsx
│   │   └── Step5Review.tsx
│   │
│   ├── results/                 # Results visualization
│   │   ├── ResultsDashboard.tsx
│   │   ├── ScoreMatrix.tsx
│   │   ├── RadarChart.tsx
│   │   ├── RiskAssessment.tsx
│   │   └── AIRecommendation.tsx
│   │
│   ├── analysis/                # Analysis tools
│   │   ├── WhatIfAnalysis.tsx
│   │   ├── CriteriaWeightSlider.tsx
│   │   └── ScenarioComparison.tsx
│   │
│   └── ui/                      # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Dialog.tsx
│       └── ...
│
├── contexts/                    # React contexts
│   ├── AuthContext.tsx
│   ├── DecisionContext.tsx
│   └── ThemeContext.tsx
│
├── hooks/                       # Custom hooks
│   ├── useDecisions.ts
│   ├── useAIAnalysis.ts
│   ├── useSupabase.ts
│   └── useAuth.ts
│
├── lib/                         # Utilities and services
│   ├── supabase.ts             # Supabase client
│   ├── ai-service.ts           # AI provider integration
│   ├── calculations.ts         # Score calculations
│   └── utils.ts                # General utilities
│
├── types/                       # TypeScript types
│   ├── decision.types.ts
│   ├── user.types.ts
│   └── api.types.ts
│
└── pages/                       # Page components
    ├── HomePage.tsx
    ├── DashboardPage.tsx
    ├── DecisionWizardPage.tsx
    ├── ResultsPage.tsx
    └── SettingsPage.tsx
```

## 📡 API Reference

### Decision Management API

#### Create Decision
```typescript
POST /rest/v1/decisions
Content-Type: application/json
Authorization: Bearer {jwt_token}

{
  "title": "Choose Between Job Offers",
  "description": "Evaluating two job opportunities",
  "context": "Currently employed, looking for growth",
  "decision_type": "career",
  "deadline": "2024-12-31T23:59:59Z"
}

Response: 201 Created
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "Choose Between Job Offers",
  "status": "draft",
  "created_at": "2024-01-15T10:30:00Z",
  ...
}
```

#### Get Decision
```typescript
GET /rest/v1/decisions?id=eq.{decision_id}
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "id": "uuid",
  "title": "Choose Between Job Offers",
  "options": [...],
  "criteria": [...],
  "constraints": [...],
  ...
}
```

#### Update Decision
```typescript
PATCH /rest/v1/decisions?id=eq.{decision_id}
Content-Type: application/json
Authorization: Bearer {jwt_token}

{
  "status": "completed",
  "final_choice": "option_uuid"
}

Response: 200 OK
```

#### Delete Decision
```typescript
DELETE /rest/v1/decisions?id=eq.{decision_id}
Authorization: Bearer {jwt_token}

Response: 204 No Content
```

### Options API

#### Add Option
```typescript
POST /rest/v1/options
Content-Type: application/json
Authorization: Bearer {jwt_token}

{
  "decision_id": "uuid",
  "title": "Company A - Senior Engineer",
  "description": "Startup in SF Bay Area",
  "pros": ["High growth potential", "Modern tech stack"],
  "cons": ["Lower salary", "Less stable"],
  "estimated_cost": 5000.00,
  "estimated_time_days": 30
}

Response: 201 Created
```

### Criteria API

#### Add Criterion
```typescript
POST /rest/v1/criteria
Content-Type: application/json
Authorization: Bearer {jwt_token}

{
  "decision_id": "uuid",
  "name": "Salary & Compensation",
  "description": "Total compensation package",
  "weight": 10,
  "category": "financial"
}

Response: 201 Created
```

### AI Analysis API

#### Request Analysis
```typescript
POST /api/analyze
Content-Type: application/json
Authorization: Bearer {jwt_token}

{
  "decision_id": "uuid",
  "analysis_types": ["recommendation", "risk_assessment"],
  "provider": "groq",
  "model": "llama-3.3-70b-versatile"
}

Response: 200 OK
{
  "analysis_id": "uuid",
  "recommendations": [...],
  "risk_assessment": {...},
  "confidence_score": 85.5,
  "processing_time_ms": 1250
}
```

### Real-time Subscriptions

```typescript
// Subscribe to decision updates
const subscription = supabase
  .channel('decision-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'decisions',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      console.log('Decision updated:', payload);
    }
  )
  .subscribe();
```

## 🧮 Decision Framework

### Multi-Criteria Decision Analysis (MCDA)

KLAROS implements a weighted sum model for MCDA:

#### Score Calculation

For each option, the final score is calculated as:

```
Final Score = Σ (Criterion Weight × Normalized Score) / Σ (All Weights)

Where:
- Criterion Weight: User-assigned importance (1-10)
- Normalized Score: Option's score on that criterion (0-10)
- Sum is taken across all criteria
```

#### Example Calculation

**Criteria:**
- Salary (Weight: 10)
- Work-Life Balance (Weight: 9)
- Career Growth (Weight: 9)
- Technology (Weight: 7)

**Option A Scores:**
- Salary: 7/10
- Work-Life Balance: 9/10
- Career Growth: 8/10
- Technology: 10/10

**Calculation:**
```
Total Weight = 10 + 9 + 9 + 7 = 35

Weighted Score = (10×7 + 9×9 + 9×8 + 7×10) / 35
               = (70 + 81 + 72 + 70) / 35
               = 293 / 35
               = 8.37/10
```

### Risk Assessment Framework

KLAROS evaluates risks across multiple dimensions:

#### Risk Categories
1. **Financial Risk**: Cost overruns, unexpected expenses
2. **Time Risk**: Delays, longer than expected implementation
3. **Operational Risk**: Implementation challenges, dependencies
4. **Strategic Risk**: Market changes, competitive dynamics
5. **Personal Risk**: Lifestyle impacts, stress, commitment

#### Risk Scoring
Each risk is scored on:
- **Likelihood**: Low (1-3), Medium (4-6), High (7-10)
- **Impact**: Low (1-3), Medium (4-6), High (7-10)
- **Risk Score**: Likelihood × Impact

#### Risk Mitigation
AI suggests mitigation strategies for high-risk areas:
- Preventive actions to reduce likelihood
- Contingency plans to reduce impact
- Monitoring indicators for early warning

### Confidence Scoring

AI recommendations include confidence scores (0-100%) based on:

1. **Data Completeness** (30%):
   - Are all criteria fully defined?
   - Do all options have complete information?
   - Are scores well-distributed?

2. **Score Differentiation** (25%):
   - How clearly does one option lead?
   - Is there a close second?
   - Are scores clustered or spread?

3. **Constraint Satisfaction** (20%):
   - Do options violate constraints?
   - Are there trade-offs vs. constraints?

4. **Risk Profile** (15%):
   - What's the risk level of top options?
   - Are high risks adequately mitigated?

5. **Context Clarity** (10%):
   - Is the decision context well-defined?
   - Are there unstated factors?

**Confidence Interpretation:**
- 90-100%: Very high confidence, clear winner
- 75-89%: High confidence, recommend with caveats
- 60-74%: Moderate confidence, close decision
- 40-59%: Low confidence, more information needed
- 0-39%: Very low confidence, reconsider framework

## 🔒 Security

### Security Best Practices

#### Authentication Security
- **Password Requirements**: Minimum 8 characters, complexity rules
- **Session Management**: Secure token storage, automatic expiration
- **Multi-Factor Authentication**: Optional 2FA for enhanced security
- **Account Recovery**: Secure password reset flow

#### Data Security
- **Encryption**: AES-256 for data at rest, TLS 1.3 for data in transit
- **Access Control**: Row-Level Security policies in database
- **API Security**: JWT authentication, rate limiting
- **Input Validation**: Comprehensive validation and sanitization

#### Privacy
- **Data Minimization**: Collect only necessary information
- **User Control**: Export, delete, and modify personal data
- **Transparency**: Clear privacy policy and data usage
- **Compliance**: GDPR, CCPA compliance ready

### Security Checklist

- [ ] Use environment variables for all secrets
- [ ] Enable Row-Level Security on all tables
- [ ] Configure CORS properly for production
- [ ] Enable rate limiting on API endpoints
- [ ] Set up monitoring and alerting
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Use HTTPS in production
- [ ] Implement Content Security Policy
- [ ] Set up error logging (without exposing sensitive data)

## 🚀 Deployment

### Deployment Options

#### Vercel (Recommended)

1. **Connect Repository:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel login
   vercel
   ```

2. **Configure Environment Variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Ensure they're available for Production, Preview, and Development

3. **Deploy:**
   ```bash
   # Production deployment
   vercel --prod
   ```

#### Netlify

1. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy:**
   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli
   
   # Login and deploy
   netlify login
   netlify deploy --prod
   ```

#### Docker

1. **Create `Dockerfile`:**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run:**
   ```bash
   docker build -t klaros .
   docker run -p 80:80 klaros
   ```

### Production Considerations

#### Performance Optimization
- Enable Vite's build optimizations
- Implement code splitting
- Use lazy loading for routes
- Optimize images with CDN
- Enable caching strategies

#### Monitoring
- Set up error tracking (Sentry)
- Implement analytics (PostHog, Google Analytics)
- Monitor API performance
- Track user flows and conversions

#### Backup Strategy
- Automated database backups
- Point-in-time recovery capability
- Backup retention policy
- Regular backup testing

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Open an issue with detailed reproduction steps
2. **Suggest Features**: Share ideas for new features or improvements
3. **Improve Documentation**: Help make our docs clearer and more comprehensive
4. **Submit Pull Requests**: Fix bugs or implement features
5. **Review Code**: Help review open pull requests
6. **Spread the Word**: Share KLAROS with others who might benefit

### Development Setup

1. **Fork and Clone:**
   ```bash
git clone https://github.com/your-username/klaros.git
cd klaros
```

2. **Create a Branch:**
   ```bash
git checkout -b feature/your-feature-name
```

3. **Make Changes:**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

4. **Test Your Changes:**
   ```bash
npm run lint
npm run type-check
npm run test
```

5. **Commit and Push:**
   ```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

6. **Open Pull Request:**
   - Go to GitHub and create a PR
   - Describe your changes clearly
   - Link any related issues
   - Wait for review

### Code Style Guidelines

- **TypeScript**: Use strict type checking
- **React**: Use functional components with hooks
- **Naming**: Use descriptive, camelCase names
- **Comments**: Document complex logic
- **Commits**: Follow conventional commits format

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🐛 Troubleshooting

### Common Issues

#### Build Errors

**Issue: "Cannot find module '@/components/..."**
```bash
# Solution: Check tsconfig.json paths configuration
# Ensure baseUrl and paths are correctly set
```

**Issue: "Environment variables not loading"**
```bash
# Solution: Ensure .env.local exists and variables are prefixed with VITE_
# Restart dev server after changing environment variables
npm run dev
```

#### Authentication Issues

**Issue: "Clerk authentication not working"**
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is correct
- Check Clerk dashboard for application status
- Ensure allowed redirect URLs are configured

**Issue: "Supabase RLS blocking requests"**
- Check RLS policies are correctly configured
- Verify JWT token includes correct user ID
- Test with service role key (development only)

#### Database Issues

**Issue: "Failed to connect to Supabase"**
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
- Check Supabase project is active
- Verify network connectivity

**Issue: "Row-Level Security preventing access"**
- Review RLS policies in Supabase dashboard
- Check user authentication state
- Verify user ID matches policy filters

#### AI Analysis Issues

**Issue: "AI analysis failing"**
- Check API key is valid and has credits
- Verify model name is correct for provider
- Check API rate limits haven't been exceeded
- Review error logs for specific issues

### Getting Help

If you encounter issues:

1. **Check Documentation**: Review this README and docs folder
2. **Search Issues**: Look for similar issues on GitHub
3. **Ask Community**: Post in GitHub Discussions
4. **Contact Support**: Email support@klaros.app for help

## 🗓 Roadmap

### Current Version: v1.0

**Core Features:**
- ✅ Multi-criteria decision analysis
- ✅ AI-powered recommendations
- ✅ Visual comparisons and charts
- ✅ User authentication
- ✅ Decision history

### v1.1 (Q2 2024)

**Planned Features:**
- [ ] Team collaboration and shared decisions
- [ ] Decision templates library
- [ ] Advanced export options (PDF, PowerPoint)
- [ ] Mobile-responsive improvements
- [ ] Dark mode theme

### v1.2 (Q3 2024)

**Planned Features:**
- [ ] Integration with popular tools (Notion, Slack)
- [ ] Advanced analytics and insights
- [ ] Decision outcome tracking and learning
- [ ] Custom AI model fine-tuning
- [ ] API for third-party integrations

### v2.0 (Q4 2024)

**Planned Features:**
- [ ] Native mobile apps (iOS, Android)
- [ ] Real-time collaborative editing
- [ ] Advanced decision tree visualization
- [ ] Machine learning for personalized suggestions
- [ ] Enterprise features (SSO, audit logs)

### Future Considerations

- Multi-language support
- Offline mode capability
- Voice input for decision creation
- Integration with calendar and task management
- Advanced statistical analysis tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ Liability and warranty limitations apply

## 🙏 Acknowledgments

KLAROS wouldn't be possible without these amazing projects and communities:

### Core Technologies
- **[React](https://reactjs.org/)**: For the powerful UI framework
- **[TypeScript](https://www.typescriptlang.org/)**: For type safety and developer experience
- **[Vite](https://vitejs.dev/)**: For blazing-fast development experience
- **[Tailwind CSS](https://tailwindcss.com/)**: For utility-first styling

### Infrastructure & Services
- **[Supabase](https://supabase.com/)**: For backend-as-a-service platform
- **[Clerk](https://clerk.com/)**: For seamless authentication solutions
- **[Vercel](https://vercel.com/)**: For reliable deployment and hosting

### UI Components
- **[Shadcn/ui](https://ui.shadcn.com/)**: For beautiful, accessible UI components
- **[Radix UI](https://www.radix-ui.com/)**: For unstyled, accessible primitives
- **[Recharts](https://recharts.org/)**: For composable charting components

### AI Providers
- **[OpenAI](https://openai.com/)**: For GPT models
- **[Groq](https://groq.com/)**: For ultra-fast inference
- **[OpenRouter](https://openrouter.ai/)**: For multi-model access

### Community
- All contributors who have helped improve KLAROS
- The open-source community for inspiration and support
- Early adopters and beta testers for valuable feedback

## 📞 Support & Contact

### Get Help

**Documentation**
- Main Documentation: [docs.klaros.app](https://docs.klaros.app)
- API Reference: [docs.klaros.app/api](https://docs.klaros.app/api)
- Guides & Tutorials: [docs.klaros.app/guides](https://docs.klaros.app/guides)

**Community**
- GitHub Issues: [Report bugs or request features](https://github.com/yourusername/klaros/issues)
- GitHub Discussions: [Ask questions and discuss ideas](https://github.com/yourusername/klaros/discussions)
- Discord: [Join our community](https://discord.gg/klaros) (coming soon)

**Direct Support**
- Email: support@klaros.app
- Twitter: [@klaros_app](https://twitter.com/klaros_app)
- LinkedIn: [KLAROS](https://linkedin.com/company/klaros)

### Feedback

We value your feedback! Help us improve KLAROS:

- **Feature Requests**: Share ideas in GitHub Discussions
- **Bug Reports**: Open detailed issues on GitHub
- **User Feedback**: Email feedback@klaros.app
- **Reviews**: Rate us and leave a review

### Business Inquiries

For partnership, enterprise, or media inquiries:
- Email: business@klaros.app

---

<div align="center">

**Built with ❤️ for better decision-making**

[Website](https://klaros.app) • [Documentation](https://docs.klaros.app) • [GitHub](https://github.com/yourusername/klaros) • [Twitter](https://twitter.com/klaros_app)

⭐ **Star us on GitHub** if KLAROS helps you make better decisions!

</div>
"""
Path("README.new.md").write_text(content, encoding="utf-8")
