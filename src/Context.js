import React, {  createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CoinList } from './Config/api';
import { auth ,db} from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";


const Crypto = createContext()

const Context = ({children}) => {
    const [currency, setCurrency ] = useState("INR")
    const [symbol, setSymbol ] = useState("₹")
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null)
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if (user) {
          const coinRef = doc(db, "watchlist", user?.uid);
          var unsubscribe = onSnapshot(coinRef, (coin) => {
            if (coin.exists()) {
              console.log(coin.data().coins);
              setWatchlist(coin.data().coins);
            } else {
              console.log("No Items in Watchlist");
            }
          });
    
          return () => {
            unsubscribe();
          };
        }
      }, [user]);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",

    })

    useEffect(() => {
        onAuthStateChanged(auth, user=> {
            if(user) setUser(user);
            else setUser(null);
        })
    }, [])

    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
      }, [currency]);

      const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);
    
        setCoins(data);
        setLoading(false);
      };
    

    return (
        <div>
            <Crypto.Provider value={{ watchlist,user,setAlert,alert,fetchCoins,currency, coins, loading,setCurrency, symbol }}>
                {children}
            </Crypto.Provider>
        </div>
    )
}

export default Context

export const CryptoState = () => {
    return useContext(Crypto)
}