
# Copilot Instructions for Claudia

## 🏗️ Architecture Overview

**Claudia** is a desktop GUI application for managing Claude Code sessions and AI agents, built with:
- **Frontend**: React 18 + TypeScript + Vite 6 (Tailwind CSS v4, shadcn/ui, Framer Motion)
- **Backend**: Rust + Tauri 2 (SQLite database, cross-platform desktop app)
- **Package Manager**: Bun (fast JavaScript runtime and package manager)

## 📦 Core Directory Structure

```
claudia/
├── src/                     # React frontend
│   ├── components/          # UI components (50+ files)
│   │   ├── ui/             # shadcn/ui base components
│   │   ├── CCAgents.tsx    # Agent management hub
│   │   ├── ClaudeCodeSession.tsx  # Interactive Claude sessions
│   │   └── ProjectList.tsx # Claude project browser
│   ├── lib/
│   │   ├── api.ts          # Tauri backend API client (2,000+ lines)
│   │   └── i18n.ts         # Internationalization (en/zh-tw)
│   └── types/hooks.ts      # Hook configuration types
├── src-tauri/              # Rust backend
│   ├── src/
│   │   ├── commands/       # Tauri command handlers
│   │   │   ├── agents.rs   # Agent execution & management
│   │   │   ├── claude.rs   # Claude Code integration
│   │   │   ├── mcp.rs      # Model Context Protocol servers
│   │   │   └── usage.rs    # Usage analytics & costs
│   │   ├── checkpoint/     # Session timeline & versioning
│   │   └── process/        # Background process management
└── cc_agents/              # Pre-built agent library
```

## 🔄 Development Workflow

### Essential Commands
```bash
# Install dependencies
bun install

# Development (includes executable building)
bun run tauri dev          # Starts both frontend and Tauri backend

# Production build
bun run tauri build        # Creates platform-specific installers

# Build Claude Code executables (auto-runs in predev/prebuild)
bun run build:executables:current
```

### Key Build Dependencies
- **Claude Code CLI**: Must be installed and available in PATH
- **Rust**: Required for Tauri backend compilation
- **Platform-specific**: WebView2 (Windows), webkit2gtk (Linux), Xcode tools (macOS)

## 🧩 Architecture Patterns

### Frontend-Backend Communication (Tauri Pattern)
```typescript
// Frontend API calls through Tauri invoke
const agents = await api.listAgents();  // Calls Rust backend
const result = await invoke<Agent[]>("list_agents");  // Direct Tauri call

// Real-time process monitoring via events
window.addEventListener('claude-session-selected', handleSessionSelected);
```

### State Management
- **No Redux/Zustand**: Uses React useState + component composition
- **File I/O**: All handled by Rust backend via Tauri commands
- **Process Registry**: Rust manages background Claude Code/Agent processes

### Database Pattern (SQLite via Rust)
```rust
// All data persistence in Rust backend
pub struct AgentDb(pub Mutex<Connection>);

// Agent CRUD operations
#[tauri::command]
pub async fn create_agent(name: String, ...) -> Result<Agent, String>
```

## 🎯 Core Features & Data Flow

### 1. CC Agents System
- **Create/Import**: Agents with custom system prompts, models (Opus/Sonnet/Haiku)
- **Execute**: Spawn background Claude Code processes in project directories
- **Monitor**: Real-time JSONL output parsing for tokens/costs
- **GitHub Integration**: Import pre-built agents from `cc_agents/` repository

### 2. Claude Code Integration
- **Project Discovery**: Scans `~/.claude/projects/` directory
- **Session Management**: Resume existing sessions, create new ones
- **Streaming Output**: Real-time Claude Code execution with cancellation
- **File Management**: Edit CLAUDE.md files, browse project files

### 3. Process Management
```rust
// Background process tracking
pub struct ProcessRegistryState(Arc<Mutex<HashMap<u32, ProcessInfo>>>);

// Agent runs tracked with metrics
pub struct AgentRun {
    session_id: String,    // UUID from Claude Code
    status: String,        // 'running', 'completed', 'failed'
    pid: Option<u32>,      // System process ID
}
```

## 📝 Project-Specific Conventions

### File Organization
- **Single-Purpose Components**: Each component handles one primary feature
- **API Layer**: All backend calls centralized in `src/lib/api.ts`
- **Type Safety**: Shared types between frontend/backend via Serde serialization

### Naming Patterns
- **Components**: PascalCase (e.g., `CCAgents`, `ClaudeCodeSession`)
- **Files**: kebab-case for assets, PascalCase for components
- **API Methods**: camelCase with async/await (e.g., `listAgents()`, `executeAgent()`)
- **Rust Commands**: snake_case (e.g., `list_agents`, `execute_agent`)

### Error Handling Strategy
```typescript
// Frontend: Try-catch with user-friendly messages
try {
  const result = await api.executeAgent(agentId, projectPath, task);
} catch (error) {
  setToast({ message: `Failed to execute: ${error.message}`, type: "error" });
}
```

```rust
// Backend: Result<T, String> for Tauri commands
#[tauri::command]
pub async fn execute_agent(...) -> Result<i64, String> {
    // Return run ID or error message
}
```

## 🔧 Critical Integration Points

### Claude Code Binary Management
- **Auto-Detection**: Searches system PATH, nvm, homebrew installations
- **Bundled Executables**: Downloads specific versions via `scripts/fetch-and-build.js`
- **Cross-Platform**: Handles WSL, Docker, native installations differently

### Model Context Protocol (MCP)
- **Server Management**: Add/remove MCP servers via UI
- **Configuration Scopes**: User, project, and local `.mcp.json` files
- **Claude Desktop Import**: Reads existing Claude Desktop server configs

### Usage Analytics
```typescript
// Real-time cost tracking from JSONL parsing
interface UsageEntry {
  model: string;
  input_tokens: number;
  output_tokens: number;
  cost: number;  // Calculated from token counts
}
```

## 🚨 Known Issues & Workarounds

1. **Bun Build Performance**: Pre-build step fetches executables; can be slow on first run
2. **Process Cleanup**: Background processes may persist; use cleanup commands
3. **Platform Differences**: WSL vs native Windows Claude Code handling differs
4. **Memory Usage**: Large JSONL files can impact performance; consider pagination

## 🧪 Testing Approach
- **Manual Testing**: Primary testing method via Tauri dev mode
- **Agent Testing**: Execute agents on sample projects to validate functionality
- **Cross-Platform**: Test on Windows, macOS, Linux for Tauri compatibility

## 🌐 Internationalization
- **i18next**: English (en) and Traditional Chinese (zh-tw)
- **Dynamic Loading**: Language switching without reload
- **Component Keys**: Use namespaced translation keys in components
