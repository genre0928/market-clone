const form = document.querySelector("#signup-form");

const checkPassword = () => {
  const formdata = new FormData(form);
  const pw1 = formdata.get("pw");
  const pw2 = formdata.get("pw2");

  if (pw1 === pw2) {
    return true;
  } else false;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("pw"));
  formData.set("pw", sha256Password);

  const div = document.querySelector("#info");

  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data === "200") {
      alert("회원가입이 완료되었습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 다릅니다.";
    form.appendChild(div);
  }
};

form.addEventListener("submit", handleSubmit);
