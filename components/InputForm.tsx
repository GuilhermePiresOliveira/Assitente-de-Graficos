import React from 'react';

interface InputFormProps {
  dataDescription: string;
  setDataDescription: (value: string) => void;
  objective: string;
  setObjective: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  dataDescription,
  setDataDescription,
  objective,
  setObjective,
  onSubmit,
  isLoading,
}) => {
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="data-description" className="block text-sm font-medium text-slate-300 mb-2">
            <i className="fa-solid fa-table-list mr-2 text-cyan-400"></i>
            Descreva seus dados
          </label>
          <textarea
            id="data-description"
            rows={4}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 placeholder-slate-500"
            placeholder="Ex: Tenho uma planilha com 'Mês' e 'Faturamento'."
            value={dataDescription}
            onChange={(e) => setDataDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="objective" className="block text-sm font-medium text-slate-300 mb-2">
            <i className="fa-solid fa-bullseye mr-2 text-cyan-400"></i>
            Qual é o seu objetivo?
          </label>
          <textarea
            id="objective"
            rows={4}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 placeholder-slate-500"
            placeholder="Ex: Quero mostrar como o faturamento mudou ao longo do ano."
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analisando...
            </>
          ) : (
            <>
              <i className="fa-solid fa-lightbulb mr-2"></i>
              Obter Recomendação
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
