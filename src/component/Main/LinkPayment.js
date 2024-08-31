import { useEffect, useState } from "react";
import CheckAccessToken from "../Auth/CheckAccessToken";
import FooterNav from "../Part/FooterNav";
import TopNav from "../Part/TopNav";


function LinkPayment() {

  const [paymentUrl, setPaymentUrl] = useState('')
  const [mid, setMid] = useState('')
  const [mKey, setMkey] = useState('')

  useEffect(() => {
    
    fetch(process.env.REACT_APP_BACKDOMAIN + "/app/business?isAuthPay=true", {
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


  function isNumber(value) {
    return (value==Number(value))?"number":"string"
  }

  function copyToClipBoard() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(paymentUrl);
    alert('복사 되었습니다.')
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

    setPaymentUrl(process.env.REACT_APP_FRONTDOMAIN + '/payment' + '?goodsAmt=' + goodsAmt + '&goodsName=' 
    + encodeURIComponent(goodsName) 
    + '&mid=' + encodeURIComponent(mid) 
    + '&ordNm=' + encodeURIComponent(ordNm) 
    + '&mKey=' + encodeURIComponent(mKey))
  }

  return (
    <div>
      <TopNav></TopNav>

      <div className="gray-background">
        <div className="linkpay-container">
          <div className="linkpay-title">
            <h1>링크 결제 생성하기</h1>
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

            <button type="button" className="btn btn-primary mt-4" onClick={generatePaymentUrl}>링크 생성</button>

            { paymentUrl ?
            <div className="border-top border-secondary mt-3 pt-3">
              <div style={{display : 'inline'}}>
                결제링크 &nbsp;           
              </div> 
              <div style={{display : 'inline'}}>
                <button type="button" className="btn btn-secondary" style={{padding : '4px', fontSize : '11px'}} onClick={copyToClipBoard}>복사</button>
              </div> 
              <a href={paymentUrl} style={{wordWrap : 'break-word', overflowWrap : 'break-word'}}>{paymentUrl}</a>
            </div> : ''
            }
            

          </div>
        </div>
        
      </div>


      <FooterNav menuId={'menu-link'}></FooterNav>
      <CheckAccessToken></CheckAccessToken>
    </div>
  );
}

export default LinkPayment;
