import { ReactComponent as CompanyIcon } from "@/assets/company.svg";
import { ReactComponent as IndustryICon } from "@/assets/industry.svg";
import { ReactComponent as MarketCap } from "@/assets/market_cap.svg";
import ListItem from "@/components/ListItem";
import { convertNumberToString } from "@/helpers/currencyHelpers";
import type { Stock } from "@/store/stocksSlice";

interface iProps {
	stock: Stock;
}

const SymbolCardInfo = ({ stock }: iProps) => {
	const { companyName, industry, marketCap } = stock;
	return (
		<>
			<ListItem Icon={<CompanyIcon />} label={companyName} />
			<ListItem Icon={<IndustryICon />} label={industry} />
			<ListItem Icon={<MarketCap />} label={convertNumberToString(marketCap)} />
		</>
	);
};

export default SymbolCardInfo;
