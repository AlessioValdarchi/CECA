import { Link } from "react-router-dom";
import { ExchangeSelect } from "../Features/ExchangeSelect";
import walletImage from "../assets/coinsPage/navbar/wallet.svg";
import coinImage from "../assets/coinsPage/navbar/coin.svg";
import settingImage from "../assets/coinsPage/navbar/setting.svg";
import news from '../assets/news-4301.png'
import logo from '../assets/favicon/LOGO.ico'
export function Navbar() {

  return (
    <div className="w-full h-16 rounded-tl-xl rounded-tr-xl bg-ceca-color-labels text-ceca-color-dark-grey fixed bottom-0 z-30">
      <nav className=" h-full w-full flex justify-around text-center pt-2">
        <div className="flex flex-col justify-center items-center gap-1 w-1/3">
          <Link to="/home/wallet">
            <img src={walletImage} alt="wallet" className="w-7 h-7" />
          </Link>
          <p className="w-full border-b border-b-gray-300 font-semibold flex items-center justify-center opacity-60 ">
            <Link to="/home/wallet">Wallet</Link>
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-1 w-1/3">
          <Link to="/home/coins">
            <img src={coinImage} alt="coin" className="w-7 h-7 " />
          </Link>
          <p className="w-full border-b border-b-gray-300 font-semibold flex items-center justify-center text-blue-600 opacity-60">
            <Link to="/home/coins">Coins</Link>
          </p>
        </div>
        <Link to="/home/ceca"><img className="w-16 relative bg-ceca-color-login-background rounded-full " src={logo}></img></Link>
        <div className="flex flex-col justify-center items-center gap-1 w-1/3 font-semibold text-blue-600 opacity-60">
          <Link to="/home/articles">
            <img src={news} alt="coin" className="w-7 h-7 " />
          </Link>
          <p className="w-full border-b border-b-gray-300 font-semibold flex items-center justify-center text-blue-600 opacity-60">
            <Link to="/home/articles">Articles</Link>
          </p>
          {/* <ExchangeSelect /> */}
        </div>
        <div className="flex flex-col justify-center items-center gap-1 w-1/3 font-semibold text-blue-600 opacity-60">
          <Link to="/home/profile">
            <img src={settingImage} alt="coin" className="w-7 h-7 " />
          </Link>
          <p className="w-full border-b border-b-gray-300 font-semibold flex items-center justify-center text-blue-600 opacity-60">
            <Link to="/home/profile">Settings</Link>
          </p>
          {/* <ExchangeSelect /> */}
        </div>

      </nav>
    </div>
  );
}
