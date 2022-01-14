// add _rowIndex element for row data
export const ergodicDataSource = (dataSource: any[]): Array<{}> | undefined => {
  return dataSource.map((data, index: number) => ({
    ...data,
    _rowIndex: index
  }))
}
