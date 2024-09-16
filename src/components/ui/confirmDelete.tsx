import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ConfirmDelete({ message, onConfirm, open = false, setOpen }) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(e) => {
        if (e) {
          setOpen(e);
        } else {
          setOpen(null);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border-none bg-transparent"
            onClick={() => {
              setOpen(null);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-transparent border  hover:text-white text-black hover:bg-red-600"
            onClick={() => onConfirm()}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
