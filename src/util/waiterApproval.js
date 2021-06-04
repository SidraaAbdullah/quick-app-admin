export const LimitWords = (str, length) => {
    if (str) {
      if (str.split(" ").join("").length > length) {
        let newString = str.substring(0, length) + "...";
        return newString;
      } else {
        return str;
      }
    }
};
