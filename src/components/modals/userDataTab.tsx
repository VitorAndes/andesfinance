import { db } from "@/db/dexie";
import { useQueryAmount } from "@/hooks/useQueryAmount";
import { Button } from "../common/button";

enum Selectedata{
  income,
  expense,
  invoice,
}

export function UserDataTab() {
  const {expensesAmount,incomesAmount,invoicesAmount} =  useQueryAmount()

  async function deleteData(selectedData:Selectedata){
   switch(selectedData){
    case Selectedata.income:
      await db.incomes.clear();
      break
    case Selectedata.expense:
      await db.expenses.clear();
      break
    case Selectedata.invoice:
      await db.invoices.clear()
      break    
   }
  }

  return (
    <>
      <p className="font-title font-semibold mb-5">
				Controle de resete de dados
			</p>
      <div className="starting:-translate-y-10 flex translate-y-0 items-center justify-center rounded-md border border-secondary/80 p-4 transition-all duration-500 flex-wrap gap-5 md:justify-between">
        <div className=" flex  gap-2">
          <h1>Saldo total:</h1>
          <p className="font-secondary">R$ {incomesAmount}</p>
        </div>
       <div>
          <Button variant="danger" onClick={(() => deleteData(Selectedata.income))}>Deletar dados</Button>
        </div>
      </div>
      <div className="starting:-translate-y-10 flex translate-y-0 items-center justify-center rounded-md border border-secondary/80 p-4 transition-all duration-500 flex-wrap gap-5 md:justify-between">
        <div className=" flex  gap-2">
          <h1>Gasto mensal:</h1>
          <p className="font-secondary">R$ {expensesAmount}</p>
        </div>
       <div>
          <Button variant="danger" onClick={(() => deleteData(Selectedata.expense))}>Deletar dados</Button>
        </div>
      </div>
      <div className="starting:-translate-y-10 flex translate-y-0 items-center justify-center rounded-md border border-secondary/80 p-4 transition-all duration-500 flex-wrap gap-5 md:justify-between">
        <div className=" flex  gap-2">
          <h1 className="font-title">Fatura total:</h1>
          <p className="font-secondary">R$ {invoicesAmount}</p>
        </div>
        <div>
          <Button variant="danger" onClick={(() => deleteData(Selectedata.invoice ))}>Deletar dados</Button>
        </div>
      </div>
    </>
  );
}
