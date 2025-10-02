# AndesFinance  

**AndesFinance** é um gerenciador de gastos pessoal. Ele permite adicionar rendas e registrar despesas em diferentes métodos de pagamento (débito, crédito ou dinheiro). Os dados são salvos localmente usando **IndexedDB** via **Dexie DB**, garantindo que tudo funcione sem necessidade de servidor.  

## ✨ Funcionalidades  

- **Adicionar renda** e **registrar gastos** (débito, crédito ou dinheiro).  
- **Gráficos interativos**:  
  - Total gasto por categoria.  
  - Total gasto por método de pagamento.  
- **Lista detalhada** de todos os gastos e rendas.  
- **Seção de gastos pendentes no crédito**, para acompanhar faturas antes do pagamento.  
- **Área de configurações**:  
  - Criar e remover categorias personalizadas.  
  - Resetar todos os dados (rendas, gastos e faturas).  

## 🛠 Tecnologias  

- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Dexie DB](https://dexie.org/) (IndexedDB)  

## 🚀 Como rodar o projeto  

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/andesfinance.git

# Acessar a pasta
cd andesfinance

# Instalar as dependências
pnpm install

# Rodar o projeto
pnpm run dev
