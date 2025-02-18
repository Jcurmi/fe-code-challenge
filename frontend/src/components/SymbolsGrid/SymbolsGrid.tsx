import "./SymbolsGrid.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import SymbolCard from "../SymbolCard";
import { fetchAllStocks, selectors } from "@/store/stocksSlice";

const SymbolsGrid = () => {
	const dispatch = useAppDispatch();
	const tokens = useAppSelector((state) => state.prices);
	const stockSymbols = useAppSelector(selectors.selectStockIds);

	useEffect(() => {
		dispatch(fetchAllStocks());
	}, [dispatch]);

	return (
		<div className="symbolsGrid">
			{stockSymbols.map((id) => (
				<SymbolCard token={tokens[id]} key={id} id={id} />
			))}
		</div>
	);
};

export default SymbolsGrid;
