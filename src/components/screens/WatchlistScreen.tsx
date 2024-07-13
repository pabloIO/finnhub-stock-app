import { useAppContext } from "@context/app-context";
import WatchlistCards from "@components/ui/WatchlistCards";
import Loader from "@components/ui/Loader";

function WatchlistScreen(){

    const { watchlist, isReady } = useAppContext();

    if (!watchlist || !isReady){
        return <Loader/>;
    }
    
    return (
        <WatchlistCards watchlist={watchlist}/>
    );
}

export default WatchlistScreen;