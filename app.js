const fs = require("fs");
const readline = require("readline");

// buat lokasi folder dan path contact
const path = "./data";
const file = "./data/contact.json";
// jika folder dan file tidak tersedia maka buat baru
if (!fs.existsSync(path)) fs.mkdirSync(path);
if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf-8");

// membuat interface agar cli dapat melakukan i/o
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// fungsi untuk menanyakan pertanyaan (mereturn promise)
const askQuestions = (questions) => {
    return new Promise((resolve, rejects) => {
        rl.question(questions, (data) => {
            resolve(data);
        });
    });
};

// fungsi untuk menampung pertanyaan (berhubungan dengan fungsi sebelumnya)
const main = async () => {
    // karena fungsi askQuestions mereturn promise maka harus menambahkan await
    const name = await askQuestions("siapa nama anda? ");
    const mobile = await askQuestions("berapa nomor telepon? ");
    const email = await askQuestions("berapa alamat email anda? ");
    const contact = { name, mobile, email };
    // baca file contact.json
    const data = fs.readFileSync(file, "utf-8");
    const contacts = JSON.parse(data);
    // push data contact kedalam file contacts
    contacts.push(contact);
    // tulis ulang file contacts
    fs.writeFileSync(file, JSON.stringify(contacts));
    // berikan respon
    console.log("Terima kasih informasinya");
};
main();
