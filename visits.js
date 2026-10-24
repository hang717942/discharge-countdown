(()=>{
 const API='https://discharge-visit-counter.newrook17.chatgpt.site';const profile=document.body.dataset.profile||'gyusik';const key='discharge-visit-'+profile;const ttl=30*60*1000;
 const total=document.getElementById('visit-total'),today=document.getElementById('visit-today'),status=document.getElementById('visit-status');
 const render=data=>{if(!Number.isInteger(data.total)||!Number.isInteger(data.today))throw Error('Invalid count');total.textContent=data.total.toLocaleString('ko-KR');today.textContent=data.today.toLocaleString('ko-KR');status.textContent='접속 시각과 선택한 페이지를 익명으로 기록합니다.';};
 const get=async(path,init={})=>{const r=await fetch(API+path,{...init,signal:AbortSignal.timeout(10000),credentials:'omit'});if(!r.ok)throw Error('Counter unavailable');return r.json();};
 async function load(){try{
  let saved;try{saved=JSON.parse(localStorage.getItem(key)||'null');}catch{}
  const recent=saved&&saved.at<=Date.now()&&Date.now()-saved.at<ttl;
  if(recent&&saved.recorded){render(await get('/stats'));return;}
  let token=recent?saved.token:null;if(!token){token=(await get('/ticket')).token;}
  const pending={token,at:Date.now(),recorded:false};try{localStorage.setItem(key,JSON.stringify(pending));}catch{}
  let data;try{data=await get('/visits',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token,profile})});}catch(error){if(recent){try{localStorage.removeItem(key);}catch{}}throw error;}
  render(data);try{localStorage.setItem(key,JSON.stringify({...pending,recorded:true}));}catch{}
 }catch{total.textContent='—';today.textContent='—';status.textContent='방문 통계를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';}}
 load();
})();

