import { useAppSelector } from "@/hooks/redux";
import { convertNumberToCurrency } from "@/helpers/currencyHelpers";
import { useMemo } from "react";

export const useSymbolCard = (
	id: string,
	symbolId: string | null,
	price: { price: number; alert: boolean; trend: "UP" | "DOWN" | null },
) => {
	const stock = useAppSelector((state) => state.stocks.entities[id]);

	// Determine trend color
	const trendColor = stock?.trend === "UP" ? "up" : "down";

	// Determine cardShake class
	const cardShake =
		price?.alert && price?.trend
			? `symbolCard__shake ${
					price.trend === "UP"
						? "symbolCard__shake_up_trend"
						: "symbolCard__shake_down_trend"
				}`
			: "";

	// Determine cardGlow class
	const cardGlow =
		price?.trend === "UP"
			? "symbolCard__higher"
			: price?.trend === "DOWN"
				? "symbolCard__lower"
				: "";

	// Format price
	const formattedPrice = convertNumberToCurrency(price?.price) || "--";

	// Combine class names for the card, including active state
	const cardClassName = useMemo(() => {
		return `symbolCard ${cardShake} ${cardGlow} ${
			symbolId !== null
				? symbolId === id
					? "symbolCard--selected"
					: "symbolCard--not-selected"
				: ""
		}`;
	}, [cardShake, cardGlow, symbolId, id]);

	return {
		stock,
		trendColor,
		cardShake,
		cardGlow,
		formattedPrice,
		cardClassName,
	};
};
