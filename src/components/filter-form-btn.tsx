import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function FilterFormBtn({
  isSubmitting,
}: {
  isSubmitting?: boolean;
}) {
  return (
    <Button
      variant="accent"
      type="submit"
      disabled={isSubmitting}
      className="mt-3 w-full"
    >
      عطني السؤال
    </Button>
  );
}
