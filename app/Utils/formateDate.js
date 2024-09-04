const moment = require("moment")

const formateDate = (date) => {
    return moment(date).format("DD.MM.YYYY");
}

export default formateDate