export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + "$" + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

// stolen from https://stackoverflow.com/questions/2332811/capitalize-words-in-string
// eslint-disable-next-line
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

export const txDeepLinkURL = ({ start_date, end_date, bank_account, categories }) => {
  const loc = window.location
  let filter = {}

  if (start_date !== undefined) {
    filter = {...filter, start_date}
  }
  if (end_date !== undefined) {
    filter = {...filter, end_date}
  }
  if (bank_account !== undefined) {
    filter = {...filter, bank_account}
  }
  if (categories !== undefined) {
    filter = {...filter, categories}
  }


  const qs = Object.keys(filter).map(key => key + '=' + filter[key]).join('&');

  return `${loc.protocol}//${loc.host}/transactions?${qs}`
}