export const getCurrentAdditionByOperationId = (areaAdditions: any, operationId: string | number | null) => {
  if (operationId === null) return {};
  for (const areaId of Object.keys(areaAdditions)) {
    if (
      areaAdditions[areaId].operationBar?.operations
        ?.findIndex?.((operation: any) => operation.id === operationId) > -1
    ) {
      return {
        areaId,
        currentAddition: areaAdditions[areaId],
      };
    }
  }
  return {};
};
