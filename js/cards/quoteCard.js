import { fetchRandomQuote } from '../utils/api.js'

export function quoteCard() {
  const quoteCard = document.querySelector('#quote-card')

  quoteCard.innerHTML = `<p>載入中...</p>`

  async function renderQuote() {
      try{
        const data =  await fetchRandomQuote()
        console.log(data)

        quoteCard.innerHTML= ` <blockquote>"${data.content}"</blockquote>
        <p>— ${data.author}</p>
        <button id="quote-reload">再來一句</button>`

        document.getElementById('quote-reload').addEventListener('click', renderQuote);
      }catch(err){
        card.innerHTML = `<p>Quote Loading Fail </p>`;
      }

  }

  renderQuote()

}
