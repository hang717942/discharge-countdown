(() => {
  const quotes = [
    '오늘의 한 걸음이 내일의 자유에 가까워집니다.',
    '무사히 보낸 하루, 그 자체로 충분히 잘했습니다.',
    '서두르지 않아도 괜찮아. 너의 봄은 오고 있어.',
    '끝까지 건강하게, 돌아오는 길은 가볍게.',
    '작은 웃음 하나가 오늘을 버티는 힘이 됩니다.',
    '잘 먹고, 잘 자고, 오늘의 나를 잘 챙기자.',
    '함께 걸은 시간은 오래도록 힘이 됩니다.',
    '조금 느린 날에도 우리는 앞으로 가고 있습니다.',
    '오늘 할 수 있는 만큼, 그것이면 충분합니다.',
    '기다림 끝에는 다시 만날 소중한 일상이 있습니다.',
    '강한 마음은 나를 다정하게 돌보는 데서 시작됩니다.',
    '오늘도 수고했어. 네가 돌아올 자리는 늘 여기 있어.',
    '한 번의 깊은 숨, 그리고 다시 한 걸음.',
    '잘 견딘 하루하루가 너만의 이야기가 됩니다.',
    '힘든 날에는 쉬어 가도 괜찮습니다.',
    '전역 후의 멋진 계획보다 오늘의 건강을 먼저.',
    '다정한 말 한마디가 전우의 하루를 밝힙니다.',
    '서로의 안전을 챙기는 오늘, 함께 웃는 내일.',
    '너의 속도로 가도 좋아. 끝은 분명 가까워져.',
    '지나온 시간만큼, 너는 단단하게 자라고 있어.',
    '오늘의 작은 기쁨을 놓치지 말자.',
    '당연한 하루는 없습니다. 오늘도 무사해서 고맙습니다.',
    '다시 만날 때는 더 많이 웃고, 더 맛있게 먹자.',
    '마지막 날까지 안전하게, 다음 날부터 자유롭게.',
    '비 오는 날 뒤에도, 긴 기다림 뒤에도 맑은 날은 옵니다.',
    '내일의 나를 위해 오늘의 나를 응원합니다.',
    '큰일을 하지 않아도, 네 하루는 소중합니다.',
    '오늘도 하나씩. 결국 그날은 옵니다.',
    '함께한 추억은 남기고, 새로운 일상을 만나러.',
    '김상병의 다음 챕터를 진심으로 응원합니다.'
  ];
  const box=document.getElementById('daily-quote'), text=document.getElementById('quote-text'), date=document.getElementById('quote-date');
  const profile=document.body.dataset.profile||'gyusik'; const personName=document.body.dataset.name||'김규식'; const key='kim-encouragement-v2-'+profile; let state={}; let current=-1;
  try{state=JSON.parse(localStorage.getItem(key)||'{}')||{};}catch{}
  function day(){return Math.floor((Date.now()+32400000)/86400000);}
  let shownDay;
  function show(initial=false){
    const today=day();
    const offset=state.day===today&&Number.isInteger(state.offset)?state.offset+1:0;
    let next=((today%quotes.length)+offset)%quotes.length;
    const last=initial?state.last:current;
    if(next===last)next=(next+1)%quotes.length;
    current=next;shownDay=today;state={day:today,offset:((next-today)%quotes.length+quotes.length)%quotes.length,last:next};
    text.textContent=quotes[next].replaceAll('김상병',personName);date.textContent=new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',month:'long',day:'numeric'}).format(new Date())+' · 오늘의 응원';
    try{localStorage.setItem(key,JSON.stringify(state));}catch{}
  }
  show(true);
  document.getElementById('next-quote').addEventListener('click',()=>show());
  setInterval(()=>{if(day()!==shownDay)show();},1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&day()!==shownDay)show();});
  window.addEventListener('pageshow',e=>{if(e.persisted)show();});
})();
