async function testQuoteAPI() {
    const url = 'https://api.quotable.io/random';
  
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
  