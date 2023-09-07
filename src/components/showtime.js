class Calculate {
  calculateTime(dataTime) {
    //Data的時間轉換
    let mongoTime = new Date(dataTime);

    // 現在的時間為：
    let currentTime = new Date();

    // 計算時間差（以毫秒為單位）：
    let timeDiff = currentTime - mongoTime;

    // 計算時間差（以分鐘為單位）：
    let minutesDiff = Math.floor(timeDiff / 1000 / 60);

    // 計算時間差（以小時為單位）：
    let hoursDiff = Math.floor(timeDiff / 1000 / 60 / 60);

    // 計算時間差（以天為單位）：
    let daysDiff = Math.floor(timeDiff / 1000 / 60 / 60 / 24);

    // 計算時間差（以年為單位）：
    let yearsDiff = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 365);

    // 顯示結果：
    if (yearsDiff > 0) {
      return yearsDiff + " 年前";
    } else if (daysDiff > 0) {
      return daysDiff + " 天前";
    } else if (hoursDiff > 0) {
      return hoursDiff + " 小時前";
    } else if (minutesDiff > 0) {
      return minutesDiff + " 分鐘前";
    } else {
      return "剛剛";
    }
  }

  showDate(dataTime) {
    let mongoTime = new Date(dataTime);
    return mongoTime;
  }
}

const calculate = new Calculate();
export default calculate;
