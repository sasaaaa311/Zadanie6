import "./style.css";
import dayjs from "dayjs";

const form = document.querySelector("#form") as HTMLFormElement;
const input = document.querySelector("#birthdate") as HTMLInputElement;
const dialog = document.querySelector("#dialog") as HTMLDialogElement;
const result = document.querySelector("#result") as HTMLParagraphElement;
const closeBtn = document.querySelector("#close") as HTMLButtonElement;

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
    alert("Wszystkiego najlepszego! 🎉");
  }
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});