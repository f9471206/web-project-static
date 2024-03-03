class myFunction {
  //標籤
  tagBadge(data) {
    let content;
    switch (data) {
      case 1:
      case "code":
        return (content = { text: "程式", bg: "primary" });
      case 2:
      case "anime":
        return (content = { text: "動漫", bg: "success" });
      case 3:
      case "game":
        return (content = { text: "遊戲", bg: "secondary" });
      case 4:
      case "feel":
        return (content = { text: "心情", bg: "danger" });
      default:
        return (content = null);
    }
  }

  //日期轉 多久前
  time(date) {
    // 現在的時間為：
    let currentTime = new Date();

    // 計算時間差（以毫秒為單位）：
    let timeDiff = currentTime - new Date(date);

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
      return yearsDiff + "年前";
    } else if (daysDiff > 0) {
      return daysDiff + "天前";
    } else if (hoursDiff > 0) {
      return hoursDiff + "小時前";
    } else if (minutesDiff > 0) {
      return minutesDiff + "分鐘前";
    } else {
      return "剛剛";
    }
  }

  //日期轉換
  changDateHours(date) {
    return new Date(date).toLocaleString("zh-TW", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  //日期轉換
  changDate(date) {
    return new Date(date).toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}

const MyFunction = new myFunction();
export default MyFunction;
