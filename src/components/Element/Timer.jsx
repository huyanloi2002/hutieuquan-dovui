import { useState, useEffect } from 'react'

const Timer = ({ setQuestionNum, questionNum, selectedAnswer }) => {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        //Nếu thời gian bằng đ thì chuyển qua câu tiếp theo
        if (timer === 0) return setQuestionNum(prev => prev + 1)
        // Dùng setInterval để trừ số 1s cho đến 0
        const interval = setInterval(() => {
            //Nếu chọn câu trả lời thì việc đếm giây sẽ dừng lại (tính giây ở trong phần mềm)
            if (selectedAnswer) {
                return () => clearInterval(interval)
            }
            //Khi setInterval trừ 1s thì đồng thời setTimer cũng trừ 1 (đếm giây để xuất ra giao diện từ 30 )
            setTimer(prev => prev - 1)
        }, 1000)
        //Dừng đếm giây
        return () => clearInterval(interval)
    }, [timer, setQuestionNum, selectedAnswer])

    useEffect(() => {
        // Timer = 30 và set mỗi câu hỏi chỉ có 30s
        setTimer(30)
    }, [questionNum])


    return timer
}

export default Timer