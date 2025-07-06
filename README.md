# Electron React Boilerplate

A modern, production-ready boilerplate for building cross-platform desktop applications using Electron, React, TypeScript, and Vite.

## 🚀 Features

- **Electron 37** - Latest stable version for desktop app development
- **React 19** - Modern React with latest features and performance improvements
- **TypeScript** - Full type safety and better developer experience
- **Vite** - Lightning-fast build tool and development server
- **ESLint** - Code linting and formatting
- **Cross-platform builds** - Build for macOS, Windows, and Linux
- **Hot reload** - Instant development feedback
- **Production ready** - Optimized builds with electron-builder

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** (v1.22.22 or higher) - This project uses Yarn as the package manager
- **Git**

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd StrictPom
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

## 🏃‍♂️ Development

### Start Development Server

Run both the React development server and Electron in development mode:

```bash
yarn dev
```

This will:

- Start Vite dev server on `http://localhost:5123`
- Launch Electron app that loads the dev server
- Enable hot reload for both React and Electron

### Individual Commands

- **React dev server only**: `yarn dev:react`
- **Electron only**: `yarn dev:electron`
- **Transpile Electron**: `yarn transpile:electron`

## 🏗️ Building

### Build for Production

```bash
yarn build
```

This builds the React app and transpiles the Electron code.

### Create Distributables

Build platform-specific installers:

```bash
# macOS (ARM64)
yarn dist:mac

# Windows (x64)
yarn dist:win

# Linux (x64)
yarn dist:linux
```

The built applications will be available in the `dist` folder.

## 📁 Project Structure

```
StrictPom/
├── src/
│   ├── electron/          # Electron main process code
│   │   ├── main.ts        # Main process entry point
│   │   ├── util.ts        # Utility functions
│   │   └── tsconfig.json  # Electron TypeScript config
│   └── ui/                # React frontend code
│       ├── App.tsx        # Main React component
│       ├── App.css        # Component styles
│       ├── main.tsx       # React entry point
│       └── index.css      # Global styles
├── public/                # Static assets
│   ├── icon.icns         # macOS app icon
│   ├── icon.ico          # Windows app icon
│   └── icon.png          # Linux app icon
├── dist-electron/         # Compiled Electron code
├── dist-react/           # Built React app
├── electron-builder.json # Build configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Project dependencies and scripts
```

## ⚙️ Configuration

### Electron Builder

The `electron-builder.json` file configures how your app is packaged:

- **macOS**: Creates `.dmg` installer
- **Windows**: Creates portable and MSI installers
- **Linux**: Creates AppImage

### Vite Configuration

The `vite.config.ts` file configures the build process:

- React plugin for JSX support
- Development server on port 5123
- Output directory: `dist-react`

## 🧹 Code Quality

### Linting

```bash
yarn lint
```

The project uses ESLint with React-specific rules for code quality.

## 🚀 Deployment

### macOS

- Requires macOS for building
- Creates `.dmg` installer
- Supports ARM64 architecture

### Windows

- Can be built on any platform
- Creates both portable and MSI installers
- Supports x64 architecture

### Linux

- Can be built on any platform
- Creates AppImage
- Supports x64 architecture

## 🔧 Customization

### App Metadata

Update `electron-builder.json` to customize:

- App ID and product name
- Copyright information
- Icons for each platform

### Development Port

Change the development server port in `vite.config.ts`:

```typescript
server: {
  port: 5123, // Change this to your preferred port
  strictPort: true,
}
```

## 📝 Available Scripts

| Script                    | Description                              |
| ------------------------- | ---------------------------------------- |
| `yarn dev`                | Start development server with hot reload |
| `yarn dev:react`          | Start React dev server only              |
| `yarn dev:electron`       | Start Electron in development mode       |
| `yarn build`              | Build for production                     |
| `yarn transpile:electron` | Transpile Electron TypeScript code       |
| `yarn lint`               | Run ESLint                               |
| `yarn preview`            | Preview production build                 |
| `yarn dist:mac`           | Build macOS installer                    |
| `yarn dist:win`           | Build Windows installer                  |
| `yarn dist:linux`         | Build Linux installer                    |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `vite.config.ts`
2. **Build failures**: Ensure all dependencies are installed with `yarn install`
3. **Electron not starting**: Check that the React dev server is running on the correct port

### Getting Help

- Check the [Electron documentation](https://www.electronjs.org/docs)
- Review the [React documentation](https://react.dev)
- Open an issue in this repository

---

**Happy coding! 🎉**
# no-excuse-pomodoro
