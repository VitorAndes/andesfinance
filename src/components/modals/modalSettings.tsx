import { useState } from "react";
import { CategoryTab } from "./categoryTab";
import { UserDataTab } from "./userDataTab";

interface tabsProps {
  tab: string;
}

const Tabs: tabsProps[] = [{ tab: "categorias" }, { tab: "controle de dados" }];

export function ModalSettings() {
  const [activeTab, setActiveTab] = useState<tabsProps>(Tabs[0]);

  return (
    <>
      <div className="-top-10 absolute left-2/12 w-2/3 rounded-lg bg-default py-8 shadow shadow-default">
        <h1 className="text-center font-semibold font-title text-secondary lg:text-lg ">
          Configurações
        </h1>
      </div>

      <nav className="mt-12 flex gap-2 border-b pb-2">
        {Tabs.map(({ tab }, i) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            type="button"
            className={`${
              activeTab === Tabs[i]
                ? "bg-primary text-secondary"
                : "border border-secondary"
            } p-3 w-38 rounded-md font-secondary font-semibold text-xs md:text-sm hover:bg-primary cursor-pointer hover:text-secondary transition-all `}
            onClick={() => setActiveTab(Tabs[i])}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="h-fit ">{activeTab === Tabs[0] && <CategoryTab />}</div>
      <div className="h-fit ">{activeTab === Tabs[1] && <UserDataTab />}</div>
    </>
  );
}
