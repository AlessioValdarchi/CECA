import { ExchangeSelect } from "../Features/ExchangeSelect";
import { Navbar } from "./Navbar";
import { Table } from "./Table";

export function Coins() {
  return (
    <div className="mt-3 mb-7 w-10/12 h-full flex flex-col justify-around items-center gap-3 m-auto">
      <ExchangeSelect />
      <Table  />
      {/* <div className="w-full h-16 fixed z-10 inset-x-0 bottom-0 flex justify-center items-center">
        <Navbar />
      </div> */}
    </div>
  );
}
