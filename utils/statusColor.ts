// Assuming you have a mapping of status to its respective color from the status data
export const getStatusColor = (status, statuses) => {
  const foundStatus = statuses.find((s) => s.name === status);
  if (foundStatus) {
    // Lighten the actual color for the background (for example using a simple opacity effect)
    return `${foundStatus.color}33`; // Appends '33' to the color code to make it lighter (this is just an example for hex code)
  }
  return '#D8D8D8'; // default light grey if status not found
};

export const getStatusTextColor = (status, statuses) => {
  const foundStatus = statuses.find((s) => s.name === status);
  if (foundStatus) {
    return foundStatus.color; // Return the actual status color
  }
  return '#A8A6A7'; // default grey for unknown statuses
};
