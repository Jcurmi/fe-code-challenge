export const convertNumberToCurrency = (
    number = 0,

) => {
    try {
        if (Number.isNaN(number)) {
            return number
        }

        const _number = Number(number)

        return new Intl.NumberFormat("en", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
            currencyDisplay: "symbol",
        }).format(_number)
    } catch {
        return number
    }
}


export const convertNumberToString = (num: number, decimals = 1): string => {
    if (num < 1_000) return num.toString(); // No formatting for small numbers

    const units = [
        { value: 1_000_000_000_000, symbol: "T" }, // Trillion
        { value: 1_000_000_000, symbol: "B" }, // Billion
        { value: 1_000_000, symbol: "M" }, // Million
        { value: 1_000, symbol: "K" }, // Thousand
    ];

    for (const unit of units) {
        if (num >= unit.value) {
            return (num / unit.value).toFixed(decimals).replace(/\.0+$/, "") + unit.symbol;
        }
    }

    return num.toString();
};