
export  function parseAndFormatDateTime(isoString:any) {
    // Extract the components from the input string
    const [datePart, timePart] = isoString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
  
    // Format date and time according to the requirements
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}`;
  
    return {
      date: formattedDate,
      time: formattedTime
    };
  }


  
export  function convertDateFormat(dateStr:any) {

    const parts = dateStr.split('-');
    const day = parts[0];
    let month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10); 
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const formattedDate = `${day} ${monthNames[month]} ${year}`;
    return formattedDate;
  }
  
  