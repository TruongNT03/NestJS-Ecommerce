import { v4 } from 'uuid';

export const preProcessFileName = (fileName: string): string => {
  let [originalName, extendName] = fileName.split('.');
  const uuid = v4();
  originalName = `${originalName}-${uuid}`;
  return `${originalName}.${extendName}`;
};
