// horoscopeCard.js
import{fetchCHoroscope } from '../utils/api.js' 


export function horoscopeCard() {
 
  const select = document.querySelector('#sign-select')
  const result = document.querySelector('#horoscope-result')

  async function renderCard(sign) {
    
    try{
      const data = await fetchCHoroscope(sign)
      console.log(await data)
      result.innerHTML = `
      <p><strong>今日運勢：</strong> ${data.horoscope}</p>
      <p>✨ 幸運指數：${data.intensity}</p>
      <p>😊 心情：${data.mood}</p>
      <p>🔑 關鍵字：${data.keywords}</p>
    `;
  
    }catch(err){
      result.textContent = '⚠️ 無法取得運勢';
    }
  }

  select.addEventListener('change', (e) => {
    console.log(e.target.value)
    renderCard(e.target.value);
  });

  renderCard(select.value)
}
