import { IPagination } from "../config/interfaces";

export const logicPagination = (
  currentPage: number,
  limit: number,
  nbOfDocs: number
) => {
  // return { nbOfPages: 10, next: 6, previous: 4, limit: 5, nbOfDocs: 48 }
  let pagination: IPagination = {
    nbOfPages: 0,
    limit: 0,
    nbOfDocs: 0
  };
  const startIndex: number = (currentPage - 1) * limit;
  const endIndex = currentPage * limit;
  pagination.nbOfPages = Math.ceil(nbOfDocs / limit);
  if (endIndex < nbOfDocs) pagination.next = currentPage + 1;
  if (startIndex > 0) pagination.previous = currentPage - 1;
  pagination.limit = limit;
  pagination.nbOfDocs = nbOfDocs;
  return { pagination, startIndex };
};
