import React, { useState, useEffect } from "react";
import axios from 'axios';
import Category from '../components/Category';
import Content from '../components/Content';
import { encryptData } from "../utils/utils";
//image
import VHHH from '../assets/cate/vhhh.png';
import DA from '../assets/cate/da.png';
import DATU from '../assets/cate/datu.png';
import LS from '../assets/cate/ls.png';
import DL from '../assets/cate/dl.png';
import AN from '../assets/cate/an.png';
import KH from '../assets/cate/kh.png';
import TT from '../assets/cate/ttgt.png';


//Dữ liệu cảu thể loại
const categories = [
    { value: 'arts_and_literature', name: 'Văn học và Hội họa', image: `${VHHH}` },
    { value: 'film_and_tv', name: 'Điện ảnh', image: `${DA}` },
    { value: 'food_and_drink', name: 'Đồ ăn và Thức uống', image: `${DATU}` },
    { value: 'history', name: 'Lịch sử', image: `${LS}` },
    { value: 'geography', name: 'Địa lý', image: `${DL}` },
    { value: 'music', name: 'Âm nhạc', image: `${AN}` },
    { value: 'science', name: 'Khoa học', image: `${KH}` },
    { value: 'sport_and_leisure', name: 'Thể thao', image: `${TT}` },
];

const Play = ({ setUsername, username }) => {
    const [questionNum, setQuestionNum] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [cate, setCate] = useState("");
    const [nameCate, setNameCate] = useState("");

    //Lấy API từ Trivial và lưu vào questions
    useEffect(() => {
        const fetchData = async () => {
            if (cate !== "") {
                const res = await axios(`https://the-trivia-api.com/api/questions?categories=${cate}&limit=10`)
                setQuestions(res.data)
            }
        }
        fetchData();
    }, [cate]);

    //Lưu câu hỏi vào sessionStorage

    useEffect(() => {

        const salt = '6d090796-ecdf-11ea-adc1-0242ac112345';
        const encryptedData = encryptData(questions, salt);
        sessionStorage.setItem('questionArray', encryptedData)
    }, [questions])

    return (
        <React.Fragment>
            {cate === "" ? <Category
                setCate={setCate}
                categories={categories}
                setNameCate={setNameCate}
                setUsername={setUsername}
                username={username}
            /> :
                <Content
                    questionNum={questionNum}
                    setQuestionNum={setQuestionNum}
                    questions={questions}
                    nameCate={nameCate}
                />
            }


        </React.Fragment>
    );
}

export default Play;
