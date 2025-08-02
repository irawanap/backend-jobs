const logger = (req, res, next) => {
    const path = req.originalUrl.split('?')[0]; 
    const label = `${req.method} ${path}`;

    console.time(label)

    res.on("finish", () => {
        console.timeEnd(label);
    });
    next();
};

module.exports = logger;