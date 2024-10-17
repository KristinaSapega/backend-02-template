const logOriginalUrl = (request, response, next) => {
    console.log(`Адрес, на который пришел запрос: ${request.url}`);
    next(); // передаем управление следующему middleware
};

module.exports = logOriginalUrl;
