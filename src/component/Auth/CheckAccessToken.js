import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


function CheckAccessToken() {

    const navigate = useNavigate();

    useEffect(() => {
        
        const accessToken = sessionStorage.getItem('accessToken')
        if (!accessToken) {
            alert('다시 로그인 해주세요.')
            navigate('/login', { replace: true })
            return;
        }

        fetch(process.env.REACT_APP_BACKDOMAIN + "/app/verify/access-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken: accessToken,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.code === '401') {
                alert('다시 로그인 해주세요.')
                navigate("/login", {replace : true})
              }
            }).catch((error) => console.error("Error : ", error));

    },[navigate])

    return (
        <div></div>
    )
}


export default CheckAccessToken

