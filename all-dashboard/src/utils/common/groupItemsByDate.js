import moment from "moment";

export default function groupItemsByDate(data, timeKey = "timestamp") {
  const groups = data.reduce((groups, item) => {
    const momentDate = moment(item[timeKey]);
    // const currentMoment = moment();
    // const date =
    //   momentDate.year() === currentMoment.year()
    //     ? momentDate.format("MMMM D, LT")
    //     : momentDate.format("LLL");
    const date = momentDate.format("ll");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      list: groups[date],
    };
  });
  return groupArrays;
}
