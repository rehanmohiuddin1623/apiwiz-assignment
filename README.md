# JSON Buddy

A visual JSON explorer that transforms JSON data into an interactive node-based graph visualization.

## ✨ Features

- **JSON Visualization**: Convert any JSON object into an interactive node graph
- **Search & Highlight**: Search for JSON keys and instantly highlight their corresponding nodes
- **Interactive Graph**: Pan, zoom, and explore your JSON structure with ReactFlow
- **Type-Aware Styling**: Automatic color coding for different data types (objects, arrays, primitives)
- **Real-time Validation**: Built-in JSON parsing with error handling

## 📁 File Structure

```
src/
├── pages/
│   └── home/              # Main application page
├── components/
│   └── base/              # Reusable UI components (Button, TextBox)
├── hooks/
│   └── useGenerateJSON.ts # Core JSON-to-graph conversion logic
├── utils/
│   └── search-cache/      # Caching layer for search optimization
└── App.tsx                # Root component
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **ReactFlow** - Graph visualization
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

## 🔧 How It Works

### Step 1: Input JSON
Paste your JSON data into the text area

### Step 2: Generate Graph
Click "Generate JSON" button to transform the JSON into a node graph:
- Each key/value becomes a node
- Parent-child relationships become edges
- Nodes positioned hierarchically with smart spacing

### Step 3: Search & Highlight
Type a JSON path (e.g., `$.user.name`) to:
- Search the cache for matching nodes
- Highlight found nodes with golden styling
- Display real-time search feedback

## 💡 Algorithm Overview

1. **Parse JSON**: Validate and parse input JSON string
2. **Traverse Tree**: Recursively walk through JSON structure
3. **Generate Nodes**: Create nodes for each key/value with unique IDs
4. **Calculate Layout**: Position nodes hierarchically with even spacing
5. **Build Cache**: Map JSON paths to node IDs for fast search
6. **Create Edges**: Link parent-child nodes based on hierarchy
7. **Render**: Display interactive graph with ReactFlow

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) and start exploring!
