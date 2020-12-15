interface IApproved {
  empId: number;
  leaveFrom: string;
  leaveUpto: string;
}
interface IRequested {
  leaveFrom: string;
  leaveUpto: string;
}
type IOccupies = {
  [key: string]: string;
};

const isSlotAvailable = (approvedLeaves: IApproved[], requestedLeaves: IRequested[]) => {
  // here main purpose is to create an object so that we'd have a O(1) lookup
  const occuiped_dates: IOccupies = {};
  for (var i in approvedLeaves) {
    const lupto = new Date(approvedLeaves[i].leaveUpto);
    const lfrom = new Date(approvedLeaves[i].leaveFrom);
    const gap = (+lupto - +lfrom) / (1000 * 3600 * 24);
    var j = 0;
    while (j < gap) {
      const key = new Date(approvedLeaves[i].leaveFrom);
      key.setDate(key.getDate() + j);
      occuiped_dates[key.toJSON()] = '1';
      j++;
    }
  }
  const r: boolean[] = [];
  for (var k in requestedLeaves) {
    var kkey = new Date(requestedLeaves[k].leaveFrom).toJSON();
    r.push(occuiped_dates[kkey] ? false : true);
  }
  return r;
};
