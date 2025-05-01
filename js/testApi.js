async function testQuoteAPI() {
    const url = 'https://api.exchangerate.host/latest?base=USD&symbols=TWD,JPY,EUR';
  
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`❌ API 回應錯誤：${res.status}`);
      }
  
      const data = await res.json();
      console.log('✅ 測試成功！資料如下：');
      console.log(data);
  
      if (!data.content || !data.author) {
        console.warn('⚠️ 資料格式可能異常：缺少 content 或 author');
      } else {
        console.log(`👉 quote: "${data.content}"`);
        console.log(`👉 author: ${data.author}`);
      }
  
    } catch (err) {
      console.error('❌ 測試失敗：', err);
    }
  }
  
  testQuoteAPI();
  


  import { fetchExchangeRates } from '../utils/api.js';

export function currencyCard() {
  const card = document.getElementById('currency-card');
  card.innerHTML = '載入中...';

  async function renderRates() {
    card.innerHTML = '載入中...';
    try {
      const data = await fetchExchangeRates();
      const rates = data.rates;

      let tableHTML = `
        <h2>💱 匯率（Base: ${data.base}）</h2>
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

      card.innerHTML = tableHTML;
      document.getElementById('refresh-rate').addEventListener('click', renderRates);
    } catch (err) {
      card.innerHTML = `<p>⚠️ 無法取得匯率資料</p>`;
    }
  }

  renderRates();
}
