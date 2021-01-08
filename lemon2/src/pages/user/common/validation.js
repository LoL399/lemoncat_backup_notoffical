function emailValidation(val){
    const regexe =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const check = regexe.exec(val)
    if(check !== null)
        return ""
    else
        return "Xin hãy nhập đúng email."
}
function phoneValidation(val){
    const regexp = /(09|01[0-9])+([0-9]{7})\b/g
    const check = regexp.exec(val)
    if(check !== null)
        return ""
    else
        return "Xin hãy nhập đúng định dạng điện thoại."
}
function passValidation(val){
    const regexpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/gm
    const check = regexpass.exec(val)
    if(check !== null)
        return ""
    else
        return "Mật khẩu phải từ 8 chữ bao gồm có một kí tự hoa và ít nhất 1 ký tự số"

}
function confirmPassValidation(val,reval){
    if(val == reval)
        return ""
    else
        return "Mật khẩu không giống"

}


export {emailValidation, phoneValidation, passValidation, confirmPassValidation}