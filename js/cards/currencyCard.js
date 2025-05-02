import { fetchCExchangeRates } from "../utils/api.js"


export function currencyCard() {

  const Card = document.querySelector("#currency-card")

  async function render() {
    Card.innerHTML = "Loading...."

    try {
      const content = await fetchCExchangeRates()
      const rates = await content.rates

      console.log(content, rates)
      let tableHTML = `
      <h2>💱 匯率 Base: ${content.base}</h2>
      <table>
        <thead>
          <tr><th>幣別</th><th>匯率</th></tr>
        </thead>
        <tbody>
          ${Object.entries(rates).map(
        ([code, rate]) => `<tr><td>${code}</td><td>${rate.toFixed(2)}</td></tr>`
      ).join('')}
        </tbody>
      </table>
      <button id="refresh-rate">重新整理</button>
    `;

      Card.innerHTML = tableHTML
      document.querySelector("#refresh-rate").addEventListener('click', render)

    } catch {
      card.innerHTML = `<p>⚠️ 無法取得匯率資料</p>`;
    }
  }

  render()


  console.log('currencyCard module loaded');
}
