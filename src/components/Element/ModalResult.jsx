import React, { useEffect, useMemo, useState } from "react";
import Modal from 'react-modal';

// css modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'Indigo',
        color: 'white',
        borderRadius: '10px',
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"

    },
};


const ModalResult = ({ modalIsOpen, closeModal, questionsOld, checkAnswer }) => {
    const [checkCorrect, setCheckCorrect] = useState([]);
    const [result, setResult] = useState({});

    //sử dụng memo để tối ưu dữ liệu có sẵn
    const resultDetails = useMemo(() =>
        [
            { id: 1, image: "https://c.tenor.com/xVaiQTOUfIIAAAAC/doge.gif", text: "Dở thậm tệ" },
            { id: 2, image: "https://c.tenor.com/V_vAj8HbYn0AAAAM/dog-crying.gif", text: "Chả khá lên được" },
            { id: 3, image: "https://thumbs.gfycat.com/PhonyHealthyBird-size_restricted.gif", text: "Món này vẫn không ngon" },
            { id: 4, image: "https://c.tenor.com/S5m_S3WB0esAAAAM/doge-good-morning.gif", text: "Món tạm ổn" },
            { id: 5, image: "https://media0.giphy.com/media/e5EcjjJx3dCFi/giphy.gif", text: "Bắt đầu thấy ghiền rồi nha" },
            { id: 6, image: "https://i.imgur.com/bWk50HF.gif", text: "Cho tôi thêm bác nữa!" },
            { id: 7, image: "https://media.tenor.com/vEi9jflyDHMAAAAC/burn-muppet.gif", text: "Má ơi ngon tuyệt vời !" }

        ], []
    )

    useEffect(() => {
        //Check đáp án với các đáp án có trong Api
        //Dùn filter để lọc các câu trả lời ở Api
        const result = questionsOld.filter(qO => {
            // Tìm câu trả lời khi người chơi chọn để kiểm tra đúng không
            return checkAnswer.find(cA => cA === qO.correctAnswer)
        })
        //Lưu tất cả đáp án đúng bỏ các đáp án sai
        setCheckCorrect(result)
    }, [questionsOld, checkAnswer])

    //Một số kêt quả khi người chơi đạt mốc điểm nhất định
    useEffect(() => {
        if (checkCorrect.length === 0) {
            setResult(resultDetails[0])
        }
        else if (checkCorrect.length > 0 && checkCorrect.length <= 2) {
            setResult(resultDetails[1])
        }
        else if (checkCorrect.length > 2 && checkCorrect.length <= 4) {
            setResult(resultDetails[2])
        }
        else if (checkCorrect.length > 4 && checkCorrect.length <= 6) {
            setResult(resultDetails[3])
        }
        else if (checkCorrect.length > 6 && checkCorrect.length <= 8) {
            setResult(resultDetails[4])
        }
        else if (checkCorrect.length > 8 && checkCorrect.length < 10) {
            setResult(resultDetails[5])
        }
        else if (checkCorrect.length === 10) {
            setResult(resultDetails[6])
        }
    }, [checkCorrect.length, resultDetails])

    //Quay lại home
    const handleReset = () => {
        window.location.reload()
    }

    return (
        <React.Fragment>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="modal-rs">
                    <div className="logo">
                        <h6>Hóa đơn:</h6>
                        <span><b>" {result.text} "</b></span>
                        <img src={result.image} width="50px" height="50px" alt="success" />
                    </div>
                    <div className="result">
                        <span><b>Bạn ăn được số món là: </b></span>
                        <div className="point">
                            {checkCorrect.length}/10
                            <br />
                        </div>
                    </div>
                    <div className="btn-ct">
                        <button
                            className="btn-reset"
                            onClick={handleReset}
                        >Quay trở lại</button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default ModalResult;