export const convertDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
};
