import "./priceChart.css";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useAppSelector } from "@/hooks/redux";
import { selectors } from "@/store/priceHistorySlice";
import Loading from "@/components/Loading";
import { useMemo } from "react";

const PriceChart = () => {
	const symbolId = useAppSelector((state) => state.stocks.activeStockId);
	const apiState = useAppSelector(selectors.apiState);
	const data = useAppSelector(selectors.selectPriceHistory);
	const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

	// Memoized transformation for the chart data
	const chartData = useMemo(
		() =>
			data.map((e) => ({
				...e,
				time: new Date(e.time).toLocaleTimeString(),
			})),
		[data],
	);

	return (
		<div className="priceChart">
			{apiState.loading && symbolId !== null && <Loading />}
			{apiState.error && <span>Failed to get price history!</span>}
			{!symbolId && <span>Select stock</span>}
			{!apiState.loading && !apiState.error && symbolId && data.length > 0 ? (
				<>
					<div>{symbolInfo}</div>
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData}>
							<Line
								type="monotone"
								dataKey="price"
								stroke="#8884d8"
								dot={false}
							/>
							<XAxis dataKey="time" />
							<YAxis />
						</LineChart>
					</ResponsiveContainer>
				</>
			) : (
				!apiState.loading &&
				!apiState.error &&
				symbolId && <span>No price data available</span>
			)}
		</div>
	);
};

export default PriceChart;
