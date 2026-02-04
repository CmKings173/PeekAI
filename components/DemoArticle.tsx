import React from 'react';

export const DemoArticle: React.FC = () => {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 bg-white shadow-sm min-h-screen">
      <div className="prose prose-lg prose-slate mx-auto">
        <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-2 block">
          Demo Article
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
          The Future of <span className="text-purple-700 bg-purple-50 px-1 rounded">Generative AI</span> in Modern Web Development
        </h1>
        
        <div className="flex items-center gap-4 text-slate-500 text-sm mb-8 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            <span>Written by <strong>Alex Chen</strong></span>
          </div>
          <span>•</span>
          <span>Oct 24, 2024</span>
        </div>

        <p className="lead text-xl text-slate-600 mb-6">
          As we move deeper into the era of artificial intelligence, tools like 
          <strong> Large Language Models (LLMs)</strong> are reshaping how we interact with information.
          From <span className="underline decoration-purple-300 decoration-2 underline-offset-2">Google Gemini</span> to 
          OpenAI's <span className="underline decoration-purple-300 decoration-2 underline-offset-2">GPT-4</span>, 
          the landscape is evolving rapidly.
        </p>

        <p className="mb-6">
          The concept of <strong>RAG (Retrieval-Augmented Generation)</strong> has become a cornerstone for 
          building accurate AI applications. Unlike standard models that hallucinate facts, RAG allows 
          systems to fetch real-time data from a vector database before generating a response.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">The Rise of Neural Interfaces</h2>
        
        <p className="mb-6">
          Imagine reading a complex paper on <strong>Quantum Computing</strong>. You encounter terms like 
          <em>"Superposition"</em> or <em>"Entanglement"</em>. In the past, you'd open a new tab to search Wikipedia.
          Today, browser extensions powered by semantic search can bring that knowledge directly to your cursor.
        </p>

        <p className="mb-6">
          Companies like <strong>Neuralink</strong> are even exploring direct brain-computer interfaces, 
          but for now, software aids are our best bridge to enhanced cognition.
        </p>

        <blockquote className="pl-6 border-l-4 border-purple-500 italic text-slate-700 my-8 bg-slate-50 py-4 pr-4 rounded-r-lg">
          "The goal is not to replace human thought, but to augment it with infinite context and 
          instantaneous recall." — <strong>Dr. Elena Vance</strong>, AI Researcher.
        </blockquote>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Key Technologies to Watch</h3>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-700">
          <li><strong>WebAssembly (Wasm)</strong>: Enabling high-performance code in browsers.</li>
          <li><strong>Edge Computing</strong>: Processing data closer to the user to reduce latency.</li>
          <li><strong>Multi-modal Models</strong>: AIs that understand text, image, and video simultaneously.</li>
        </ul>

        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 mb-8">
          <h4 className="font-bold text-blue-900 mb-2">Try it out!</h4>
          <p className="text-blue-800">
            Highlight any text in this article (like "Quantum Computing", "Google Gemini", or "WebAssembly") 
            to see the AI Highlight Card in action. An icon will appear—click it to learn more.
          </p>
        </div>
      </div>
    </article>
  );
};
