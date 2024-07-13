import { createContext, useState, useEffect, useRef, useContext } from 'react';
import type { ReactNode } from 'react';
import { initialWatchlist, symbolsToSubscribe } from '@data/watchlist';
import type { Stocks } from '@models/watchlist';
import * as Notifications from 'expo-notifications';

type AppProviderProps = {
    children: ReactNode;
};

type AppContextValue = {
    isReady: boolean;
    watchlist: Stocks;
    receiveNotifications: boolean;
    addPriceAlert: (trade: string, targetPrice: number) => void;
    removePriceAlert: (trade: string, targetPrice: number) => void;
    handleReceiveNotifications: () => void;
};


export function useAppContext() {
    const ctx = useContext(AppContext);

    if (ctx === null){
        throw new Error('TimersContext is null -- that should not happen');
    }
    
    return ctx;
}

export const AppContext = createContext<AppContextValue | null>(null);

const FINNHUB_WSS_URL = 'wss://ws.finnhub.io';
const FINNHUB_WSS_API_KEY = 'cq84o09r01qr5j08ml4gcq84o09r01qr5j08ml50';

export const AppProvider = ({ children }: AppProviderProps) => {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [receiveNotifications, setReceiveNotifications] = useState<boolean>(false);
    const [watchlist, setWatchlist] = useState<Stocks>(initialWatchlist);
    const maxChartDataLength: number = 99;

    const ws = useRef<WebSocket | null>(null);
    const wsUrl = 
        `${FINNHUB_WSS_URL}?token=${FINNHUB_WSS_API_KEY}`;

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

    useEffect(() => {
        if(receiveNotifications){
           requestNotificationPermissionsasync();
        }
    }, [receiveNotifications])

    async function requestNotificationPermissionsasync (){
        await Notifications.requestPermissionsAsync();
    }

    function scheduleNotification(title: string, body: string){
        const schedulingOptions = {
          content: {
            title: title,
            body: body,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            color: 'blue',
          },
          trigger: {
            seconds: 3,
          },
        };
        Notifications.scheduleNotificationAsync(schedulingOptions);
    }

    function sendAlertPriceNotification(symbol: string, price: number){
        const tradeSymbol = watchlist[symbol];
        // check receiveNotifications setting is true and exist an array 
        // of alerts
        if (tradeSymbol.alerts !== undefined && receiveNotifications){
            tradeSymbol.alerts.map((alert) => {
                // check if new price its greater than alert target price
                // and send push notification
                if( price >= alert.targetPrice ){
                    scheduleNotification(
                        `${symbol} Price Alert`,
                        `${symbol} has reached your ${alert.targetPrice} price target`
                    );
                }
            });
        }
    }

    function addPriceAlert(trade: string, targetPrice: number){
        setWatchlist((prevWatchlist) => {
            let newTrades = { ...prevWatchlist };
            if (newTrades[trade].alerts){
                newTrades[trade].alerts = [...newTrades[trade].alerts, {targetPrice: targetPrice}];
            } else {
                newTrades[trade].alerts = [{targetPrice: targetPrice}];
            }
            return newTrades;
        });
    }

    function removePriceAlert(trade: string, targetPrice: number){
        setWatchlist((prevWatchlist) => {
            let newTrades = { ...prevWatchlist };
            if (newTrades[trade].alerts){
                const filteredAlerts = newTrades[trade].alerts.filter((priceAlert) => priceAlert.targetPrice !== targetPrice);
                newTrades[trade].alerts = filteredAlerts;
            } else {
                newTrades[trade].alerts = [{targetPrice: targetPrice}];
            }
            return newTrades;
        });
    }

    function handleReceiveNotifications(){
        setReceiveNotifications(!receiveNotifications);
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
                        // optimize size of chartData array with slice, the array must not
                        // exceed 100 elements
                        if (newTrades[s].chartData.length > maxChartDataLength){
                            // alternate number of slices to execute useEffect hook in chart component
                            newTrades[s].chartData = [...newTrades[s].chartData.slice(Math.random() > 0.5 ? 1 : 2), {value: p}];
                        } else {
                            newTrades[s].chartData = [...newTrades[s].chartData, {value: p}];
                        }
                    }
                    // check if the new price at a symbol meets the price target set by the user
                    // and send local notification
                    sendAlertPriceNotification(s,p);
                });
                return newTrades;
            });
        }
    }

    const ret = {
        isReady: isReady, 
        watchlist: watchlist, 
        addPriceAlert: addPriceAlert,
        removePriceAlert: removePriceAlert,
        receiveNotifications: receiveNotifications,
        handleReceiveNotifications: handleReceiveNotifications
    };

  return (
    <AppContext.Provider value={ret}>
      {children}
    </AppContext.Provider>
  )
}