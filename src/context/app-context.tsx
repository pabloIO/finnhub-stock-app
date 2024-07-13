import { createContext, useState, useEffect, useRef, useContext } from "react";
import type { ReactNode } from "react";
import { initialWatchlist, symbolsToSubscribe } from "@data/watchlist";
import type { Stocks } from "@models/watchlist";

type AppProviderProps = {
    children: ReactNode;
};

type AppContextValue = {
    isReady: boolean;
    send: any;
    watchlist: Stocks;
    addPriceAlert: (trade: string, targetPrice: number) => void;
};


export function useAppContext() {
    const timersCtx = useContext(AppContext);

    if (timersCtx === null){
        throw new Error('TimersContext is null -- that should not happen');
    }
    
    return timersCtx;
}

export const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ 
    children 
}: AppProviderProps) => {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [watchlist, setWatchlist] = useState<Stocks>(initialWatchlist);

    const ws = useRef<WebSocket | null>(null);
    const wsUrl = 
        `${process.env.EXPO_PUBLIC_FINNHUB_WSS_URL}?token=${process.env.EXPO_PUBLIC_FINNHUB_API_KEY}`;
    
    useEffect(() => {
        const socket = new WebSocket(wsUrl);

        socket.onopen = () => {
            symbolsToSubscribe.map((symbol) => 
                socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}))
            );
            setIsReady(true)
        }
        socket.onclose = () => {
            setIsReady(false)
        }
        socket.onmessage = (event) => { 
            handleTradeChange(event);
        }

        ws.current = socket;

        return () => {
            socket.close();
        }
    }, []);

    function addPriceAlert(trade: string, targetPrice: number){
        setWatchlist((prevWatchlist) => {
            let newTrades = { ...prevWatchlist };
            if (newTrades[trade].alerts){
                newTrades[trade].alerts?.push({targetPrice: targetPrice});
            } else {
                newTrades[trade].alerts = [{targetPrice: targetPrice}];
            }
            return newTrades;
        });
    }

    function handleTradeChange(event: MessageEvent){
        const message = JSON.parse(event.data);
        if (message.type === 'trade'){
            setWatchlist((prevWatchlist) => {
                let newTrades = { ...prevWatchlist };
                message.data.forEach((trade: {s: string; p: number;}) => {
                    const { s, p } = trade;
                    if (!newTrades[s]) {
                        newTrades[s] = { price: p, previousClose: p, chartData: [{value: p}] };
                    } else {
                        newTrades[s].price = p;
                        newTrades[s].chartData.push({value: p});
                    }
                });
                return newTrades;
            });
        }
    }

    const ret = {
        isReady: isReady, 
        watchlist: watchlist, 
        send: ws.current?.send.bind(ws.current),
        addPriceAlert: addPriceAlert
    };

  return (
    <AppContext.Provider value={ret}>
      {children}
    </AppContext.Provider>
  )
}