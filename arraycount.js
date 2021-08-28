const count = ["ant","ant","ant","ant","ant","ant","ant","ant","ant","ant","ant","ant","a","b",'apple','w'];

// 배열 중복제거
const as = Array.from(new Set(count));

// 배열 중복제거한 리스트에서 하나씩 뽑아 개수 프린트
for (a of as){
console.log(a)
let co = count.filter(element => a === element).length;
console.log(co)};