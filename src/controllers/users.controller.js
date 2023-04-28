export const getUsersDataController = async (req, res) => {
    try {
        const user = req.user
        console.log('mail de usuario', user.email)
        res.json({ usersMail: user.email, userFullname: user.full_name })
    } catch (error) {
        console.log('error')
    }
}

export const logoutController = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error)
            res.json({ message: error })
        } else {
            res.redirect('/views/login')
        }
    })
}

