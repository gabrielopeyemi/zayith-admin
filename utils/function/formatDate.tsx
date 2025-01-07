function formatDate(inputDate: any) {
    const date = new Date(inputDate);
    
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Get month name
    const year = date.getFullYear();
    
    return `${day}, ${month} ${year}`;
  }
  

  export default formatDate