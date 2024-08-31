import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';


function Payment() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let mid = urlParams.get('mid')
  let mKey = urlParams.get('mKey')

  let goodsAmt = urlParams.get('goodsAmt')
  let ediDate = getEdiDate(new Date())
  let encData = hashSHA256(mid + ediDate + goodsAmt + mKey)

  let ordNo = mid + ':' + ediDate  //이것도 고유해야함
  let ordNm = urlParams.get('ordNm')
  let goodsNm = urlParams.get('goodsName')
  let ordTel = ''


  function hashSHA256(data) {
    const hash = CryptoJS.SHA256(data);
    return hash.toString(CryptoJS.enc.Hex);
  }

  function getEdiDate(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}


  useEffect(() => {
    document.getElementById('payForm').submit()
  }, [])

  return (
    <form action="https://api.skyclassism.com/payInit_hash.do" method='post' id='payForm'>
        <input
          className="form-control"
          type="hidden"
          id="payMethod"
          name="payMethod"
          defaultValue={"card"}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="mid"
          name="mid"
          defaultValue={mid}
        ></input>


        <input
          className="form-control"
          type="hidden"
          id="goodsNm"
          name="goodsNm"
          defaultValue={goodsNm}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="ordNo"
          name="ordNo"
          defaultValue={ordNo}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="ordNm"
          name="ordNm"
          defaultValue={ordNm}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="ordTel"
          name="ordTel"
          defaultValue={ordTel}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="goodsAmt"
          name="goodsAmt"
          defaultValue={goodsAmt}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="trxCd"
          name="trxCd"
          defaultValue={"0"}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="ediDate"
          name="ediDate"
          defaultValue={ediDate}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="encData"
          name="encData"
          defaultValue={encData}
        ></input>



        {/* 선택사항 */}



        <input
          className="form-control"
          type="hidden"
          id="returnUrl"
          name="returnUrl"
          defaultValue={process.env.REACT_APP_PAYMENT}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="mbsReserved"
          name="mbsReserved"
          defaultValue={encData}
        ></input>

        <input
          className="form-control"
          type="hidden"
          id="channel"
          name="channel"
          defaultValue={"0002"}
        ></input>


        <input
          className="form-control"
          type="hidden"
          id="charSet"
          name="charSet"
          defaultValue={"UTF-8"}
        ></input>

    </form>
  );
}

export default Payment;
