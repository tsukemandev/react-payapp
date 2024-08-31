import React from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {

  const navigate = useNavigate();

  function signUp(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = document.querySelector(".needs-validation");
    form.classList.add("was-validated");

    const id = document.getElementById('id').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value
    const name = document.getElementById('name').value
    const tel = document.getElementById('tel').value

    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인은 같아야합니다.')
      return;
    }

    if (id && password && name && tel) {
      fetch(process.env.REACT_APP_BACKDOMAIN + "/app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          password: password,
          name: name,
          tel: tel
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === '200') {
            navigate("/login")
          } else {
            alert(data.message)
          }
        })
        .catch((error) => console.error("Error : ", error));
    }
    
  }

  return (
    <div className="text-center signup-body">
      <div className="top-nav">
        <div onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
      </div>
      <div className="form-signin signup-main">
        <form className="needs-validation" noValidate>
          <img
            className="mb-4"
            src="/img/logos/paysmlogo.png"
            alt="Paysm Logo"
            style={{ width: "100%" }}
          />
          {/*<h1 class="h3 mb-3 fw-normal">로그인</h1>*/}

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="id"
              placeholder="아이디"
              required
            />
            <label>아이디</label>
            <div className="invalid-feedback">아이디를 입력해주세요.</div>
          </div>

          <div className="my-3"></div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="비밀번호"
              required
            />
            <label>비밀번호</label>
            <div className="invalid-feedback">비밀번호를 입력해주세요.</div>
          </div>

          <div className="my-3"></div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              placeholder="비밀번호 확인"
              required
            />
            <label>비밀번호 확인</label>
            <div className="invalid-feedback">
              비밀번호 확인을 입력해주세요.
            </div>
          </div>

          <div className="my-3"></div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="이름"
              required
            />
            <label>이름</label>
            <div className="invalid-feedback">이름을 입력해주세요.</div>
          </div>
          <div className="my-3"></div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="tel"
              placeholder="전화번호"
              required
            />
            <label>전화번호</label>
            <div className="invalid-feedback">전화번호를 입력해주세요.</div>
          </div>

          <button
            className="w-100 btn btn-lg btn-primary mt-5"
            type="submit"
            onClick={signUp}
          >
            회원가입
          </button>

          <p className="mt-5 mb-3 text-muted">
            &copy; 2023 Paysm All right reserved
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
