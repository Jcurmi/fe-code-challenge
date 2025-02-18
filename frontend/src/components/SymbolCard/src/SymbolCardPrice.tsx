type SymbolCardPriceProps = {
	formattedPrice: number | string;
};

const SymbolCardPrice = ({ formattedPrice }: SymbolCardPriceProps) => {
	return (
		<div className="symbolCard__price">
			<span>Price:</span>
			<h3>{formattedPrice}</h3>
		</div>
	);
};

export default SymbolCardPrice;
