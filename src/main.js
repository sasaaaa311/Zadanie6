const SUPABASE_URL = "https://fvalbyomwgzflzkbjcvv.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2YWxieW9td2d6Zmx6a2JqY3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTEzNDYsImV4cCI6MjA5NTg2NzM0Nn0.q4gbHyrelLNYz39SotR31u__uzuI--ZJYKt-quVp33Q";

import dayjs from "dayjs";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

const form = document.querySelector("#form");
const input = document.querySelector("#birthdate");
const dialog = document.querySelector("#dialog");
const result = document.querySelector("#result");
const closeBtn = document.querySelector("#close");

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

async function fetchArticles() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/article?select=*&order=created_at.desc`,
    { headers }
  );

  const data = await res.json();
  render(data);
}

function render(data) {
  const el = document.querySelector("#articles");
  el.innerHTML = "";

  data.forEach((a) => {
    const div = document.createElement("div");

    div.className = "p-4 border rounded mb-4";

    div.innerHTML = `
      <h2 class="font-bold text-lg">${a.title}</h2>
      <h3 class="text-gray-600">${a.subtitle}</h3>
      <p>Autor: ${a.author}</p>
      <p class="mt-2">${a.content}</p>
      <small class="text-gray-400">${new Date(a.created_at).toLocaleString()}</small>
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

  await fetch(`${SUPABASE_URL}/rest/v1/article`, {
    method: "POST",
    headers,
    body: JSON.stringify([
      { title, subtitle, author, content }
    ]),
  });

  fetchArticles();
  e.target.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchArticles();
  document.querySelector("#form-articles").addEventListener("submit", create);
});