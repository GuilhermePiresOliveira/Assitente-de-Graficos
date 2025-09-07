import React, { useState } from 'react';

interface ApiKeySetupProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in">
          <div className="flex items-start mb-6">
            <div className="flex-shrink-0">
              <i className="fa-solid fa-key text-cyan-400 text-2xl mr-4 mt-1"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Configuração da Chave de API</h3>
              <p className="text-slate-400">
                Para usar o assistente de IA, por favor, insira sua chave de API do Google.
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="api-key-input" className="block text-sm font-medium text-slate-300 mb-2">
                Sua Chave de API do Google AI
              </label>
              <input
                id="api-key-input"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 placeholder-slate-500"
                placeholder="Cole sua chave de API aqui"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
            >
              <i className="fa-solid fa-check mr-2"></i>
              Salvar e Continuar
            </button>
          </form>

          <div className="mt-8 text-sm text-slate-500 border-t border-slate-700 pt-6">
            <h4 className="font-semibold text-slate-400 mb-2">Para configuração permanente (em deploy):</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Obtenha sua chave no <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-cyan-400 transition-colors">Google AI Studio</a>.
              </li>
              <li>
                Na plataforma de hospedagem (Vercel, Netlify, etc.), adicione uma <strong>Variável de Ambiente</strong> com o nome <code className="bg-slate-700 px-1.5 py-0.5 rounded-md font-mono text-xs">API_KEY</code>.
              </li>
               <li>
                Faça o deploy novamente para aplicar a variável.
              </li>
            </ol>
             <p className="mt-4 text-xs">
                Sua chave é secreta. O uso de variáveis de ambiente é a maneira mais segura de gerenciá-la em produção.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;
