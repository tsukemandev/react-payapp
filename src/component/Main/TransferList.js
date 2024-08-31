
import "../../custom/transfer.css"
import TopNav from "../Part/TopNav"
import FooterNav from "../Part/FooterNav"
import { useEffect, useState } from "react";

import CryptoJS from 'crypto-js';

function TransferList() {

    const [transfersList, setTransfersList] = useState([]);
    const [mid, setMid] = useState('')
    const [mKey, setMkey] = useState('')

    useEffect(() => {
        getTransferList();
        getBusiness();


    }, []);


    function getBusiness() {
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
    }

    function getTransferList() {
        fetch(process.env.REACT_APP_BACKDOMAIN + "/app/transfers", {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTransfersList(data);
            })
            .catch((error) => console.error("Error : ", error));
    }




    function cancelPayment(transfer) {
        let ediDate = getEdiDate(new Date())  //  mid + ediDate + goodsAmt + mKey
        let encData = hashSHA256(mid + ediDate + transfer.goodsAmt + mKey)

        fetch(process.env.REACT_APP_BACKDOMAIN + "/payment.cancel", {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                tid: transfer.tid,
                canAmt: transfer.goodsAmt,
                canMsg: '고객직접취소',
                encData: encData,
                ediDate: ediDate,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("취소결과 : " + JSON.stringify(data))
                if (data.code === '200') {
                    getTransferList()       
                } else {
                    alert(data.message)   
                }
            })
            .catch((error) => console.error("Error : ", error));
    }

    function hashSHA256(data) {
        console.log('hashSHA256 실행')
        const hash = CryptoJS.SHA256(data);
        return hash.toString(CryptoJS.enc.Hex);
    }

    function getEdiDate(date) {
        console.log('getEdiDate 실행')
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }


    return (
        <div className="container mt-10 mb-10">
            <TopNav></TopNav>

            {
                //transfersList.length > 0 ? (
                transfersList.map((transfer, index) => (
                    <div className="card mb-3" key={transfer.pk || index}>
                        <div className="card-body">
                            <div className="d-flex flex-column flex-lg-row">
                                <div className="row flex-fill">
                                    <div className="col-sm-5">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px' }}>
                                            <h4>{transfer.goodsName || ''}</h4>
                                            {transfer.applyDate ? <span className="badge bg-success" style={{ lineHeight: '2' }}>성공</span>
                                                : <span className="badge bg-danger" style={{ lineHeight: '2' }}>실패</span>}
                                        </div>
                                        <span>가격: </span>&nbsp;<span>{transfer.goodsAmt || ''}</span>
                                    </div>
                                    <div className="col-sm-4">
                                        <span>TID: </span>&nbsp;<span>{transfer.tid || ''}</span>
                                    </div>
                                    <div className="col-sm-4">
                                        <span>요청 날짜: </span>&nbsp;<span>{transfer.authDate || ''}</span>
                                    </div>
                                    <div className="col-sm-4">
                                        <span>승인 날짜: </span>&nbsp;<span>{transfer.applyDate || ''}</span>
                                    </div>
                                    <div className="col-sm-3 text-lg-end mt-3">
                                    {transfer.applyDate && !transfer.cancelDate ? 
                                        <button className="btn btn-danger" onClick={() => { cancelPayment(transfer) }}>결제취소</button>
                                        : transfer.applyDate && transfer.cancelDate ? 
                                        <button className="btn btn-secondary">취소완료</button> : ""}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))

            }


            <FooterNav menuId={'menu-transfers'}></FooterNav>
        </div>
    )
}


export default TransferList