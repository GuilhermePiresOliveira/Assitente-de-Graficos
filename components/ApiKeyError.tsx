import React from 'react';

const ApiKeyError: React.FC = () => {
  return (
    <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-200 rounded-2xl p-6 md:p-8 animate-fade-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <i className="fa-solid fa-key text-yellow-400 text-2xl mr-4 mt-1"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Configuração Necessária: Chave de API</h3>
          <p className="mb-4 text-yellow-300">
            Para que o assistente de IA funcione, ele precisa se conectar aos serviços do Google. Para isso, é necessário configurar sua chave de API pessoal.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              Acesse o <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-white transition-colors">Google AI Studio</a> para obter sua chave de API.
            </li>
            <li>
              Na plataforma onde você está hospedando este projeto (Vercel, Netlify, etc.), vá para as configurações e adicione uma <strong>Variável de Ambiente</strong>.
            </li>
            <li>
              Defina o nome da variável como <code className="bg-slate-900/80 px-2 py-1 rounded-md font-mono text-xs">API_KEY</code> e cole sua chave no campo de valor.
            </li>
            <li>
              Faça o deploy novamente do seu projeto para que a nova variável seja aplicada.
            </li>
          </ol>
          <p className="mt-4 text-xs text-yellow-400/80">
            Sua chave de API é secreta e nunca deve ser exposta no código-fonte. O uso de variáveis de ambiente é a maneira segura de gerenciá-la.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyError;