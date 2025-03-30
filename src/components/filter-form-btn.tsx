import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function FilterFormBtn() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="accent"
      type="submit"
      disabled={pending}
      className="mt-3 w-full"
    >
      عطني السؤال
    </Button>
  );
}
