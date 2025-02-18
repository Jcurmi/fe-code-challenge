type SymbolCardHeaderProps = {
	id: string;
	trendColor: string;
	trend: "UP" | "DOWN" | null;
};

const SymbolCardHeader = ({ id, trendColor, trend }: SymbolCardHeaderProps) => {
	return (
		<div className="symbolCard__header">
			<span>{id}</span>
			{trend && <img src={`/src/assets/${trendColor}.png`} alt="trend" />}
		</div>
	);
};

export default SymbolCardHeader;
