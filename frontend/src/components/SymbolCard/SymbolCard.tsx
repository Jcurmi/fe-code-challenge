import "./symbolCard.css";

import { useSymbolCard } from "./hooks/useSymbolCard";

import { useAppSelector } from "@/hooks/redux";

import { selectShowCardInfo } from "@/store/dashboardOptionsSlice";
import SymbolCardInfo from "./src/SymbolCardInfo";
import { useRef } from "react";
import SymbolCardHeader from "./src/SymbolCardHeader";
import SymbolCardPrice from "./src/SymbolCardPrice";

type SymbolCardProps = {
	id: string;
	token: {
		price: number;
		shake: boolean;
		trend: "UP" | "DOWN" | null;
	};
};

const SymbolCard = ({ id, token }: SymbolCardProps) => {
	const {
		stock,
		trendColor,
		formattedPrice,
		cardClassName,
		handleSymbolClick,
	} = useSymbolCard(id, token);

	const showCardInfo = useAppSelector(selectShowCardInfo);

	return (
		<div onClick={handleSymbolClick} className={cardClassName}>
			<SymbolCardHeader id={id} trendColor={trendColor} trend={stock?.trend} />
			<SymbolCardPrice formattedPrice={formattedPrice} />
			{showCardInfo && <SymbolCardInfo stock={stock} />}
		</div>
	);
};

export default SymbolCard;
