// �̸�
function cutAccount(data) {
    return JSON.stringify(data, ['Account'])
}
// �޼���
function cutMessage(data) {
    return JSON.stringify(data, ['Message'])
}
// ���̽��� ��̾ȿ� ��̷�
function toArray(data) {
    return JSON.parse(data).map(doc => Object.values(doc));
}
// �迭�ȿ� ����ũã��
function uniq(data) {
    return Array.from(new Set(data));
}
// �迭�ȿ� ����ã�� data1�� �����迭 data2�� ����ũã���迭
function count(data1, data2) {
    let counts = {}
    for (a of data2){
        let co = data1.filter(element => a === element).length;  
        counts [a] = co
    }
    return counts
}
// �迭 �����ϰԸ����
function flat(data) {
    return toArray(data).flat(Infinity)
}
//data1 ����ũ�迭 data2�̸��޼����迭
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
// ���̺����
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
//���ϸ����⿡�� ���������� ����Ǵ� �Լ� + csv�� json���� �ٲٴ� �Լ�
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

function csvToJSON(csv_string){
const rows = csv_string.split("\r\n"); 
const jsonArray = []; 
const header = rows[0].split(","); 

for(let i = 1; i < rows.length; i++){ 
let obj = {}; 
let row = rows[i].split(","); 

for(let j=0; j < header.length; j++){ obj[header[j]] = row[j]; } 
jsonArray.push(obj); }
return jsonArray; 
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
    document.write(`<div class="wrapper2">`)
    document.write(`<input class="button" type="button" value="���� �ϱ�" onclick="selectElementContents( document.getElementById('atta') );">`);
    document.write(`</div>`)
    document.write('<table id="atta"class="csvtable">')
    hh(aa, data)
    document.write('</table>')
    document.write(`<link rel="stylesheet" href="style.css">`);
};
reader.readAsText(input);
});


//���̺��� Ŭ�����忡 ����
function selectElementContents(el) {
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand("Copy");}