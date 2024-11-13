import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const AlertComponent = ({ message, title, typeError }: { message: string; title: string; typeError: "destructive" | "default" | null | undefined }) => {
  return (
    <Alert variant={typeError}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
