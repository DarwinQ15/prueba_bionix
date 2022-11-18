const ValidateGender = (gender) => {
    if(gender === 'male' || gender === 1){
        return '#70b7fa';
    } else if(gender === 'female' || gender === 2) {
        return '#c766a7'
    }
}

export default ValidateGender;