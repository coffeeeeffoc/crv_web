// 合并数据
export const judgeMergeData = ({
  data,
  updateData,
  mergeData,
}: any) => {
  return mergeData
    ? {
        ...data,
        ...updateData,
      }
    : { ...data };
};

// : { id: { $in: data } };
// 设置请求的data数据
export default function setData ({
  data,
  updateData,
  mergeData,
}: any) {
  return Array.isArray(data)
    ? data.map(item => judgeMergeData({
      data: item,
      updateData,
      mergeData,
    }))
    : [judgeMergeData({
        data,
        updateData,
        mergeData,
      })];
};
