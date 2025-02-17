import { combineEpics, ofType } from "redux-observable";
import { filter, map } from "rxjs/operators";
import { toggleActiveStock } from "@/store/stocksSlice";
import { fetchPriceHistory } from "@/store/priceHistorySlice";
import type { Action } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { Epic, StateObservable } from "redux-observable";
import type { Observable } from "rxjs";

const fetchPriceHistoryEpic: Epic = (
	action$: Observable<Action>,
	state$: StateObservable<RootState>,
) =>
	action$.pipe(
		ofType(toggleActiveStock.type),
		filter(() => !!state$.value.stocks.activeStockId),
		map(() => fetchPriceHistory(state$.value.stocks.activeStockId as string)),
	);

export const rootEpic = combineEpics(
	fetchPriceHistoryEpic
);

export default rootEpic;
