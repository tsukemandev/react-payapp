import CheckAccessToken from "../Auth/CheckAccessToken";
import FooterNav from "../Part/FooterNav";
import TopNav from "../Part/TopNav";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  function changePassword() {
    let previousPassword = document.getElementById('previousPassword').value
    let newPassword = document.getElementById('newPassword').value
    let newPassowrdConfirm = document.getElementById('newPasswordConfirm').value

    if (newPassword !== newPassowrdConfirm) {
      alert('새 비밀번호 및 비밀번호 확인이 같아야 합니다.')
      return;
    }

    fetch(process.env.REACT_APP_BACKDOMAIN + "/app/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        previousPassword: previousPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        alert(data.message)

        if (data.code === '200') {
          navigate('/link')
        } else if (data.code === '401') {
          navigate('/login')
        }
        
      })
      .catch((error) => console.error("Error : ", error));
  }

  function changeBusiness(isAuthPay) {
    let mid;
    let mKey;

    if (isAuthPay) {
      mid = document.getElementById('mid').value
      mKey = document.getElementById('mKey').value
    } else {
      mid = document.getElementById('manualMid').value
      mKey = document.getElementById('manualMKey').value
    }

    if (!mid || !mKey) {
      alert('입력사항을 제대로 입력해주세요.')
      return;
    }
        fetch(process.env.REACT_APP_BACKDOMAIN + "/app/business", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
          },
          body: JSON.stringify({
            mid: mid,
            mKey: mKey,
            isAuthPay: isAuthPay
          }),
        })
          .then((response) => response.json())
          .then((data) => {
    
            alert(data.message)

            if (data.code === '200') {
              navigate('/link')
            } else if (data.code === '401') {
              navigate('/login')
            }
            
          })
          .catch((error) => console.error("Error : ", error));
  }
  
  return (
    <div>
      <TopNav></TopNav>

      <div className="gray-background">
        <div className="linkpay-container">
          <div className="linkpay-title">
            <h1>비밀번호 변경</h1>
          </div>


          <div className="linkpay-content mt-3 p-3">

            <div className="col-auto">
              <label htmlFor="previousPassword" className="col-form-label">기존 비밀번호</label>
            </div>
            <div className="col-auto">
              <input type="password" id="previousPassword" className="form-control" aria-describedby="passwordHelpInline"/>
            </div>


            <div className="col-auto">
              <label htmlFor="newPassword" className="col-form-label">새 비밀번호</label>
            </div>
            <div className="col-auto">
              <input type="password" id="newPassword" className="form-control" aria-describedby="passwordHelpInline"/>
            </div>

            <div className="col-auto">
              <label htmlFor="newPasswordConfirm" className="col-form-label">새 비밀번호 확인</label>
            </div>
            <div className="col-auto">
              <input type="password" id="newPasswordConfirm" className="form-control" aria-describedby="passwordHelpInline"/>
            </div>

            <button type="button" className="btn btn-primary mt-4" id="passwordBtn" onClick={changePassword}>변경</button>

          </div>



          <div className="linkpay-title mt-5">
            <h1>링크결제 필수 정보입력</h1>
          </div>


          <div className="linkpay-content mt-3 p-3">

            <div className="col-auto">
              <label htmlFor="mid" className="col-form-label">MID</label>
            </div>
            <div className="col-auto">
              <input type="text" id="mid" className="form-control" placeholder="발급받은 인증결제 MID"/>
            </div>

            <div className="col-auto">
              <label htmlFor="mKey" className="col-form-label">상점키</label>
            </div>
            <div className="col-auto">
              <input type="text" id="mKey" className="form-control" placeholder="발급받은 인증결제 상점키"/>
            </div>

            <button type="button" className="btn btn-primary mt-4" id="businessBtn" onClick={() => {changeBusiness(true)}}>등록</button>

          </div>


          <div className="linkpay-title mt-5">
            <h1>수기결제 필수 정보입력</h1>
          </div>


          <div className="linkpay-content mt-3 p-3">

            <div className="col-auto">
              <label htmlFor="manualMid" className="col-form-label">MID</label>
            </div>
            <div className="col-auto">
              <input type="text" id="manualMid" className="form-control" placeholder="발급받은 수기결제 MID"/>
            </div>

            <div className="col-auto">
              <label htmlFor="manualMKey" className="col-form-label">상점키</label>
            </div>
            <div className="col-auto">
              <input type="text" id="manualMKey" className="form-control" placeholder="발급받은 수기결제 상점키"/>
            </div>

            <button type="button" className="btn btn-primary mt-4" id="businessBtn" onClick={() => {changeBusiness(false)}}>등록</button>

          </div>
        </div>
      </div>

      <FooterNav></FooterNav>
      <CheckAccessToken></CheckAccessToken>
    </div>
  );
}

export default Profile;
