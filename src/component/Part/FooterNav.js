import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FooterMenu(props) {

	const navigate = useNavigate();


	function clickMenuBtn(event) {
		let id = event.currentTarget.id

		if (id === 'menu-link') {
			navigate('/link')
		} else if (id === 'menu-manual') {
			navigate('/manual')
		} else if (id === 'menu-transfers') {
			navigate('/transfers')
		}
		/*
		if (id === 'menu-link' || id === 'menu-manual') {
			
		} else {
			alert('준비중입니다.')
		}*/
	}


    useEffect(() => {
        let menuLink = document.getElementById(props.menuId);
        let menuLinks = document.querySelectorAll(".menu-link");

        if (menuLink) { // menuLink가 존재할 때만 클래스 추가
            menuLinks.forEach((link) => link.classList.remove("is-active"));
            menuLink.classList.add('is-active');
        } 
    }, [props.menuId]); // props.menuId가 변경될 때마다 useEffect 실행

	return (
		
		<div className="menu" id="menu">
			{/* <nav className="navbar container"></nav> */}
			<ul className="menu-list">
				<li className="menu-item">
					<button className="menu-link" id="menu-link" onClick={clickMenuBtn}>
						<i className="menu-icon fa-solid fa-link"></i>
						<span className="menu-name">링크</span>
					</button>
				</li>
				<li className="menu-item">
					<button className="menu-link" id="menu-manual" onClick={clickMenuBtn}>
						<i className="menu-icon fa-solid fa-pen-to-square"></i>
						<span className="menu-name">수기</span>
					</button>
				</li>
				<li className="menu-item">
					<button className="menu-link" id="menu-transfers" onClick={clickMenuBtn}>
						<i className="menu-icon fa-solid fa-list"></i>
						<span className="menu-name">거래내역</span>
					</button>
				</li>
				{/*<li className="menu-item">
					<button className="menu-link" id="menu-link" onClick={clickMenuBtn}>
						<i className="menu-icon fa-solid fa-link"></i>
						<span className="menu-name">링크</span>
					</button>
				</li>
				<li className="menu-item">
					<button className="menu-link" id="menu-manual" onClick={clickMenuBtn}>
						<i className="menu-icon fa-solid fa-pen-to-square"></i>
						<span className="menu-name">수기</span>
					</button>
				</li>
				<li className="menu-item">
					<button className="menu-link" id="menu-real" onClick={clickMenuBtn}>
						<i className="menu-icon fa-solid fa-camera"></i>
						<span className="menu-name">실물</span>
					</button>
				</li>
				<li className="menu-item">
					<button className="menu-link" id="menu-search" onClick={clickMenuBtn}>
						<i className="menu-icon fa-solid fa-magnifying-glass"></i>
						<span className="menu-name">조회</span>
					</button>
				</li>
                <li className="menu-item">
					<button className="menu-link" id="menu-calculation" onClick={clickMenuBtn}>
						<i className="menu-icon fa-solid fa-receipt"></i>
						<span className="menu-name">정산</span>
					</button>
  </li>*/}
			</ul>
		</div>
	);
}

export default FooterMenu;
