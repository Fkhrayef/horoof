import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function AddQuestionFormBtn() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="accent"
      type="submit"
      disabled={pending}
      className="mt-3 w-full"
    >
      إضافة السؤال
    </Button>
  );
}
