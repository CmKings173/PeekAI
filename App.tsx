import React from 'react';
import { ExtensionController } from './components/ExtensionController';
import { DemoArticle } from './components/DemoArticle';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* 
        ExtensionController acts as the "Content Script".
        It listens to events on the document and renders the UI overlay.
        In a real extension, this component would be injected into the DOM host page.
      */}
      <ExtensionController />

      {/* Main Page Content */}
      <main className="py-8">
        <DemoArticle />
      </main>

      {/* Instructions / Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>AI Highlight Info Card Demo</p>
        <p className="mt-1">Select text to activate the AI assistant</p>
      </footer>
    </div>
  );
}

export default App;
