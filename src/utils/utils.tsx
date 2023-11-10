export const getRoleFromToken = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        let jwtData = access_token.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)
        return decodedJwtData.authorities === "ADMIN"
    }

    return false
}