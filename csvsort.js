function noIndexCSV(json_data) { 
    // 1-1. json ������ ��� 
    const json_array = json_data; 
    // 1-2. json�����͸� ���ڿ�(string)�� ���� ���, JSON �迭 ��ü�� ����� ���� �Ʒ� �ڵ� ��� 
    // const json_array = JSON.parse(json_data); 
    // 2. CSV ���ڿ� ���� ����: json�� csv�� ��ȯ�� ���ڿ��� ��� ���� 
    let csv_string = ''; 
    // 3. ���� ����: json_array�� ù��° ���(��ü)���� ����(�Ӹ���)���� ����� Ű���� ���� 
    const titles = Object.keys(json_array[0]); 
    // 4. CSV���ڿ��� ���� ����: �� ������ �ĸ��� ����, ������ ������ �ٹٲ� �߰� 
    // titles.forEach((title, index)=>{ csv_string += (index !== titles.length-1 ? `${title},` : `${title}\r\n`); }); 
    // 5. ���� ����: json_array�� ��� ��Ҹ� ��ȸ�ϸ� '����' ���� 
    json_array.forEach((content, index)=>{ 
        let row = ''; 
        // �� �ε����� �ش��ϴ� '����'�� ���� �� 
        for(let title in content){ 
            // for in ���� ��ü�� Ű���� �����Ͽ� ��ȸ��. 
            // �࿡ '����' �Ҵ�: �� ���� �տ� �ĸ��� �����Ͽ� ����, ù��° ������ �տ� �ĸ�X 
                row += (row === '' ? `${content[title]}` : `,${content[title]}`); 
                } 
            // CSV ���ڿ��� '����' �� ����: �ڿ� �ٹٲ�(\r\n) �߰�, ������ ���� �ٹٲ�X 
            csv_string += (index !== json_array.length-1 ? `${row}\r\n`: `${row}`); 
        }) 
    // 6. CSV ���ڿ� ��ȯ: ���� �����(string) 
    return csv_string; 
}
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
// 1. ���ڿ��� �ٹٲ����� ���� => �迭�� ���� 
const rows = csv_string.split("\r\n"); 
// �ٹٲ��� \n���θ� �����ؾ��ϴ� ���, �Ʒ� �ڵ� ��� // const rows = csv_string.split("\n"); 
// 2. �� �迭 ����: CSV�� �� ���� ���� JSON ��ü�� 
const jsonArray = []; 
// 3. ���� �� ���� ��, �޸��� ���� => �迭�� ���� 
const header = rows[0].split(","); 
// 4. ���� �� ��ü�� ��ü�� �����, jsonArray�� ��� 
for(let i = 1; i < rows.length; i++){ 
// �� ��ü ����: �� ���� ���� ��ü�� ����� ��Ƶ� ��ü�� 
let obj = {}; 
// �� ���� ���� �޸��� ���� 
let row = rows[i].split(","); 
// �� �������� {����1:����1, ����2:����2, ...} ������ ��ü�� ���� 
for(let j=0; j < header.length; j++){ obj[header[j]] = row[j]; } 
// �� ���� ���� ��ü�� jsonArray�迭�� ��� 
jsonArray.push(obj); }
// 5. �ϼ��� JSON ��ü �迭 ��ȯ 
return jsonArray; 
// ���ڿ� ������ JSON���� ��ȯ�� ���, �Ʒ� �ڵ� ���
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