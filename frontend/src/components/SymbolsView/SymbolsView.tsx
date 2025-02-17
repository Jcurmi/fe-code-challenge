import "./symbolsView.css";
import SymbolsGrid from "@/components/SymbolsGrid";
import PriceChart from "@/components/PriceChart";
import DesktopInfo from "./src/DesktopInfo";

const SymbolsView = () => {
	return (
		<div className="symbolsView">
			<DesktopInfo />
			<div className="symbolsView__chart">
				<h3>PRICE HISTORY</h3>
			</div>
			<div className="symbolsView__content">
				<PriceChart />
				<SymbolsGrid />
			</div>
		</div>
	);
};

export default SymbolsView;
