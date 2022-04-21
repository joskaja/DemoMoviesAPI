const handleError = (err, req, res, next) => {
    console.log(err);
    const statusCode = res.statusCode && res.statusCode > 299 ? res.statusCode : 500;
    res.status(statusCode);

    let message = err.message;

    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).join(', ');
    }

    res.json({
        code: statusCode,
        message: message
    });
}

module.exports = {
    handleError
}
