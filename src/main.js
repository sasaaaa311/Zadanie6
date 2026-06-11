import dayjs from "dayjs";

const supabaseUrl = 'https://xyomfijyqaueocgalgjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5b21maWp5cWF1ZW9jZ2FsZ2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMTM0ODQsImV4cCI6MjA5Njc4OTQ4NH0.9CTStUEssRi02FT5XVdAIMXA5xu59QZ2435n6EdOraI';

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

const form = document.querySelector("#form");
const input = document.querySelector("#birthdate");
const dialog = document.querySelector("#dialog");
const result = document.querySelector("#result");
const closeBtn = document.querySelector("#close");

if (form && input && dialog && result && closeBtn) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const birthDate = dayjs(input.value);
    const today = dayjs();

    const days = today.diff(birthDate, "day");

    result.textContent = `Minęło ${days} dni od Twoich urodzin`;
    dialog.showModal();

    const isBirthday =
      birthDate.date() === today.date() &&
      birthDate.month() === today.month();

    if (isBirthday) {
      alert("Wszystkiego najlepszego!");
    }
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}

async function fetchArticles() {
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/article?select=*&order=created_at.desc`,
      { headers }
    );
    const data = await res.json();
    render(data);
  } catch (error) {
    console.error("Błąd podczas pobierania artykułów:", error);
    const el = document.querySelector("#articles");
    if (el) el.innerHTML = `<p class="text-red-500 font-medium">Nie udało się pobrać artykułów.</p>`;
  }
}

function render(data) {
  const el = document.querySelector("#articles");
  if (!el) return;
  
  el.innerHTML = "";

  if (!data || data.length === 0) {
    el.innerHTML = `<p class="text-gray-400 italic">Brak artykułów w bazie danych.</p>`;
    return;
  }

  data.forEach((a) => {
    const div = document.createElement("div");

    div.className = "p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200";

    div.innerHTML = `
      <h3 class="font-extrabold text-2xl text-gray-900 leading-tight">${a.title}</h3>
      <h4 class="text-md font-medium text-indigo-600 mt-1 mb-3">${a.subtitle}</h4>
      <p class="text-gray-700 whitespace-pre-line leading-relaxed">${a.content}</p>
      
      <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
        <span>Autor: <strong class="text-gray-700">${a.author}</strong></span>
        <span>${new Date(a.created_at).toLocaleString('pl-PL')}</span>
      </div>
    `;

    el.appendChild(div);
  });
}

async function create(e) {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const subtitle = document.querySelector("#subtitle").value;
  const author = document.querySelector("#author").value;
  const content = document.querySelector("#content").value;

  try {
    await fetch(`${supabaseUrl}/rest/v1/article`, {
      method: "POST",
      headers,
      body: JSON.stringify([
        { title, subtitle, author, content }
      ]),
    });

    fetchArticles();
    e.target.reset();
  } catch (error) {
    console.error("Błąd podczas dodawania artykułu:", error);
    alert("Wystąpił błąd podczas publikacji artykułu.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchArticles();
  
  const articleForm = document.querySelector("#form-articles");
  if (articleForm) {
    articleForm.addEventListener("submit", create);
  }
});