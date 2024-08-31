import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function PaymentResult() {

    const navigate = useNavigate();
    const [resultCode, setResultCode] = useState('')
    const [goodsName, setGoodsName] = useState('')
    const [payMethod, setPayMethod] = useState('')
    const [goodsAmt, setGoodsAmt] = useState('')
    const [resultMessage, setResultMessage] = useState('')
    const [tid, setTid] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [fnNm, setFnNm] = useState('')

    useEffect(() => {
        
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        setResultCode(urlParams.get('resultCode'))
        setGoodsName(urlParams.get('goodsName'))
        setPayMethod(urlParams.get('payMethod'))
        setGoodsAmt(urlParams.get('amt'))
        setResultMessage(urlParams.get('resultMsg'))
        setTid(urlParams.get('tid'))
        setCardNumber(urlParams.get('cardNo'))
        setFnNm(urlParams.get('fnNm'))

    }, [])

  return (
    <div className="container mt-5 mb-3">
        <div className="row d-flex justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="d-flex flex-row p-2"> 
                      <img src="/logo192.png" width="32" height="32" alt=""/>
                        <div className="d-flex flex-column ps-2"> 
                          <span className="font-weight-bold">결제 영수증</span> 
                          <small>{resultCode === '0000' ? '성공' : '실패'}</small> 
                        </div>
                    </div>
                    
                    {/*
                    <hr/>
                    <div className="table-responsive p-2">
                        <table className="table table-borderless">
                            <tbody>
                                <tr className="add">
                                    <td>To</td>
                                    <td>From</td>
                                </tr>
                                <tr className="content">
                                    <td className="font-weight-bold">
                                        Google <br/>
                                        Attn: John Smith Pymont <br/>
                                        Australia
                                    </td>
                                    <td className="font-weight-bold">
                                        Facebook <br/>
                                        Attn: John Right Polymont <br/>
                                        USA
                                    </td>
                                </tr>
                            </tbody>
                        </table>                        
                    </div> */}

                    { resultCode !== '9999' ?
                    <div>
                        <hr/>
                        <div className="products p-2">
                        <table className="table table-borderless">
                            <tbody>
                                <tr className="add">
                                    <td></td>
                                    <td className="fw-bold">상품명</td>
                                    <td className="fw-bold">결제수단</td>
                                    <td className="fw-bold">상품가격</td>
                                </tr>
                                
                                <tr className="content">
                                    <td></td>
                                    <td>{goodsName}</td>
                                    <td>{payMethod}</td>
                                    <td>{goodsAmt}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div> : ''
                    }
                    

                    {  resultCode === '0000' ?
                    <div>
                        <hr/>
                        <div className="address p-2">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className="add">
                                        <td className="fw-bold">결과</td>
                                    </tr>
                                    <tr className="content">
                                        <td>결과 메시지 : {resultMessage} <br/> 거래번호 : {tid} <br/> 카드번호 : {cardNumber} <br/> 카드사 : {fnNm} <br/> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> :  resultCode !== '9999' ?
                    <div>
                        <hr/>
                        <div className="address p-2">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className="add">
                                        <td className="fw-bold">결과</td>
                                    </tr>
                                    <tr className="content">
                                        <td>결과 메시지 : {resultMessage} <br/> 거래번호 : {tid} <br/> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> : 

                    <div>
                        <hr/>
                        <div className="address p-2">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className="add">
                                        <td className="fw-bold">결과</td>
                                    </tr>
                                    <tr className="content">
                                        <td>결과 메시지 : {resultMessage} <br/> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    }

                </div>

                <div className="d-grid gap-2 mt-4">
                    <button className="btn btn-primary" type="button" onClick={() => navigate("/login")}>확인</button>
                </div>
            </div>  
        </div>
    </div>
  );
}

export default PaymentResult;
