export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatNumber = (num: number) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'rb';
    }
    return num.toString();
};
