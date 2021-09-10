function noIndexCSV(json_data) { 
    // 1-1. json 데이터 취득 
    const json_array = json_data; 
    // 1-2. json데이터를 문자열(string)로 넣은 경우, JSON 배열 객체로 만들기 위해 아래 코드 사용 
    // const json_array = JSON.parse(json_data); 
    // 2. CSV 문자열 변수 선언: json을 csv로 변환한 문자열이 담길 변수 
    let csv_string = ''; 
    // 3. 제목 추출: json_array의 첫번째 요소(객체)에서 제목(머릿글)으로 사용할 키값을 추출 
    const titles = Object.keys(json_array[0]); 
    // 4. CSV문자열에 제목 삽입: 각 제목은 컴마로 구분, 마지막 제목은 줄바꿈 추가 
    // titles.forEach((title, index)=>{ csv_string += (index !== titles.length-1 ? `${title},` : `${title}\r\n`); }); 
    // 5. 내용 추출: json_array의 모든 요소를 순회하며 '내용' 추출 
    json_array.forEach((content, index)=>{ 
        let row = ''; 
        // 각 인덱스에 해당하는 '내용'을 담을 행 
        for(let title in content){ 
            // for in 문은 객체의 키값만 추출하여 순회함. 
            // 행에 '내용' 할당: 각 내용 앞에 컴마를 삽입하여 구분, 첫번째 내용은 앞에 컴마X 
                row += (row === '' ? `${content[title]}` : `,${content[title]}`); 
                } 
            // CSV 문자열에 '내용' 행 삽입: 뒤에 줄바꿈(\r\n) 추가, 마지막 행은 줄바꿈X 
            csv_string += (index !== json_array.length-1 ? `${row}\r\n`: `${row}`); 
        }) 
    // 6. CSV 문자열 반환: 최종 결과물(string) 
    return csv_string; 
}
// 이름
function cutAccount(data) {
    return JSON.stringify(data, ['Account'])
}
// 메세지
function cutMessage(data) {
    return JSON.stringify(data, ['Message'])
}
// 제이슨을 어레이안에 어레이로
function toArray(data) {
    return JSON.parse(data).map(doc => Object.values(doc));
}
// 배열안에 유니크찾기
function uniq(data) {
    return Array.from(new Set(data));
}
// 배열안에 개수찾기 data1은 원래배열 data2는 유니크찾은배열
function count(data1, data2) {
    let counts = {}
    for (a of data2){
        let co = data1.filter(element => a === element).length;  
        counts [a] = co
    }
    return counts
}
// 배열 평평하게만들기
function flat(data) {
    return toArray(data).flat(Infinity)
}
//data1 유니크배열 data2이름메세지배열
function hh(data1, data2) {
    for(i of data1){
        const acc = data2.filter(function(data){ 
            return data.Account == `${i}`})
        const acname = acc.map((obj) => Object.values(obj)[2]);
        const acacc = acc.map((obj) => Object.values(obj)[1]);
        const flatmess = flat(cutMessage(acc))
        const uniqmess = uniq(flatmess)
        const countmess = count(flatmess, uniqmess)
        const allacc = acc.length
        gg(acname[0], acacc[0], countmess, allacc)
        }
    
}
// 테이블만들기
function gg(data1, data2, data3, data4) {
    document.write('<table id="table">')
    document.write('<thead>')
    document.write('<tr>')
    document.write('<th>')
    document.write(`${data1},${data2}`)
    document.write('</th>')
    document.write('<th>')
    document.write(`Count`)
    document.write('</th>')
    document.write('</tr>')
    document.write('</thead>')
    document.write('<tbody>')
    for (const [key, value] of Object.entries(data3)) {
        document.write('<tr>')
        document.write('<td>')
        document.write(`${key}`)
        document.write('</td>')
        document.write('<td>')
        document.write(`${value}`)
        document.write('</td>')
        document.write('</tr>')
    }
    document.write('</tbody>')
    document.write('<tfoot>')
    document.write('<tr>')
    document.write('<td class="all">')
    document.write(`All`)
    document.write('</td>')
    document.write('<td>')
    document.write(`${data4}`)
    document.write('</td>')
    document.write('</tr>')
    document.write('</tfoot>')
    document.write('</table>')
    
}
//파일리더기에서 파일읽으면 실행되는 함수 + csv를 json으로 바꾸는 함수
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

function csvToJSON(csv_string){
// 1. 문자열을 줄바꿈으로 구분 => 배열에 저장 
const rows = csv_string.split("\r\n"); 
// 줄바꿈을 \n으로만 구분해야하는 경우, 아래 코드 사용 // const rows = csv_string.split("\n"); 
// 2. 빈 배열 생성: CSV의 각 행을 담을 JSON 객체임 
const jsonArray = []; 
// 3. 제목 행 추출 후, 콤마로 구분 => 배열에 저장 
const header = rows[0].split(","); 
// 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기 
for(let i = 1; i < rows.length; i++){ 
// 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임 
let obj = {}; 
// 각 내용 행을 콤마로 구분 
let row = rows[i].split(","); 
// 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성 
for(let j=0; j < header.length; j++){ obj[header[j]] = row[j]; } 
// 각 내용 행의 객체를 jsonArray배열에 담기 
jsonArray.push(obj); }
// 5. 완성된 JSON 객체 배열 반환 
return jsonArray; 
// 문자열 형태의 JSON으로 반환할 경우, 아래 코드 사용
// return JSON.stringify(jsonArray); 
}

myForm.addEventListener("submit", function (e) {
e.preventDefault();
const input = csvFile.files[0];
const reader = new FileReader();

reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToJSON(text);
    const acount = cutAccount(data)
    const aa = uniq(flat(acount))
    hh(aa, data)
    document.write(`<link rel="stylesheet" href="style.css">`);
};
reader.readAsText(input);
});