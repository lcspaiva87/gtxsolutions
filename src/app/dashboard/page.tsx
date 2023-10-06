import { Icons } from "@/components/icons";

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-around p-5">
        <h1 className="text-xl"> Registro Ocorrência</h1>
        <div className="flex gap-6">
          <button className="flex text-gray-300 items-center gap-2 border border-gray-300 p-2 rounded-lg hover:text-gray-400/25 hover:border-gray-400"> Filtro</button>
          <button className="flex text-gray-300 items-center gap-2 border border-gray-300 p-2 rounded-lg hover:text-gray-400/25 hover:border-gray-400">
            <Icons.Plus className="w-5 text-gray-400/70" />
            Nova Ocorrência
          </button>
        </div>
      </div>
    </div>
  );
}
