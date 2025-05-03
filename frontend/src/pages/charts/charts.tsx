import TradingViewDeck from "../../components/charts/TradingViewDeck";
import withAuth from "../../utils/withAuth";

function ChartsPage() {
  return <TradingViewDeck />;
}

export default withAuth(ChartsPage);


