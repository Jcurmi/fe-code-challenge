import "./symbolCard.css";

import { useSymbolCard } from "./hooks/useSymbolCard";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleActiveStock } from "@/store/stocksSlice";
import { selectShowCardInfo } from "@/store/dashboardOptionsSlice";
import SymbolCardInfo from "./src/SymbolCardInfo";

type SymbolCardProps = {
	id: string;
	price: {
		price: number;
		alert: boolean;
		trend: "UP" | "DOWN" | null;
	};
};

const SymbolCard = ({ id, price }: SymbolCardProps) => {
	const dispatch = useAppDispatch();
	const symbolId = useAppSelector((state) => state.stocks.activeStockId);
	const showCardInfo = useAppSelector(selectShowCardInfo);
	const { stock, trendColor, formattedPrice, cardClassName } = useSymbolCard(
		id,
		symbolId,
		price,
	);

	const handleSymbolClick = (symbolId: string | null) => {
		dispatch(toggleActiveStock(symbolId));
	};

	return (
		<div onClick={() => handleSymbolClick(id)} className={cardClassName}>
			<div className="symbolCard__header">
				<span>{id}</span>
				{stock?.trend && (
					<img src={`/src/assets/${trendColor}.png`} alt="trend" />
				)}
			</div>
			<div className="symbolCard__price">
				<span>Price:</span>
				<h3>{formattedPrice}</h3>
			</div>
			{showCardInfo && <SymbolCardInfo stock={stock} />}
		</div>
	);
};

export default SymbolCard;
