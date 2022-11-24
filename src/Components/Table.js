import { CoinCardList } from "./CoinCardList";


export function Table() {
  return (
    <div className="w-full h-full">
      {/* <div className="flex bg-blue-500 justify-around text-xs font-bold p-2">
        <p className="w-6 text-center">#</p>
        <p className="w-1/5 grow text-center">CRYPTO</p>
        <p className="w-1/5 grow text-center">CHART</p>
        <p className="w-1/5 grow text-center">PRICE</p>
        <p className="w-1/5 grow text-center">INPUT</p>
      </div> */}

      <CoinCardList />
      <div className="h-20"></div>
    </div>
  );
}
