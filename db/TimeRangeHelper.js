function createUnixDateRange(n) {
    // n = 0, 1, 7, 30
    let startDate = new Date(); // Today's date
    let endDate = new Date(); // startDate - (n-1) date.
    startDate.setHours(0,0,0,0); // set time to 00:00:00.000
    endDate.setHours(0,0,0,0);

    startDate.setDate(startDate.getDate() + 1); // Tomorrow, 12:00 AM -- for exclusive range
    endDate.setDate(endDate.getDate() - (n-1)); // n-1 days from current date -- inclusive range

    // Convert dates into unix timestamps:

    let unixStartTime = Math.round(startDate.getTime()/1000); // Divide millis by 1000 to get seconds.
    let unixEndTime = Math.round(endDate.getTime()/1000);

    return [unixStartTime, unixEndTime];
}

module.exports = {
    createUnixDateRange,
}