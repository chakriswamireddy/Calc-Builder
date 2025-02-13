# Calculator Builder App

## Overview
The **Calculator Builder App** is a customizable calculator creator that allows users to design their own calculator layouts, adjust the container size, drag and drop keys, and apply themes. The layout and key configurations are stored in **localStorage**, ensuring persistence across sessions. It also includes **dark mode** support for a better user experience.

## Features
- **Drag-and-Drop Builder**: Users can reposition keys using a smooth drag-and-drop interface powered by `@dnd-kit`.
- **Resizable Layout**: The calculator container can be adjusted to different sizes for better customization.
- **Dark Mode Support**: Toggle between light and dark themes for better visibility.
- **Persistent Storage**: The entire key layout and settings are saved in `localStorage`, ensuring they are retained after a refresh.
- **Customizable Keys**: Add, remove, or modify calculator keys dynamically.
- **React & Tailwind CSS**: Built with React 19 and styled using Tailwind CSS for a responsive and modern UI.
- **Keyboard Shortcuts**: Supports keyboard input for quick calculations.
- **Framer Motion Animations**: Smooth transitions and animations for an enhanced user experience.

## Technologies Used
- **React 19** (for UI development)
- **React Router DOM** (for navigation)
- **@dnd-kit** (for drag-and-drop functionality)
- **Zustand** (for state management)
- **Tailwind CSS** (for styling)
- **Framer Motion** (for animations)
- **LocalStorage API** (for data persistence)
- **React Resizable** (for adjustable container layout)
- **React Select** (for custom dropdown selections)

## Installation

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or later)
- **npm** or **yarn**

### Clone the Repository
```sh
git clone https://github.com/chakriswamireddy/Calc-Builder.git
cd calc-builder
```

### Install Dependencies
```sh
npm install
# or
yarn install
```

### Run the Development Server
```sh
npm run dev
# or
yarn dev
```

### Build for Production
```sh
npm run build
# or
yarn build
```

### Preview the Production Build
```sh
npm run preview
# or
yarn preview
```

## Usage
1. Open the app in your browser.
2. Drag and drop calculator keys to customize your layout.
3. Resize the container as needed.
4. Toggle **dark mode** for a different theme.
5. Your custom layout is automatically saved and restored on page refresh.


Example Deployment on Vercel:
```sh
npm run build
vercel deploy
```

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

