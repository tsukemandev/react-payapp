import { useEffect, useState } from "react";
import CheckAccessToken from "../Auth/CheckAccessToken";
import FooterNav from "../Part/FooterNav";
import TopNav from "../Part/TopNav";


function ManualPayment() {

  const [mid, setMid] = useState('')
  const [mKey, setMkey] = useState('')

  useEffect(() => {
    
    fetch(process.env.REACT_APP_BACKDOMAIN + "/app/business?isAuthPay=false", {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMid(data.mid)
        setMkey(data.mKey)
      })
      .catch((error) => console.error("Error : ", error));

  },[])

  function goPayment() {
    let paymentUrl = generatePaymentUrl();
    if (!paymentUrl) {
      return;
    }

    window.location.href = paymentUrl
  }


  function isNumber(value) {
    return (value==Number(value))?"number":"string"
  }


  function generatePaymentUrl() {

    const goodsAmt = document.getElementById('goodsAmt').value;
    const goodsName = document.getElementById('goodsName').value;
    const ordNm = document.getElementById('ordNm').value;

    if (!goodsAmt || isNumber(goodsAmt) === 'string') {
      alert('상품가격은 숫자만 입력가능합니다.')
      return;
    }

    if (goodsName.length <= 0) {
      alert('상품명을 입력해주세요.')
      return;
    }

    if (ordNm.length <= 0) {
      alert('구매자명을 입력해주세요.')
      return;
    }

    return process.env.REACT_APP_FRONTDOMAIN + '/payment' + '?goodsAmt=' + goodsAmt + '&goodsName=' 
    + encodeURIComponent(goodsName) 
    + '&mid=' + encodeURIComponent(mid) 
    + '&ordNm=' + encodeURIComponent(ordNm) 
    + '&mKey=' + encodeURIComponent(mKey)
  }

  return (
    <div>
      <TopNav></TopNav>

      <div className="gray-background">
        <div className="linkpay-container">
          <div className="linkpay-title">
            <h1>수기 결제</h1>
          </div>


          <div className="linkpay-content mt-3 p-3">

            <div className="col-auto">
              <label htmlFor="goodsAmt" className="col-form-label">상품금액</label>
            </div>
            <div className="col-auto">
              <input type="text" id="goodsAmt" className="form-control"/>
            </div>

            <div className="col-auto">
              <label htmlFor="goodsName" className="col-form-label">상품명</label>
            </div>
            <div className="col-auto">
              <input type="text" id="goodsName" className="form-control"/>
            </div>

            <div className="col-auto">
              <label htmlFor="ordNm" className="col-form-label">구매자명</label>
            </div>
            <div className="col-auto">
              <input type="text" id="ordNm" className="form-control"/>
            </div>

            <button type="button" className="btn btn-primary mt-4" onClick={goPayment}>결제</button>            

          </div>
        </div>
        
      </div>


      <FooterNav menuId={'menu-manual'}></FooterNav>
      <CheckAccessToken></CheckAccessToken>
    </div>
  );
}

export default ManualPayment;
