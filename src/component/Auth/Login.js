import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();


  function sendLogin() {
    let id = document.getElementById("id").value;
    let password = document.getElementById("password").value;

    if (!id || !password) {
      alert("아이디나 패스워드를 입력해주세요.");
      return;
    }

    fetch(process.env.REACT_APP_BACKDOMAIN + "/app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let code = data.code;
        if (code === "400") {
          alert("아이디나 패스워드를 입력해주세요.");
          return;
        } else if (code === "401") {
          alert("아이디나 패스워드가 일치하지 않습니다.");
          return;
        }
        sessionStorage.setItem('accessToken', data.accessToken)
        navigate('/link')
        
      })
      .catch((error) => console.error("Error : ", error));
  }

  return (
    <div className="text-center login-body">
      <div className="form-signin login-main">
        <form>
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
            />
            <label>아이디</label>
          </div>
          <div className="my-3"></div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="비밀번호"
            />
            <label>비밀번호</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="button"
            onClick={sendLogin}
          >
            로그인
          </button>

          <Link to={"/signup"}>
            <button
              className="w-100 btn btn-lg btn-warning mt-3"
              type="button"
            >
              회원가입
            </button>
          </Link>
          <p className="mt-5 mb-3 text-muted">
            &copy; 2023 Paysm All right reserved
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
