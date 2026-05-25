import "./style.css";
import dayjs from "dayjs";

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
