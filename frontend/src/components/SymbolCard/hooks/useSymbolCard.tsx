import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleActiveStock } from "@/store/stocksSlice";
import { convertNumberToCurrency } from "@/helpers/currencyHelpers";

export const useSymbolCard = (
	id: string,
	token: { price: number; shake: boolean; trend: "UP" | "DOWN" | null },
) => {
	const dispatch = useAppDispatch();
	const symbolId = useAppSelector((state) => state.stocks.activeStockId);
	const stock = useAppSelector((state) => state.stocks.entities[id]);

	// Trend color
	const trendColor = stock?.trend === "UP" ? "up" : "down";

	// Shake class
	const cardShake = token?.shake
		? `symbolCard__shake ${
				token.trend === "UP"
					? "symbolCard__shake_up_trend"
					: "symbolCard__shake_down_trend"
			}`
		: "";

	// Glow class
	const cardGlow =
		token?.trend === "UP"
			? "symbolCard__higher"
			: token?.trend === "DOWN"
				? "symbolCard__lower"
				: "";

	// Format price
	const formattedPrice = useMemo(
		() => convertNumberToCurrency(token?.price) || "--",
		[token?.price],
	);

	// Card class name
	const cardClassName = useMemo(() => {
		return `symbolCard ${cardShake} ${cardGlow} ${
			symbolId !== null
				? symbolId === id
					? "symbolCard--selected"
					: "symbolCard--not-selected"
				: ""
		}`;
	}, [cardShake, cardGlow, symbolId, id]);

	// Handle symbol click
	const handleSymbolClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		dispatch(toggleActiveStock(id));
	};

	// Click outside detection
	const cardRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
				dispatch(toggleActiveStock(null));
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [dispatch]);

	return {
		stock,
		trendColor,
		formattedPrice,
		cardClassName,
		handleSymbolClick,
	};
};
