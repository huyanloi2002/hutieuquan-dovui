import React, { useEffect, useState } from "react";
import Loader from '../components/Element/Loader';
import Timer from "./Element/Timer";
import ModalResult from "./Element/ModalResult";
import yes from "../assets/yes.png";
import no from "../assets/no.png"


const Content = ({ questions, questionNum, setQuestionNum, nameCate }) => {
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState('answer');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [questionsOld, setQuestionsOld] = useState([]);
    const [checkAnswer, setCheckAnswer] = useState([]);
    const [isTrue, setIsTrue] = useState(false);
    const [isFalse, setIsFalse] = useState(false);
    const [isEnable, setIsEnable] = useState(false);

    // Nếu tới câu hỏi thứ ăđ sẽ xuất hiện Modal (isOpen=true)
    useEffect(() => {
        if (questionNum > 10) {
            setIsOpen(true)
        }
    }, [questionNum, questions, setQuestionNum])

    //Câu hỏi ban đầu ở [1] vì ở App câu hỏi đã được set 1 nên phải trừ 1 để bằng 0
    useEffect(() => {
        setQuestion(questions[questionNum - 1])
    }, [questionNum, questions]);

    //Ở Api có â loại câu hỏi nên phải dùng Splice để gộp â loại lại và chỉnh vị trí ngẫu nhiên
    useEffect(() => {
        let correctAnswer = question?.correctAnswer;
        let incorrectAnswer = question?.incorrectAnswers;
        let optionsList = incorrectAnswer;
        optionsList?.splice(Math.floor(Math.random() * (incorrectAnswer?.length + 1)), 0, correctAnswer);

        setAnswer(optionsList)
    }, [question]);

    // Nếu câu trả lời đang active và check thì không thể click vào
    useEffect(() => {
        if (className === 'answer active') {
            setIsEnable(true)
            if (selectedAnswer === null) {
                setIsEnable(false)
            }
        }
        else if (className === 'answer correct') {
            setIsEnable(true)
            if (selectedAnswer === null) {
                setIsEnable(false)
            }
        }
        else if (className === 'answer wrong') {
            setIsEnable(true)
            if (selectedAnswer === null) {
                setIsEnable(false)
            }
        }
    }, [className, selectedAnswer])


    //Hàm callback để dùng thời gian cho câu hỏi
    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration)
    };

    const handleClick = (a) => {
        //Sự kiện click khi chọn câu hỏi là a
        setSelectedAnswer(a);
        //classname sẽ là active
        setClassName("answer active")
        //Lưu tất cả các câu trả lời của người chơi
        if (a) {
            setCheckAnswer([...checkAnswer, a]);
        }
        //Dùng hàm callback delau để sau khi 3s check corect và wrong để css màu cho câu trả lời
        delay(3000, () =>
            setClassName(a === question?.correctAnswer ? "answer correct" : "answer wrong")
        );

        //Sau 4s thì sẽ đưa ra kết quả
        if (a === question?.correctAnswer) {
            delay(4000, () =>
                //đúng
                setIsTrue(true)
            );
        } else {
            //sai
            delay(4000, () =>
                setIsFalse(true)
            );
        }

        delay(8000, () => {
            if (a) {
                //Sau 8s thì questions sẽ + 1 chuyển câu trả lời tiếp theo
                setQuestionNum(prev => prev + 1);
                //Chỉnh câu trả lời lại giá trị ban đầu
                setSelectedAnswer(null)
                //Chỉnh check đúng sai về giá trị ban đầu
                setIsTrue(false)
                setIsFalse(false)
            }
        })
    };
    //Khi click vào button start thì sẽ lấy tất cả câu hỏi lưu trong sessionStorage lên
    const handleStart = () => {
        setIsStart(true)
        const questionOld = JSON.parse(sessionStorage.getItem('questionArray'));
        setQuestionsOld(questionOld)
    };
    //Quay lại home
    const handelReset = () => {
        window.location.reload()
    };
    return (
        <React.Fragment>
            <div className="content">
                {isStart === false ?
                    <div className="info">
                        <div className="title-check">
                            <span><b>BẠN ĐÃ SẴN SÀNG ?</b></span>
                        </div>
                        <div className="category-check">
                            {nameCate}
                        </div>
                        <div className="btn-start-reset">
                            <button onClick={handelReset} className="btn-reset">Quay lại</button>
                            <button onClick={handleStart} className="btn-start">Bắt đầu</button>
                        </div>
                    </div>
                    :
                    <div className="qa-content">
                        {question === undefined ? <Loader /> : (
                            <React.Fragment>
                                <div className="number-question">
                                    <div className="label">
                                        <b>{`Món: ${questionNum}/10`}</b>
                                    </div>
                                    <div className="loader-q">
                                        <div className="loader-ct" style={{ width: `${(questionNum) * 10}%` }}>

                                        </div>
                                    </div>
                                </div>
                                <form className="form-qa">
                                    <div className="question">
                                        <b>{question?.question}</b>
                                    </div>
                                    <div className="answers">
                                        {answer?.map(a => (
                                            <div
                                                key={a}
                                                className={selectedAnswer === a ? className : "answer"}
                                                onClick={() => handleClick(a)}
                                                id={isEnable === true ? "disabled" : null}
                                            ><span><b>{a}</b></span>
                                            </div>

                                        ))}
                                    </div>
                                    <div className="yes-no">
                                        {isTrue === true &&
                                            <div className="yes">
                                                <img className="image-yn" src={yes} alt="yes" width="20" />
                                                <span><b>Món ăn này chính xác</b></span>
                                            </div>
                                        }
                                        {isFalse === true &&
                                            <div className="no">
                                                <img className="image-yn" src={no} alt="yes" width="20" />
                                                <span><b>Món ăn này tên là:</b> </span>
                                                <span style={{ color: 'crimson' }}><b>{question?.correctAnswer}</b></span>
                                            </div>
                                        }
                                    </div>
                                </form>
                                <div className="timer-ct">
                                    <div className="timer">
                                        <Timer
                                            setQuestionNum={setQuestionNum}
                                            questionNum={questionNum}
                                            selectedAnswer={selectedAnswer}
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                }
            </div>
            <ModalResult
                modalIsOpen={modalIsOpen}
                questionsOld={questionsOld}
                checkAnswer={checkAnswer}
            />
        </React.Fragment>
    )
}

export default Content;