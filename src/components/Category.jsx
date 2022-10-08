import React, { useEffect } from 'react';

const Home = ({ setCate, categories, setNameCate, setUsername, username }) => {

    //Bảng màu của thể loại và chạy vòng lặp để set background
    useEffect(() => {
        const colors = ["#e57373", "#ba68c8", "#90caf9", "#4db6ac", "#dce775", "#ffb74d", "#b0bec5", "#81c784"];

        let el = document.querySelectorAll('.cateListItem > .cateItem');

        el.forEach(function (item, i) {
            item.style.backgroundColor = colors[i];
        });
    }, [])

    //Sự kiện click lưu thể loại để gửi về APP lấy API và lưu tên name
    const handleClick = (c) => {
        setCate(c.value)
        setNameCate(c.name)
    }
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('user'));
        setUsername(users)
    }, [setUsername])
    return (
        <React.Fragment>
            <div className="category-content">
                <div className="category">
                    <div className="title-cate">
                        <h2 className="welcome">Xin chào: <span>{username}</span></h2>
                        <span className="choose-cate">Quý khách vui lòng chọn thực đơn: </span>
                    </div>
                    <ul className="cateListItem" >
                        {categories.map(c => (
                            <React.Fragment>
                                <li
                                    key={c.name}
                                    className="cateItem"
                                    onClick={() => handleClick(c)}
                                >
                                    <div className="image-c">
                                        <img src={c.image} alt="" width='80' height='80' />

                                    </div>
                                    <div className="text-cate">
                                        {c.name}
                                    </div>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;