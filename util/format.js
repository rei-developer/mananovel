module.exports.numberWithCommas = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
