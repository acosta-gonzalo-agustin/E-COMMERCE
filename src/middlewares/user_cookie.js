function loggued(req,res,next) {
    console.log(req.cookies.user);

    next();
}

module.exports = loggued;