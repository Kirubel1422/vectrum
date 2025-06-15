export function getImportanceColor(
  importance: "High" | "Critical" | "Moderate"
): { bgColor: string; textColor: string } {
  switch (importance) {
    case "Critical":
      return {
        textColor: "text-red-200",
        bgColor: "bg-red-500",
      };
    case "High":
      return {
        textColor: "text-amber-600",
        bgColor: "bg-amber-200",
      };
    case "Moderate":
      return {
        textColor: "text-blue-600",
        bgColor: "bg-blue-300",
      };
    default:
      return {
        textColor: "text-gray-600",
        bgColor: "bg-gray-300",
      };
  }
}
